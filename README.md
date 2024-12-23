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

- Toast or something for when we save or do something
- How do we want the workflow for editing/updating Scheduled Events to be. I don't want to have to add and update one at a time.
- Figure out the Client | undefined issue...
- Need to change how Published Event Schedules works since it only takes in one object instead of the common array
- A way to trigger actions, such as logging in if the application wasn't ready yet
- Can you generate "models" from a contract?
- Testing... just all the testing. Playright? What test framework should we use...
- Getting a "Actions on Save" working such that the file and spacing/imports all format
- Should we use npm, yarn, pnpm, bun?

## Reference if needed

### Pathname

import { usePathname } from "next/navigation";

const pathname = usePathname();
