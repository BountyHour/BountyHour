# BountyHour

## Meta

- [Tasks (Linear)](https://linear.app/bountyhour/)

## Resources

### Stack

- [Next.js (Framework)](https://nextjs.org)
- [NextAuth.js (Authentication)](https://next-auth.js.org)
- [Prisma (ORM)](https://prisma.io)
- [Tailwind (CSS)](https://tailwindcss.com)
- [tRPC (API)](https://trpc.io)

### Resources

- [T3 Stack (Project Base)](https://create.t3.gg/)
- [shadcn (UI)](https://ui.shadcn.com/)

## Technical

### Entities

- Managed by NextAuth
  - `Account`: Tokens & refreshing
  - `Session`: Sessions & expiring
  - `VerificationToken`: For future 2FA / email verification
- User
  - `User`: Profile, connects to all site entities
- Bounty
  - `Bounty`: Core entity, changes status and contains / references all relevant data
  - `Message`: Messages between bounty poster and hunter(s), may be automatic (e.g. on bounty submit)
  - `Attachment`: Optional attachment(s) to a message
  - `History`: Timestamped records of bounty state changes
  - `Tag`: Tags on bounties

### Project Structure

- `app/`: All publicly addressable resources (API, pages, all client-side)
  - `api/`: The public API routes available (e.g. OAuth, tRPC)
  - `(routes)/`: [Pages](#pages) on the site
- `components/`: Reusable chunks
  - `example/`: Example mockups of shadcn UI components
  - `ui/`: Shadcn UI components
- `lib/`: General utils / helpers
- `server/`: Server side code
  - `api/`: tRPC related code
    - `routers/`: Internal API endpoints
- `styles/`: CSS
- `trpc/`: Boilerplate for tRPC functionality

### Pages

- `/`: Homepage
- `(auth)`: Everything auth related, grouped for readability
  - `forgotten-password/`: Password reset screen
  - `login/`: Login screen
  - `logout/`: Logout screen
  - `register/`: Register screen
- `bounty/`: Everything bounty related
  - `/`: Summary of all subpages
  - `create`: Create a bounty
  - `search`: Search for a bounty
  - `my`: Currently assigned bounties
  - `[id]`: Viewing a specific bounty (messages, files, updates, history, etc)
- `profile/`: Everything profile related
  - `/`: Current user's profile
  - `[id]`: Viewing specific user's profile
