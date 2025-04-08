import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      userinfo: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        token.googleData = {
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token.googleData) {
        session.googleData = token.googleData
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
