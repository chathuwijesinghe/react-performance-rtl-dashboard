# Pulseboard — React Performance & RTL Dashboard

A small portfolio-ready assessment project demonstrating four practical frontend skills:

1. Translating a dashboard-style UI into reusable React components.
2. Handling API loading, success, empty, and error states.
3. Preventing avoidable effect executions and reducing unnecessary component renders.
4. Supporting responsive layouts and Arabic right-to-left (RTL) presentation.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

Create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    Dashboard.tsx
    Header.tsx
    MetricCard.tsx
    RecordsTable.tsx
    StatusBadge.tsx
    StatePanel.tsx
  data/
    mockApi.ts
  hooks/
    useRecords.ts
  types/
    record.ts
  App.tsx
  index.css
  main.tsx
```

## API state handling

`useRecords` owns the request lifecycle and exposes `records`, `status`, `error`, and `refetch`. The UI renders explicit loading, error, empty, and success states. The request effect has a stable dependency list and uses an `AbortController` so an obsolete request cannot update state after cleanup.

The mock API intentionally supports three demo modes using the control in the dashboard:
- **Normal data** — returns a list of records.
- **Empty response** — returns an empty list.
- **Simulated error** — rejects with a useful error message.

The mock API uses a delay to make the loading state visible. Replace `getRecords` in `src/data/mockApi.ts` with your real `fetch`/Axios call when connecting an API.

## Performance decisions

- The request is isolated in a custom hook rather than being triggered by table rendering.
- The effect depends only on the explicit `reloadKey` and `mode` values.
- `AbortController` cancels stale in-flight requests during cleanup.
- `RecordsTable` and `MetricCard` use `React.memo` to avoid work when their props have not changed.
- Event handlers passed to memoized children are stabilized with `useCallback`.
- Search is derived from the current records and query; no duplicate filtered state is stored.

Note: React Strict Mode may intentionally run effects an extra time in development to help find unsafe side effects. Verify production behavior as well, and do not treat every development-only duplicate request as a production bug.

## RTL and responsive design

The language switch changes the document direction and labels between English (`ltr`) and Arabic (`rtl`). Layout spacing uses CSS logical properties such as `padding-inline`, `margin-inline-start`, and `text-align: start` instead of hard-coded left/right values.

Test both languages at:
- 375px mobile
- 768px tablet
- 1440px desktop

Check navigation direction, table overflow, text wrapping, icon placement, form controls, and horizontal scrolling.

## Performance verification checklist

### Chrome DevTools
1. Open **Network**, enable **Disable cache**, and reload.
2. Inspect request count, duration, transferred size, and waterfall.
3. Use CPU/network throttling to approximate a mid-range mobile device.
4. Use **Performance** to inspect long tasks and main-thread work.
5. Use **React DevTools Profiler** to compare component commits before and after interactions.

### Lighthouse
1. Open Chrome DevTools → Lighthouse.
2. Select Mobile and run a report.
3. Record Performance, LCP, INP (where available), and CLS.
4. Apply one optimization at a time and rerun under the same conditions.

For a real production page, inspect image dimensions/formats, JavaScript bundle size, unused code, font loading, API waterfalls, and layout shifts before choosing optimizations.

## Suggested GitHub repository description

A responsive React + TypeScript dashboard demonstrating API loading/error/empty states, render optimization, and English/Arabic RTL support.

## Suggested Upwork attachment note

I built this focused React + TypeScript dashboard to demonstrate reusable component structure, API state handling, performance-conscious rendering, responsive layouts, and Arabic RTL support. The repository includes setup instructions and a verification checklist.
