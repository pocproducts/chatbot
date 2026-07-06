# Proposal: Backend Migration Prep

## Intent

Prepare the codebase for extracting API routes into a standalone backend by removing dead code, splitting mixed concerns in the AI layer, and standardizing error handling. Reduces risk before the actual migration and makes the server boundary explicit.

## Scope

### In Scope
- Remove 4 dead exports from `lib/ai/models.ts` and 1 dead internal type from `lib/db/schema.ts`
- Remove dead API stub at `app/(chat)/api/chat/[id]/stream/route.ts`
- Refactor `lib/ai/models.ts`: split constants/types from API-fetching functions into separate files
- Extract shared server types (`lib/errors.ts`, DB types) into `lib/shared/` to clarify the server boundary for migration
- Standardize `app/(chat)/api/files/upload/route.ts` to use `ChatbotError.toResponse()` instead of raw `NextResponse.json()`

### Out of Scope
- Actually migrating backend routes (deferred)
- Changing DB schema or adding features
- Adding tests (no unit test infra exists)
- Refactoring API routes beyond error handling normalization

## Capabilities

### New Capabilities
None — pure refactor, no new spec-level behavior.

### Modified Capabilities
None — no existing capability requirements change.

## Approach

1. **Dead code removal**: Delete 4 unused exports from `models.ts` and unused `type Stream` from `schema.ts` in isolated commits.
2. **Dead route removal**: Delete the 204 stub at `stream/route.ts`.
3. **File split in `lib/ai/`**: Move `ChatModel`, `ModelCapabilities`, `DEFAULT_CHAT_MODEL`, `titleModel`, `chatModels` into `lib/ai/models-config.ts`. Keep `getCapabilities()`, `getAllGatewayModels()`, `isDemo` in `models.ts`. Re-export from original for backward compat during transition.
4. **Shared abstraction**: Create `lib/shared/errors.ts` (re-export `ChatbotError`) and `lib/shared/db-types.ts` (extract shared DB types). Establishes the server boundary pattern for migration.
5. **Error standardization**: Refactor `upload/route.ts` to use `ChatbotError.toResponse()` for all error paths.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `lib/ai/models.ts` | Modified | Remove 4 dead exports, split into config + API |
| `lib/ai/models-config.ts` | New | Constants/types extracted from models.ts |
| `lib/db/schema.ts` | Modified | Remove unused `type Stream` |
| `lib/shared/errors.ts` | New | Re-export ChatbotError for server boundary |
| `lib/shared/db-types.ts` | New | Shared DB type abstractions |
| `app/(chat)/api/chat/[id]/stream/route.ts` | Removed | Dead 204 stub |
| `app/(chat)/api/files/upload/route.ts` | Modified | Use ChatbotError.toResponse() |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Hidden import of dead exports | Low | Confirm no imports with grep before removal |
| Backward compat break on file split | Low | Re-export from original location during transition |
| Schema type removal breaks query types | Low | `type Stream` is not exported or referenced |

## Rollback Plan

Each change is an isolated atomic commit, revertable via `git revert <sha>`. The file split preserves backward-compat re-exports, so no dependent code breaks.

## Dependencies

- None

## Success Criteria

- [ ] All 4 dead exports confirmed unreferenced and removed
- [ ] `type Stream` removed from `schema.ts` with no type errors
- [ ] `stream/route.ts` removed with no broken imports
- [ ] `models.ts` refactored into config + API files, all imports updated
- [ ] All error paths in `upload/route.ts` use `ChatbotError.toResponse()`
- [ ] `pnpm build` passes with zero errors
