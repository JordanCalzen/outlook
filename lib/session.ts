import { User } from "@prisma/client";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import "server-only";
export type PayLoadProps = {
	userId: string;
	email: string;
	username: string;
	expiryDate: Date;
};

//encoding the secretKey
const secretKey = process.env.SESSION_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

//creating encryption function
export async function encrypt(payLoad: PayLoadProps) {
	return new SignJWT(payLoad)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1d")
		.sign(encodedKey);
}

//creating decryption function
export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error) {
		console.log(error);
	}
}

//creating a session
export async function createSession(user: User) {
	const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
	const payLoadData = {
		userId: user.id,
		email: user.email,
		username: user.username,
		expiryDate: expiresAt,
	};
	const session = await encrypt(payLoadData);
	const cookiesStore = await cookies();
	cookiesStore.set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		path: "/",
		sameSite: "lax",
	});
}

//creating a function that updates the function
export async function updateSession() {
	const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
	const cookiesStore = await cookies();
	const session = cookiesStore.get("session")?.value;
	const payload = await decrypt(session);
	if (!session || !payload) {
		return null;
	}
	cookiesStore.set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		path: "/",
		sameSite: "lax",
	});
}

//function for deleting a function

export async function deleteSession() {
	const cookiesStore = await cookies();
	cookiesStore.delete("session");
}
