# Deployment dependency repair

Exact direct versions are pinned; Node 22.x and npm 10.9.8. No force or legacy peer dependency flags.

The reported Next 7 canary requires React/React DOM ^16.0.0; Next 16.4.6 accepts ^19.0.0. The old canary is absent from the checked-in lock. Wildcard root ranges allowed resolver backtracking; the full original Vercel ERESOLVE log was not available, so the trigger for that backtracking cannot be established. Radix Slot 1.5.0, Lucide 1.72.0 and Motion 14.13.0 all accept React 19.

| Package | Before range | Pinned |
|---|---|---|
| @babel/core | ^7.28.0 | 7.28.0 |
| @babel/types | ^8.1.2 | 8.1.2 |
| @radix-ui/react-slot | * | 1.5.0 |
| caniuse-lite | ^1.0.30001700 | 1.0.30001700 |
| clsx | * | 2.1.1 |
| lucide-react | * | 1.72.0 |
| motion | * | 14.13.0 |
| next | * | 16.4.6 |
| qrcode | ^1.5.4 | 1.5.4 |
| react | * | 19.3.1 |
| react-dom | * | 19.3.1 |
| tailwind-merge | * | 3.7.0 |
| zod | ^4.1.12 | 4.1.12 |
| zustand | * | 5.1.0 |
| @tailwindcss/postcss | * | 4.3.5 |
| @types/node | * | 26.6.6 |
| @types/qrcode | ^1.5.6 | 1.5.6 |
| @types/react | * | 19.3.0 |
| eslint | * | 9.39.4 |
| eslint-config-next | * | 16.4.6 |
| tailwindcss | * | 4.3.5 |
| tsx | * | 4.23.15 |
| typescript | * | 6.0.3 |
