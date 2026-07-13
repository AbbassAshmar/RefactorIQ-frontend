# Frontend Engineering Guide

This document is the working guide for the frontend repository. Read and follow it for every frontend prompt, feature, bug fix, refactor, and review. Preserve existing behavior unless the task explicitly asks for a behavior change.

## Product and visual direction

The frontend follows a visual language similar to the Wazuh platform:

- Prefer a clean, information-dense security and operations dashboard aesthetic.
- Use clear hierarchy, restrained decoration, consistent spacing, and strong readability.
- Favor practical panels, tables, filters, status indicators, and predictable navigation patterns.
- Design for real operational states: loading, empty, error, success, disabled, selected, hover, pressed, and focus.
- Keep interactions accessible and obvious. Do not rely on color alone to communicate status.
- Reuse existing components and patterns before introducing a new component or visual treatment.

Do not introduce unrelated visual changes while implementing a functional request. When a design decision is not specified, inspect nearby screens and components and follow the established pattern.

## Repository architecture

The frontend is organized around a separation between API access, reusable React hooks, UI components, and pages:

- `src/api/` contains API-facing functions and request definitions.
- `src/hooks/` contains reusable stateful behavior and React Query integration.
- `src/components/` contains reusable presentation and interaction components.
- `src/components/common/PanelWrapper.jsx` is the reusable wrapper for panels.
- `src/components/common/TablePanel.jsx` is the reusable wrapper for large tables.
- `src/components/common/SecurityCenterTabBar.jsx` handles switching views or tabs in pages. It is used by most pages, but not every page.
- `src/Pages/` contains route- or feature-level page composition.
- `tailwind.config.js` is the source of truth for Tailwind colors, fonts, font sizes, and shadows.

Use the existing path alias (`@/`) when importing frontend modules if the surrounding code does so. Keep network details in API modules; keep query/mutation state and cache behavior in hooks; keep rendering and local interaction state in components or pages.

Before adding a file, search for an existing implementation of the same concern. Extend a shared component or hook when the behavior is genuinely shared, but avoid creating abstractions for a single use case without evidence that they will be reused.

### Shared layout and navigation components

- Wrap standard panels with [PanelWrapper.jsx](src/components/common/PanelWrapper.jsx) instead of recreating panel borders, surfaces, spacing, or headers.
- Wrap large tables with [TablePanel.jsx](src/components/common/TablePanel.jsx) so table layout, scrolling, and surrounding panel behavior stay consistent.
- Use [SecurityCenterTabBar.jsx](src/components/common/SecurityCenterTabBar.jsx) for page view or tab switching when the page follows the Security Center navigation pattern. It is the default pattern for most pages, but it is not mandatory for pages whose navigation model is different.
- Check the existing component API before adding wrapper markup or custom tab state. Keep view-switching state in the established page/tab pattern.

## UI libraries

Use the libraries already established in the frontend:

- Use TanStack Table for data tables, especially large or interactive tables. Follow the existing column, sorting, filtering, pagination, and row-rendering patterns.
- Use `react-chartjs-2` for charts and the project's existing Chart.js configuration and styling patterns.
- Use `lucide-react` for icons. Prefer an existing icon choice and consistent sizing/stroke styling before introducing another icon source.

Do not replace these libraries with ad hoc table, chart, or icon implementations unless the task explicitly requires it and the tradeoff is documented.

## Client overview conventions

The client overview uses a compact dashboard layout:

- The second row contains Top 5 files to refactor, Top Refactor Drivers, and Architectural Hotspot.
- The third row pairs Risk by Directory with the Recommended Focus Area insight panel.
- The Top 5 files table is a backend-limited, non-paginated result. Its footer is disabled and its rows use the compact table spacing.
- Top Refactor Drivers uses the `component_weights` metadata from the top-files response and presents the drivers in plain language: Maintenance complexity, System impact, Change activity, and Repeated code.
- The directory insight endpoint receives summarized directory evidence and returns a predictable title, finding, explanation, recommendation, and priority directories. Keep this panel action-oriented and non-technical; it should explain what to do next rather than repeat chart metrics.

### Chart colors and theme resolution

