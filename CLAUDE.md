# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm ci` — install dependencies
- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (the only verification step; strict TS incl. unused locals/params)
- `npm run preview` — serve the built bundle

There is no test runner and no lint script (`eslint.config.js` exists but its plugins aren't declared in `package.json`). Verify by building and exercising the changed routes manually against a backend.

## Architecture

React 19 + TypeScript + Vite + Tailwind CSS 4 (plus some SCSS in `src/style/`). Imports use the `@/` alias for `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`); import paths typically include the `.ts`/`.tsx` extension.

**Routing** (`src/App.tsx`): `createBrowserRouter` with public routes `/`, `/login`, `/registration`, and a `/panel` subtree (`UserPanel`, `user-profile`, `course/:courseId`, `course/:courseId/module/:moduleId/topic`). The `/panel` layout wraps `PanelLayout` in `AuthProvider`, so all authenticated pages live under `/panel`. The whole router is wrapped in `ErrorBoundary`.

**Auth**: session is cookie-based (`withCredentials: true` on user calls). `useAuth` calls `GET /user/auth/me` on mount and exposes `{loading, user, authError, notAuthorized}` (`notAuthorized` = HTTP 401). `AuthProvider` puts this in `AuthContext`; `setAuthUser` marks a login update so the later `useAuth` effect doesn't overwrite it. Consume via `AuthContext`.

**Data layer**, in three layers:
- `src/config/axios.ts` — single shared `axiosInstance` (hardcoded `baseURL` `http://localhost:8080/api`, 5s timeout).
- `src/services/*Service.ts` — one class per domain (User, Course, Module, Topic, Test); methods wrap axios calls and return the response body.
- `src/hooks/use*.tsx` — instantiate a service in `useEffect` and expose `{data, error, loading}` state (e.g. `useCourse` → `course`, `courseError`, `loadingCourse`).

**Errors**: API responses use a `Response<T>` envelope (`src/type/response/`). Hooks catch errors and normalize them with `parsError` / `parsFieldError` (`src/utils/errorParser.ts`) into `ErrorType` (`code`, `status`, `errorBody`); non-Axios errors are rethrown. Pages render these through the dialog components in `src/components/` (`ServerErrorDialog`, `NetworkErrorDialog`, `NotAuthorizedDialog`, `BadRequestDialog`, built on `ErrorDialog`).

**Types**: `src/type/model/` (domain models), `src/type/response/` (API contracts), `src/interface/`, `src/props/`. Forms use Formik + Yup schemas in `src/validationSchemas/`.

**UI**: `src/components/ui/` holds shadcn-style Radix primitives (see `components.json`); reuse these and `cn` from `src/lib/utils.ts` rather than adding new primitives.

## Conventions

Application code uses 4-space indentation and semicolons; no formatter is configured. Commit subjects are short and imperative.
