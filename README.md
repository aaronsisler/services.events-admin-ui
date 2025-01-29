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

- Need to get the cost to behave correctly
- Need to get a validation for Start and End times i.e. handle the HH:MM:SS format
- Need to figure out validations for the Add/Edit Scheduled Events page. I think there needs to be a "isValid" per row and will stop the "Next" button
- Figure out the Client | undefined issue...
- A way to trigger actions instead of needing to refresh the entire app, such as trying to poll fetching the App User if the service wasn't ready yet
- Can you generate "models" from a contract?
- Need to change how Published Event Schedules works since it only takes in one object instead of the common array
- Testing... just all the testing. Playright? What test framework should we use...
- Getting a "Actions on Save" working such that the file and spacing/imports all format
- Should we use npm, yarn, pnpm, bun?

## Reference if needed

### Pathname

import { usePathname } from "next/navigation";

const pathname = usePathname();