Chart.js does not resolve CSS variables passed directly as color strings. Values such as `var(--border-default)` and `var(--info-default)` will not work when assigned to `borderColor`, `backgroundColor`, `pointBackgroundColor`, grid colors, or tick colors.

Keep chart colors theme-driven, but resolve them before passing them to `react-chartjs-2`:

```jsx
import { useTheme } from '@/context/ThemeProvider';
import { CHART_COLOR_VARS } from '@/utils/constants';
import { resolveThemeColor } from '@/utils/themeColors';

const { themeColors } = useTheme();
const chartColor = resolveThemeColor(themeColors, CHART_COLOR_VARS.RISK_TREND_SCORE);

const data = {
  datasets: [{
    borderColor: chartColor,
    pointBackgroundColor: chartColor,
    backgroundColor: resolveThemeColor(
      themeColors,
      CHART_COLOR_VARS.RISK_TREND_SCORE_FILL,
    ),
  }],
};
```

Use [themeColors.js](src/utils/themeColors.js) for this resolution. `resolveThemeColor` accepts a CSS variable reference, follows semantic variables recursively through the active theme map, and returns the actual color value required by Chart.js. Direct color values are returned unchanged. Use `resolveThemeColors` when resolving a palette or array of colors.

The theme maps in [dark.js](src/themes/dark.js) and [light.js](src/themes/light.js) are the global chart color configuration. Add a chart's required colors to both maps using `chart-<chart-name>-<role>` keys. This includes line and bar borders, fills, dots, hover dots, grid lines, labels, and every other chart color. Reference those values through constants rather than repeating CSS variable names in chart components.

Chart palettes should follow the Wazuh-inspired visual direction: professional, meaningful, de-saturated, and clearly distinguishable without being overly bright. Use related cool slate, blue, and teal tones for related series; reserve stronger semantic colors for actual success, warning, or error meaning. For example, a `top-architectures` chart with four bars uses four theme tokens:

```js
'chart-top-architectures-bar-1': 'hsl(220, 48%, 52%)',
'chart-top-architectures-bar-2': 'hsl(200, 44%, 48%)',
'chart-top-architectures-bar-3': 'hsl(175, 40%, 45%)',
'chart-top-architectures-bar-4': 'hsl(150, 38%, 43%)',
```

Define the light and dark versions in their respective theme maps and resolve them before use. Do not pass `var(--...)` directly into a Chart.js configuration, and do not hardcode an isolated `hsla(...)` value in a component when it belongs to the chart's theme configuration.

## Constants and stable names

Never hardcode domain names or machine-readable values in components, hooks, API calls, or query construction. This includes names, states, statuses, file priority bands, query-string parameter names, filters, and other values that must remain consistent across the application.

Always use the constants stored under [constants.js](src/utils/constants.js). Add a missing shared constant there rather than duplicating a string in multiple files. Keep display labels separate from stable values when the project distinguishes between them, and use the existing constant shape and naming convention.

When adding or changing a constant:

- Search all usages before changing its value or meaning.
- Preserve the value expected by the backend, URL, persisted state, or table/filter logic.
- Do not use a user-facing label as a substitute for a stable query-string or API value.
- Keep fallback behavior explicit for unknown or newly introduced values.

## Sending requests from the frontend

Requests should follow the pattern used by [useAuth.js](src/hooks/useAuth.js): API functions are imported from the API layer and passed to TanStack React Query hooks as `queryFn` or `mutationFn`.

```js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api';

export function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.me,
    ...options,
  });
}

export function useAdminLogin(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.adminLogin,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
}
```

Request conventions:

- Add or reuse the API function in `src/api/`; do not put raw `fetch`, Axios, or request construction inside a presentational component.
- Use `useQuery` for reads and `useMutation` for writes or actions.
- Give every query a stable, descriptive `queryKey`. Include resource identifiers and relevant filters when they affect the response.
- Use `useQueryClient` to invalidate or update affected queries after successful mutations.
- Preserve caller callbacks when a hook adds lifecycle behavior. Call the caller's `onSuccess`, `onError`, or `onSettled` when appropriate.
- Expose React Query's status and error information to consumers instead of hiding request state.
- Keep redirects and side effects in the hook or feature boundary. For example, the GitHub login hook redirects only when the response contains `data.authorize_url`.
- Logout clears the query cache so authenticated data is not left available after the session ends.
- Do not assume a successful HTTP response contains a complete payload. Handle missing, null, or partial response data at the boundary where it matters.

