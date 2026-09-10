# Repository Guidelines

## Project Structure & Module Organization

This frontend uses React 19, TypeScript, Vite, and Tailwind CSS 4. `src/main.tsx` bootstraps the app; `src/App.tsx` defines React Router routes.

- `src/pages/`: route-level screens for authentication, courses, and user accounts.
- `src/components/`: shared components; `src/components/ui/` contains reusable Radix-based UI primitives.
- `src/services/`: API operations grouped by domain; `src/config/axios.ts` configures the shared HTTP client.
- `src/type/model/`, `src/type/response/`, and `src/interface/`: data models and API contracts.
- `src/lib/` and `src/utils/`: shared helpers.
- `src/style/`: global CSS and SCSS; `src/assets/`: imported images; `public/`: static files.

## Build, Test, and Development Commands

- `npm ci`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server.
- `npm run build`: run TypeScript project checks and produce a production bundle in `dist/`.
- `npm run preview`: serve the built bundle locally for review.

There are no `test` or `lint` scripts. `eslint.config.js` exists, but its ESLint, TypeScript ESLint, and React plugin dependencies are not fully declared in `package.json`; resolve this before relying on lint checks.

## Coding Style & Naming Conventions

Follow surrounding formatting: application files generally use four-space indentation and semicolons, while UI primitives and configuration files vary. No formatter is configured. Use PascalCase for page/component and model names, camelCase for functions and services, and existing lowercase/kebab-case names for UI primitives. Use `@/` imports for paths under `src/`. Keep TypeScript strict checks passing, including unused-variable checks. Reuse shared UI primitives and the Axios client.

## Testing Guidelines

No automated test framework, test naming convention, or coverage threshold is established. `src/services/testService.ts` handles course tests; it is not a test suite. Run `npm run build` and manually exercise changed routes, API error states, and affected authentication flows. Record verification in the PR.

## Commit & Pull Request Guidelines

Git history currently contains only `git init`, so no commit convention is established. Use short, imperative, descriptive subjects and focused commits. PRs should describe the change, link relevant issues, list verification results, and include screenshots for visible UI changes.

## Configuration

The API URL is currently `http://localhost:8080/api` in `src/config/axios.ts`. Run a compatible backend for API-dependent flows. Never commit credentials or secrets.
