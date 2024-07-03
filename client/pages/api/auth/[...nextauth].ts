import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
        }),
        Github({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string
        })
    ],
    secret: process.env.SECRET,
}

export default NextAuth(authOptions);
