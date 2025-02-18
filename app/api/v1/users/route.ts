import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcrypt-ts";

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();
		const { email, username, password } = data;
		const existingUser = await db.user.findFirst({
			where: {
				email,
			},
		});
		if (existingUser) {
			return NextResponse.json(
				{
					data: null,
					error: "User already exists",
				},
				{ status: 409 }
			);
		}
		const hashedPassword = hashSync(password, 10);
		const newUser = await db.user.create({
			data: { email, username, password: hashedPassword },
		});
		const { password: RemovePassword, ...others } = newUser;
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
