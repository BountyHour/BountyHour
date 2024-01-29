# BountyHour

## Links

- [Tasks (Linear)](https://linear.app/bountyhour/)

## Technical

### Stack

- [Next.js (Framework)](https://nextjs.org)
- [NextAuth.js (Authentication)](https://next-auth.js.org)
- [Prisma (ORM)](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC (API)](https://trpc.io)

### Resources

- [T3 Stack (Project Base)](https://create.t3.gg/)
- [shadcn (UI)](https://ui.shadcn.com/)

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
  - `Attachments`: Optional attachments to a message
  - `History`: Timestamped records of state changes
