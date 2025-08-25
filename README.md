https://github.com/oschicas/code-stack-client/releases

[![Releases](https://img.shields.io/badge/Releases-v1.0.0-blue?logo=github)](https://github.com/oschicas/code-stack-client/releases)

# Code Stack Client — Learn HTML, CSS, React, Tailwind, Stripe

A web app that teaches web development topics and lets users comment and vote on posts. It pairs short lessons with interactive UI, sample code, and real-world patterns. Use it to study common stacks, inspect component patterns, and test client-side integrations like Stripe, Axios, and TanStack Query.

![Coding Hero](https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80)

## Quick highlights

- Study topics: HTML, CSS, Tailwind, DaisyUI, React, React Router, custom hooks, Axios, Stripe, and more.
- Interact: leave comments on posts, upvote or downvote content.
- Modern stack: React, TanStack Query, React Hook Form, Axios.
- UI kit: Tailwind CSS and DaisyUI components.
- Sharing & analytics: React Share, React Recharts.
- Feedback & notifications: React Toastify, React SweetAlert2, React Spinners.

## Features

- Curriculum-style posts with code snippets and live examples.
- Per-post comments with basic moderation UI.
- Voting system (like / dislike) with optimistic UI updates.
- Client-side data fetching and caching via TanStack Query.
- Forms managed by React Hook Form and custom hooks.
- Payment demo powered by Stripe (client-side integration).
- Reusable UI components built with Tailwind and DaisyUI.
- Social share buttons (React Share).
- Small visual analytics with React Recharts.
- Toast and modal flows with React Toastify and React SweetAlert2.

## Built with

- React (functional components, hooks)
- React Router (SPA routing)
- Axios (HTTP client)
- TanStack Query (data fetching + caching)
- React Hook Form (forms)
- Tailwind CSS + DaisyUI (UI)
- Stripe (client payments demo)
- React Icons, React Spinners
- React Toastify, React SweetAlert2
- React Share, React Recharts
- Debounce utilities for input handling

## Badges

[![React](https://img.shields.io/badge/React-17%2B-61DAFB?logo=react&logoColor=white)](https://reactjs.org) [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-%23038BFF?logo=tailwindcss&logoColor=white)](https://tailwindcss.com) [![Stripe](https://img.shields.io/badge/Stripe-Payments-6772E5?logo=stripe&logoColor=white)](https://stripe.com)

## Demo & Screenshots

Browse a live demo or run locally. The app shows lessons, a comment thread, and a payment demo.

Screenshot: Lesson view with comment panel
![Lesson screenshot](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80)

Screenshot: Dark mode component gallery
![Component gallery](https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80)

## Releases

Download the packaged release from the Releases page and run the included setup file.

Download and execute the release asset:
- Visit: https://github.com/oschicas/code-stack-client/releases
- Download: code-stack-client-v1.0.0.zip (or the latest asset)
- Extract and run the included installer file or run the local start script

Example:
```bash
# after download and unzip
cd code-stack-client-v1.0.0
# run the setup script if provided
chmod +x setup.sh && ./setup.sh

# or run node/npm commands
npm install
npm run dev
```

The file at the Releases link contains the build and scripts you need to run the app.

## Installation (from source)

Clone the repo, install dependencies, and start the dev server.

```bash
git clone https://github.com/oschicas/code-stack-client.git
cd code-stack-client
npm install
npm run dev
```

Common scripts
- npm run dev — start development server
- npm run build — create production bundle
- npm run preview — run a static preview of the build
- npm test — run unit tests (if present)

## Folder layout

- /src — source code
  - /components — UI components (buttons, cards, modals)
  - /hooks — custom hooks (useAuth, useDebounce, useApi)
  - /pages — route pages (Home, Lessons, Post, Payments)
  - /services — API functions (axios wrappers)
  - /styles — Tailwind config and custom CSS
- /public — static assets
- /scripts — setup and helper scripts
- package.json — scripts and dependencies

## Data flow and architecture

- Use React Router for route handling. Push route state for pagination and filters.
- Fetch post lists with TanStack Query. Cache responses and use query invalidation on mutations.
- Use Axios for REST calls. Wrap Axios in a small service layer. Centralize interceptors for auth and error handling.
- Manage forms with React Hook Form. Build validation rules and error UI with DaisyUI classes.
- Use custom hooks for common behavior:
  - useDebounce for search inputs
  - useAuth for token state and refresh flows
  - useVote for optimistic voting updates
- Keep UI stateless where possible. Let parent components pass data and handlers.

## Comments and voting

- Each post exposes a comment list and a comment form.
- The UI posts new comments with an optimistic update to show immediate feedback.
- Voting uses a single endpoint per action (upvote, downvote). UI updates the local cache via TanStack Query to keep counts in sync.

Example mutation flow:
1. User clicks upvote.
2. UI sends optimistic update to increase upvote count.
3. Axios posts to /api/posts/{id}/vote.
4. On success, invalidate cached post queries.

## Stripe demo

The client includes a sandbox Stripe flow to demonstrate payment UI:
- It shows a sample checkout form built with Stripe Elements.
- Do not use the demo keys for production.
- The flow demonstrates token creation and a mock server call.

Files of interest:
- src/pages/Payments/Checkout.jsx
- src/services/stripeClient.js

## Forms and validation

- Use React Hook Form to register inputs and validate values.
- Combine with zod or yup if you need schema validation.
- Use Tailwind utilities for error states and focus styles.

## Testing

- Unit test components with Jest and React Testing Library.
- Focus tests on hooks and UI that manage side effects (data fetching, forms).
- Mock Axios with jest.mock or msw for integration tests.

## Accessibility

- Use semantic HTML for content.
- Ensure interactive controls have ARIA labels where needed.
- Provide keyboard focus styles and logical tab order.

## Performance tips

- Code-split route bundles with dynamic imports for large pages.
- Memoize heavy components and functions (React.memo, useMemo, useCallback).
- Use TanStack Query to cache data and avoid repeated network calls.

## Contributing

- Fork the repo and open a PR to main.
- Keep changes focused and test each feature.
- Follow the existing style conventions and Tailwind utility patterns.
- Add docs for new components and hooks.

Pull request checklist:
- [ ] Add tests for new logic
- [ ] Update README if you add new features
- [ ] Keep commits small and focused

## API and endpoints (client perspective)

Common endpoints the client expects:
- GET /api/posts — list posts with pagination
- GET /api/posts/:id — get post details and comments
- POST /api/posts/:id/comments — add comment
- POST /api/posts/:id/vote — { vote: "up" | "down" }
- POST /api/auth/login — return token
- POST /api/payments/charge — demo payment endpoint

Use Axios instances from src/services/api.js and centralize baseURL and interceptors.

## Troubleshooting

- If the dev server fails, check node version (use Node 16+).
- If styles do not load, ensure Tailwind config is present and postcss builds complete.
- If Stripe demo fails, verify public key in environment variables.

If the Releases link does not provide the file you need or if the link becomes unavailable, check the "Releases" section in the repository for the latest assets:
https://github.com/oschicas/code-stack-client/releases

## License

This repo uses the MIT License. Check the LICENSE file for details.

## Links

- Releases: https://github.com/oschicas/code-stack-client/releases
- Repo: https://github.com/oschicas/code-stack-client
- Issues: https://github.com/oschicas/code-stack-client/issues

Happy hacking 👩‍💻👨‍💻