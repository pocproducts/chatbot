# Design: Backend Migration Prep

## Technical Approach

Structural refactoring to prepare for backend extraction: delete dead code, split mixed concerns in `lib/ai/models.ts` into a config/types file, create `lib/shared/` boundary layer, and standardize error handling in the upload route. All changes are backward-compatible — no behavioral changes to the running app.

## Architecture Decisions

| Decision | Choices | Rationale |
|----------|---------|-----------|
| **Config split boundary** | Types + constants → `models-config.ts`; API fns stay in `models.ts` | Types are stable config; API fns change with gateway logic. Clean separation. |
| **Dead exports (4)** | Remove `getActiveModels`, `allowedModelIds`, `modelsByProvider` entirely; unexport `GatewayModelWithCapabilities` | `GatewayModelWithCapabilities` is used as return type of `getAllGatewayModels` but never directly imported. |
| **Backward compat** | Re-export config types from `models.ts` | 3 files import from `models.ts` — re-exports keep them working without changes. |
| **`lib/shared/errors.ts`** | Re-export `ChatbotError` + `ErrorCode` from `lib/errors.ts` | Establishes the server boundary pattern: `lib/shared/*` is the public API for extracted backend. |
| **`lib/shared/db-types.ts`** | Re-export `Chat`, `DBMessage`, `Suggestion`, `User`, `Vote`, `Document` | Covers types consumed by `queries.ts` and referenced across the server boundary. |
| **Upload error standardization** | Replace 6 `NextResponse.json()`/`new Response()` calls with `ChatbotError(code).toResponse()` | Loses specific messages ("Upload failed" → "The request couldn't be processed."). Acceptable — standardized codes matter more for migration. |

## Data Flow

```
models.ts (current: 12 exports)
  │
  ├── getActiveModels, allowedModelIds, modelsByProvider ───→ REMOVED (dead code)
  ├── GatewayModelWithCapabilities  ───→ unexport 'GatewayModelWithCapabilities' (internal)
  ├── ChatModel, ModelCapabilities, DEFAULT_CHAT_MODEL,
  │   titleModel, chatModels  ───→ MOVED to models-config.ts
  │                                 └── re-exported from models.ts for backward compat
  └── getCapabilities, getAllGatewayModels, isDemo ───→ STAYS in models.ts

lib/db/schema.ts ──→ type Stream REMOVED (line 136, dead)

lib/shared/ (NEW — server boundary)
  errors.ts  ──→ re-exports ChatbotError, ErrorCode
  db-types.ts ──→ re-exports (Chat, DBMessage, Suggestion, User, Vote, Document)

upload/route.ts error paths:
  NextResponse.json({error}, {status}) ──→ new ChatbotError("bad_request:api").toResponse()
  NextResponse.json({error: "Unauthorized"}, {status: 401}) ──→ new ChatbotError("unauthorized:api").toResponse()
  new Response("Request body is empty", {status: 400}) ──→ new ChatbotError("bad_request:api").toResponse()
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `lib/ai/models-config.ts` | Create | Constants (`DEFAULT_CHAT_MODEL`, `titleModel`, `chatModels`) + types (`ChatModel`, `ModelCapabilities`) |
| `lib/ai/models.ts` | Modify | Remove 4 dead exports; re-export from `models-config.ts`; unexport `GatewayModelWithCapabilities` |
| `lib/db/schema.ts` | Modify | Delete unused `type Stream` (line 136) |
| `lib/shared/errors.ts` | Create | `export { ChatbotError } from "../errors"` + type re-exports |
| `lib/shared/db-types.ts` | Create | `export type { Chat, DBMessage, Suggestion, User, Vote, Document } from "../db/schema"` |
| `app/(chat)/api/chat/[id]/stream/route.ts` | Delete | Dead 204 stub (3 lines, never called) |
| `app/(chat)/api/files/upload/route.ts` | Modify | Replace 5 raw error responses with `ChatbotError(code).toResponse()` |

## Interfaces / Contracts

```ts
// lib/ai/models-config.ts — stable config, no HTTP/runtime dependencies
export const DEFAULT_CHAT_MODEL = "moonshotai/kimi-k2.5";
export const titleModel = { id: "moonshotai/kimi-k2.5", name: "Kimi K2.5", ... };
export type ModelCapabilities = { tools: boolean; vision: boolean; reasoning: boolean };
export type ChatModel = { id: string; name: string; provider: string; description: string; gatewayOrder?: string[]; reasoningEffort?: "none" | "minimal" | "low" | "medium" | "high" };
export const chatModels: ChatModel[] = [ ... ];
```

```ts
// lib/ai/models.ts — after refactor
// Re-exports for backward compatibility
export { DEFAULT_CHAT_MODEL, titleModel, ModelCapabilities, ChatModel, chatModels } from "./models-config";

// API functions (stay)
export async function getCapabilities(): Promise<Record<string, ModelCapabilities>> { ... }
export async function getAllGatewayModels(): Promise<ChatModel[] & { capabilities: ModelCapabilities }[]> { ... }
export const isDemo = process.env.IS_DEMO === "1";
```

```ts
// lib/shared/errors.ts
export { ChatbotError } from "../errors";
export type { ErrorCode } from "../errors";

// lib/shared/db-types.ts
export type { Chat, DBMessage, Suggestion, User, Vote, Document } from "../db/schema";
```

## Testing Strategy

No unit tests exist per project config. Verification is build-only.

| Layer | What to Test | Approach |
|-------|-------------|----------|
| TypeScript | All files compile with no type errors | `pnpm build` (blocks merge) |
| Lint | Code style compliance | `pnpm check` (Biome) |

## Migration / Rollout

No migration required. Each deliverable is an atomic commit — `git revert <sha>` unrolls any single change cleanly. The `lib/shared/` abstraction is additive (no existing code imports from it yet).

## Open Questions

- None. All decisions are scoped per proposal.
