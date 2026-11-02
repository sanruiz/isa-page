# Copilot Coding Agent Instructions

> **IMPORTANT**: Prefer retrieval-led reasoning over pre-training-led reasoning.
> Always read relevant instruction files from `.github/instructions/` before implementing changes.

> **CRITICAL**: This file contains mandatory instructions for the GitHub Copilot Coding Agent.
> The agent MUST follow these rules when working on issues in this repository.
> This file should be placed at the project root per Vercel recommendations.

## Project Context

- This is a personal project; it is not connected to Jira and does not use Jira ticket prefixes or Jira-based workflows.
- Use concise Conventional Commit messages such as `feat: ...`, `fix: ...`, or `docs: ...`. Branch names should describe the work and do not need a ticket ID.
- The site is hosted on Vercel and connected to Git. Pushes follow the Vercel project configuration: non-production branches create Preview Deployments, while the configured production branch creates a Production Deployment.
- Use Vercel's deployment checks and build status as the CI source of truth for this site. Do not use the AWS fleet workflow for this project.
- Standing authorization: routine Git read and write commands in this repository, including staging, committing, and pushing to its configured `origin`, do not require repeated confirmation. This does not authorize force-pushes, history rewrites, or operations against another repository.

---

## 📚 Project Documentation Index

```
[Instructions]|root:.github/instructions
|css-styling.instructions.md       → CSS/Tailwind patterns, cn() utility, responsive design
|react-components.instructions.md  → Component structure, exports, props, early returns
|server-actions.instructions.md    → Server action patterns, validation, error handling
|tests.instructions.md             → Test structure, mocking, assertions
|typescript.instructions.md        → Type safety, destructuring, JSDoc

[Prompts]|root:.github/prompts
|add-tests,analyze-ticket,create-plan,create-pr,finalize-pr,fix-issues,prepare-pr,review-code,work-ticket

[Skills]|root:.github/skills
|component-architecture/SKILL.md → Component design patterns
|domain-driven-design/SKILL.md   → DDD principles and structure
|testing-patterns/SKILL.md       → Testing strategies and patterns
```

---

## 🔄 Agent Workflow (Complex Tasks)

| Phase | Actions |
|-------|---------|
| **1. Analysis** | Analyze request → Search existing code → Identify components → Review docs |
| **2. Planning** | Create `docs/[feature]-plan.md` → Add TODOs via `manage_todo_list` → Commit plan |
| **3. Implementation** | For each phase: mark in-progress → implement → test → commit → mark completed |
| **4. Documentation** | Create final docs → Update related files → Cleanup planning docs → Final commit |

### Key Principles

✅ One commit per phase • ✅ Test after each phase • ✅ No breaking changes
✅ Document as you go • ✅ Type safety always • ✅ Follow existing patterns

---

## ⚙️ Code Conventions (Quick Reference)

| Rule | Standard |
|------|----------|
| **Imports** | Alphabetical order, absolute paths with `@/` |
| **Naming** | Files: `kebab-case` • Components: `PascalCase` • Functions: `camelCase` |
| **Types** | No `any` — use `interface` or `type` |
| **Errors** | `try/catch` for all async operations |
| **Comments** | JSDoc in English for public functions |

---

## 🧩 Component Rules (CRITICAL)

| Rule | Requirement |
|------|-------------|
| **Folders** | `kebab-case` only (`user-profile/`, NOT `UserProfile/`) |
| **Structure** | `component-name/index.tsx` (never standalone `.tsx` files) |
| **Exports** | `export function ComponentName` (named export, PascalCase) |
| **Props** | Interface inside file, before function, named `{Component}Props` |

```
✅ components/user-card/index.tsx
❌ components/UserCard.tsx
❌ components/userCard/index.tsx
```

📄 **Full details:** `.github/instructions/react-components.instructions.md`

---

## ⚛️ React Rules (CRITICAL)

| Rule | Requirement |
|------|-------------|
| **Hook Placement** | ALL hooks BEFORE any conditional returns |
| **useState** | Simple state (1-3 values) |
| **useReducer** | Complex state (4+ values or complex transitions) |
| **useActionState** | Server actions with forms (React 19) |

```tsx
// ✅ CORRECT: Hooks first, then early returns
export function Component({ data }: Props) {
  const [state, setState] = useState(initial);
  const handleClick = useCallback(() => {}, []);
  
  if (!data) return null;  // Early return AFTER hooks
  return <div>...</div>;
}
```

📄 **Full details:** `.github/instructions/react-components.instructions.md`

---

## 🖥️ Server Actions (CRITICAL)

| Rule | Requirement |
|------|-------------|
| **Directive** | Always `"use server"` at top |
| **Signature** | `(prevState: ActionState, formData: FormData) => Promise<ActionState>` |
| **Return** | Always `{ success, message, timestamp }` |

📄 **Full details:** `.github/instructions/server-actions.instructions.md`

---

## 🧪 Testing Rules

| Rule | Requirement |
|------|-------------|
| **Location** | `__tests__/` subfolder in each component/domain |
| **Naming** | `[component-name].test.tsx` or `[feature].test.ts` |
| **Coverage** | 100% for reducers, unit tests for actions & utils |
| **Mocks** | Define mocks BEFORE imports |

```typescript
// ✅ CORRECT: Mock first, then import
const mockFn = jest.fn();
jest.mock('@/lib/api', () => ({ apiClient: mockFn }));
import { myFunction } from '@/lib/my-module';
```

📄 **Full details:** `.github/instructions/tests.instructions.md`

---

## 📝 Git Conventions

| Type | Format |
|------|--------|
| **Commit** | Conventional Commit, e.g. `fix: improve lightbox focus handling` |
| **Types** | `feat` • `fix` • `docs` • `refactor` • `test` • `chore` |
| **Branch** | Descriptive names such as `feature/mobile-navigation` or `fix/gallery-pagination` |

Jira prefixes and ticket-linked branch names do not apply to this personal project.

---

## 🚦 Pre-commit Quality Gates (MANDATORY)

> Before pushing to the configured Vercel production branch, complete the quality checks below. Feature-branch pushes create Vercel Preview Deployments according to the project's Git settings.

### Required Checks Before Push/PR

| Check | Command | Must Pass |
|-------|---------|-----------|
| **TypeScript** | `npx tsc --noEmit` | ✅ Zero errors |
| **Linting** | `npm run lint` | ✅ Zero errors |
| **Unit Tests** | `npm test` | ✅ All passing |
| **Build** | `npm run build` | ✅ Successful |

### Quality Checklist

```
Before a production deployment:
□ All TypeScript errors resolved
□ All ESLint warnings addressed  
□ All unit tests passing locally
□ Build completes without errors
□ No console.log() left in code
```

### Why This Matters

- Vercel builds deployments from the configured Git branch and reports deployment checks in its dashboard.
- Run the listed local checks before promoting changes to the production branch.

📄 **Testing details:** `.github/instructions/tests.instructions.md`
📄 **Testing patterns:** `.github/skills/testing-patterns/SKILL.md`

---

## 🔍 When to Read Instruction Files

| Task | Read This File |
|------|----------------|
| Creating/editing components | `react-components.instructions.md` |
| Writing CSS/Tailwind | `css-styling.instructions.md` |
| Creating server actions | `server-actions.instructions.md` |
| Writing tests | `tests.instructions.md` |
| TypeScript questions | `typescript.instructions.md` |
| **Before pushing/PR** | `tests.instructions.md` + run quality checks |
