# Technical Assessment Sandbox

This project is based on a simplified version of our current stack, which includes Next.js, TypeScript, Tailwind CSS, tRPC, Drizzle and Cloudflare Workers. Turborepo is used to manage the monorepo.

You do not need to be familiar with all of these technologies to complete the assessment, as the assessment will be done as a pair programming exercise. If there is a part of the stack you don't fully understand, your interviewer is there to help. We're looking to get a feel for your ability to solve problems, not format code, so if eslint/prettier could solve something, don't worry about it. Equally, talking through a "proper" solution to something that we can quickly hack around for the sake of the assessment, that is also valid.

## Getting Started

You do not need to do this for the assessment itself, as we will endevour to host a VSCode Live Share session for you. However, if you would like to run the project locally, you can follow these steps:

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Setup the database: `pnpm db:migrate`
4. Run the development servers: `pnpm dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser for the application
6. (Optional) Open [http://local.drizzle.studio](http://local.drizzle.studio) in your browser to view the Drizzle database studio - this may not work over liveshare but your interviewer can screenshare if necessary
7. Run `pnpm db:gen` to generate migrations for the database if you change the schema, then `pnpm db:migrate` to apply them

If you prefer to use an IDE other than VSCode, you are welcome to do so and screenshare instead.

## Important files in the project structure

```bash
root/
├── apps/
│ ├── web/
│ │ ├── app/
│ │ │ ├── layout.tsx            # Root layout
│ │ │ ├── page.tsx              # Root page that loads the form and stream
│ │ ├── components/
│ │ │ ├── notifications/
│ │ │ │ ├── create-form.tsx     # Form component to create a Notification
│ │ │ │ ├── stream.tsx          # Component to display the realtime stream of Notifications
│ │ │ ├── ui/                   # Shared UI components with Shadcn
│ │ ├── lib/
│ │ │ ├── trpc/                 # tRPC client and hooks
├── services/
│ ├── api/
│ │ ├── migrations/             # Drizzle database migrations
│ │ ├── src/
│ │ │ ├── db/
│ │ │ │ ├── schemas/            # Drizzle DB schemas
│ │ │ ├── durable-objects/
│ │ │ │ ├── notifications.ts    # Durable Object for Notifications websocket
│ │ │ ├── routes/               # tRPC routes
│ │ │ │ ├── notifications/
│ │ │ │ │ ├── create.ts         # Backend procedure for creating a Notification
│ │ │ ├── trpc/                 # tRPC setup
```

## Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [tRPC](https://trpc.io/) - Typesafe backend
- [Tanstack Query](https://tanstack.com/query) - Data fetching (within tRPC wrapper)
- [Zod](https://zod.dev/) - Validation
- [Shadcn UI](https://ui.shadcn.com/) - Used for basic components
- [Drizzle](https://orm.drizzle.team/) - Using SQLite for the database
- [Drizzle Zod](https://orm.drizzle.team/docs/zod) - Used to generate Zod schemas from database schemas
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) - Serverless functions
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/) - This is used to handle serverless websocket connections, **familiarity is not required for the assessment**

# The Application

You’ve been given an an application for a Notification Publishing Platform that allows a user to publish realtime `Notifications` to connected clients. Storing of `Notifications` is required, but retrieval of old `Notifications` is not necessary, but adding a tRPC route for fetching all and/or single `Notifications` would be a good stretch goal.

The application is a sandbox with basic features implemented, it can be changed and critiqued as necessary.

(You don't need to worry about authentication or permissions. You can assume there will only be a single user of the application.)

## The Domain

A `Notification` describes a message that should be sent to all currently connected clients.

A `Notification` has a `type` which describes how the `Notification` should be displayed on the client.

There are currently 2 valid options for `type`, although only `Announcement` is currently implemented in the form:

- `Announcement`: A generic message that includes a `title` and optionally a `description`
- `Alarm`: A warning message that includes a `title`, optional `description` and a required `urgency` field which can be one of `low`, `medium` or `high`

Both `Notification` types include a `createdAt` field which is the time the `Notification` was created in the database.

Both `Notification` types have been scaffolded in the frontend, but will need to be updated to add new fields. The database is setup to handle only a `type` and `title` field, it is up to you to update the database schema to handle the new fields (be aware that SQLite does not work nicely with enums, but Drizzle does have a way of handling this).

You can change _anything_ you want in this application, including the database schema, frontend components, backend routes, etc - as long as the core functionality of the application remains the same. Keep in mind the assessment is only 1 hour long, so don't feel like you need to make drastic changes, explaining what you would change and why is also valid.
