"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";
import { db } from "@/prisma/db";
export type AuthUserProps = {
	email: string;
	username: string;
};
export const getSession = cache(async () => {
	const cookiesStore = await cookies();
	const cookie = cookiesStore.get("session")?.value;
	const session = await decrypt(cookie);
	if (!session) {
		return null;
	}
	const id = session.userId as string;
	try {
		const user = await db.user.findUnique({
			where: {
				id,
			},
		});
		return user as AuthUserProps;
	} catch (error) {
		console.log(error);
		return null;
	}
});
