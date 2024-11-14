# services.events-admin-ui

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local Development

First, install all dependencies with:

```bash
npm ci
```

Second, run the development server:

```bash
npm run dev
```

Thirdly, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Review or TODO Items in prioritized order

- General application state management. Zulstand leaves the application as a whole in a per page state
- A way to trigger actions, such as logging in if the application wasn't ready yet
- Figure out the Client | undefined issue...
- Testing... just all the testing. Playright? What test framework should we use...
- Getting a "Actions on Save" working such that the file and spacing/imports all format
- Can you generate "models" from a contract?
- Should we use npm, yarn, pnpm, bun?
