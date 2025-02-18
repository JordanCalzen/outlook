import MainSidebar from "@/components/main-sidebar";
import { Header } from "@/components/top-navbar";
import React, { ReactNode } from "react";

export default function FrontLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<MainSidebar />
			<Header />
			<div className="pl-[3rem] pt-[3.2rem] fixed top-0">{children}</div>
		</div>
	);
}