### Request edge cases

- Prevent duplicate submissions through the mutation state or the established UI pattern.
- Show a useful loading state for queries and mutations; avoid blank panels that look broken.
- Provide an empty state when a successful list response has no records.
- Handle expired sessions and unauthorized responses using the existing authentication flow.
- Keep stale data behavior intentional. If a mutation changes a resource, invalidate every affected list, detail, count, or current-user query.
- Treat cancellation, navigation during a request, and component unmounting as normal conditions. Do not add unsafe state updates after unmount.
- Avoid firing requests when required input is absent; use the query's `enabled` option where appropriate.
- Preserve server-provided error context when displaying errors, but do not expose secrets, tokens, stack traces, or raw internal details to users.

## Styling and Tailwind

Use [tailwind.config.js](tailwind.config.js) for colors, fonts, font sizes, and shadows. Prefer the configured semantic tokens over arbitrary color values or one-off CSS values.

The theme includes semantic groups such as `text-*`, `background-*`, `border-*`, `brand-*`, `success-*`, `error-*`, `warning-*`, `info-*`, and `accent-*`. Use the token that expresses the design intent rather than hard-coding a hex value.

### Required `DEFAULT` rule

When a color is defined with `DEFAULT` in Tailwind, the framework automatically collapses it into the base name. **Never use `-default` in utility classes.**

Correct usage:

```txt
bg-error        -> background-color: var(--error-default)
text-success    -> color: var(--success-default)
border-warning  -> border-color: var(--warning-default)
divide-border   -> divider-color: var(--border-default)
```

Incorrect usage (will not work):

```txt
bg-error-default
text-success-default
border-warning-default
divide-border-default
```

Use the configured font family (`font-sans`) and named font sizes (`text-h1`, `text-body`, and so on) where they match the existing design. Prefer responsive utilities and existing layout conventions. Keep focus states visible and maintain sufficient contrast for text, borders, icons, and status colors.

## Component and page conventions

- Keep components focused on one responsibility and make their inputs explicit.
- Prefer composition and existing primitives over deeply nested conditional markup.
- Keep derived values derived; do not duplicate state that can be calculated from props, query data, or form state.
- Use stable keys for lists. Never use array indexes when the item has a stable identifier.
- Keep feature-specific components near their page or feature when they are not reusable.
- Use shared components for repeated behavior, accessibility, and styling.
- Keep forms predictable: label every field, associate errors with their fields, preserve entered values when possible, and disable or guard submission while pending.
- Buttons and links must communicate their action. Use buttons for actions and links for navigation.
- Tables, lists, and cards should account for long text, missing values, pagination or filtering state, and narrow screens.
- Avoid unnecessary global state. Use local state for local UI, React Query for server state, and the existing application state solution for cross-page client state.

## Accessibility and UX requirements

- Use semantic HTML first.
- Ensure keyboard users can reach and understand every interactive control.
- Provide visible focus styling.
- Icon-only controls need an accessible label or tooltip pattern already used by the project.
- Do not use placeholder text as the only field label.
- Announce or visibly associate validation and request errors with the relevant control or operation.
- Check empty, loading, error, disabled, hover, pressed, selected, and focus states whenever adding a component.
- Make destructive actions explicit and require the established confirmation pattern when one exists.

## Implementation and review checklist

Before considering a change complete:

- Search for and reuse existing API, hook, component, and styling patterns.
- Confirm request query keys and cache invalidation cover all affected data.
- Verify loading, empty, error, success, disabled, and partial-data states.
- Check that Tailwind utilities use semantic tokens and never use a `-default` suffix for a `DEFAULT` color.
- Check responsive behavior, keyboard access, focus visibility, and text contrast.
- Keep changes scoped to the requested feature and avoid unrelated formatting churn.
- Run the most relevant available lint, type-check, test, or build command after editing.
- If a command cannot be run, state that clearly and report what was verified instead.

When requirements conflict with this guide, follow the explicit task requirement and document the exception in the implementation or handoff when it affects future work.
