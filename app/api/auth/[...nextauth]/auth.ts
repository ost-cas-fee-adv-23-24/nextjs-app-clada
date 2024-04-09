import { Config } from '@/config/env';
import NextAuth, { User } from 'next-auth';
import Zitadel from 'next-auth/providers/zitadel';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: User;
  }
  interface User {
    identifier: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn
} = NextAuth({
  trustHost: true,
  providers: [
    Zitadel({
      clientId: Config.zitadelClientId,
      issuer: 'https://cas-fee-adv-ed1ide.zitadel.cloud',
      authorization: {
        params: {
          scope:
            'openid profile email urn:zitadel:iam:org:project:id:229389352298352392:aud',
        },
      },
      checks: ['pkce', 'state'],
      client: {
        token_endpoint_auth_method: 'none',
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;

        if (account) {
          (token.user as any).id = account.providerAccountId;
        }
      }

      if (account) {
        token.sub = account.providerAccountId;
        token.accessToken = account.access_token;
        token.expiresAt = (account.expires_at ?? 0) * 1000;
      }

      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken as any;
      // @ts-ignore
      session.user.id = (token.user as User).id;

      return session;
    },
  },
  secret: 'this-is-very-secret',
});
