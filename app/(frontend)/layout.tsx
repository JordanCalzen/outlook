import MainSidebar from "@/components/main-sidebar";
import { Header } from "@/components/top-navbar";
import { getSession } from "@/lib/dal";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function FrontLayout({
	children,
}: {
	children: ReactNode;
}) {
	const getTheSession = await getSession();
	if (!getTheSession) {
		return redirect("/authform");
	}
	return (
		<div>
			<MainSidebar />
			<Header />
			<div className="pl-[3rem] pt-[3.2rem] fixed top-0">{children}</div>
		</div>
	);
}
