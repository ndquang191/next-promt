import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],

	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({
				email: session.user.email,
			});

			session.user.id = sessionUser._id.toString();

			return session;
		},

		async signIn({ profile }) {
			try {
				//serverless -> lamda function -> open when it get called => spin up sv -> connect to db
				await connectToDB();
				// check if user exist
				console.log("PROFILE ", profile);
				// if not create e new user
				const userExists = await User.findOne({
					email: profile.email,
				});

				console.log("USER EXIST", userExists);

				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture,
					});
				}
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
