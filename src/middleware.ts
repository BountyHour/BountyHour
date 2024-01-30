export { default } from "next-auth/middleware";

// These exact paths require login, any child pages aren't protected
// Note: Inverse logic is handled in `@/(routes)/(auth)/layout.tsx`
export const config = { matcher: ["/help", "/account"] };
