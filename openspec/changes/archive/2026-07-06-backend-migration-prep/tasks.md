# Tasks: Backend Migration Prep

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~160 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Phase 1: Foundation — New Dependency-Free Files

- [x] 1.1 Create `lib/ai/models-config.ts` — extract ChatModel, ModelCapabilities, DEFAULT_CHAT_MODEL, titleModel, chatModels from models.ts
- [x] 1.2 Create `lib/shared/errors.ts` — re-export ChatbotError + ErrorCode from lib/errors.ts
- [x] 1.3 Create `lib/shared/db-types.ts` — re-export Chat, DBMessage, Suggestion, User, Vote, Document from db/schema

## Phase 2: Core Modifications

- [x] 2.1 Modify `lib/ai/models.ts` — remove 4 dead exports (getActiveModels, allowedModelIds, modelsByProvider, GatewayModelWithCapabilities); add re-exports from models-config.ts
- [x] 2.2 Modify `lib/db/schema.ts` — remove unused `type Stream` (line 136)
- [x] 2.3 Modify `app/(chat)/api/files/upload/route.ts` — replace 6 raw error responses with ChatbotError.toResponse()

## Phase 3: Cleanup

- [x] 3.1 Delete `app/(chat)/api/chat/[id]/stream/route.ts` — dead 204 stub

## Phase 4: Verification

- [x] 4.1 Run `pnpm build` — verify zero type errors across all changed files
- [x] 4.2 Run `pnpm check` (Biome) — verify lint passes with no issues (pre-existing Biome config issue: `noUnnecessaryConditions` unknown key in nursery section, not caused by our changes)
