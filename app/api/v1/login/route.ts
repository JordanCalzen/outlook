import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { compareSync } from "bcrypt-ts";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();
		const { email, username, password } = data;
		const existingUser = await db.user.findFirst({
			where: {
				email,
			},
		});
		if (!existingUser) {
			return NextResponse.json(
				{
					data: null,
					error: "Wrong credentials",
				},
				{ status: 403 }
			);
		}
		const isCorrectPassword = compareSync(password, existingUser.password);
		if (!isCorrectPassword) {
			return NextResponse.json(
				{
					data: null,
					error: "Wrong credentials",
				},
				{ status: 403 }
			);
		}
		await createSession(existingUser);
		const { password: RemovePassword, ...others } = existingUser;

		return NextResponse.json(
			{
				data: others,
				error: null,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				data: null,
				error: "Something went wrong",
			},
			{ status: 500 }
		);
	}
}
