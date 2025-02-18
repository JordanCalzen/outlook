"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Plus, WavesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation = [
	{ name: "Dashboard", href: "/" },
	{ name: "Team", href: "/team" },
	{ name: "Projects", href: "/projects" },
	{ name: "Calendar", href: "/calendar" },
];

export function Navbar() {
	const pathname = usePathname();

	return (
		<nav className="border-b bg-[#1a2332]">
			<div className="flex h-16 items-center gap-4 px-4 md:px-6">
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="mr-2 shrink-0 md:hidden"
						>
							<Menu className="h-5 w-5 text-white" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-64 bg-[#1a2332] p-0">
						<div className="flex h-16 items-center border-b px-6">
							<WavesIcon className="h-6 w-6 text-white" />
						</div>
						<div className="flex flex-col py-2">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white",
										pathname === item.href && "bg-white/5 text-white"
									)}
								>
									{item.name}
								</Link>
							))}
						</div>
					</SheetContent>
				</Sheet>

				<Link href="/" className="flex items-center gap-2">
					<WavesIcon className="h-6 w-6 text-white" />
				</Link>

				<div className="hidden md:flex md:gap-4">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white",
								pathname === item.href && "text-white"
							)}
						>
							{item.name}
						</Link>
					))}
				</div>

				<div className="ml-auto flex items-center gap-4">
					<Button
						variant="default"
						size="sm"
						className="hidden bg-indigo-500 hover:bg-indigo-600 md:flex"
					>
						<Plus className="mr-2 h-4 w-4" />
						New Job
					</Button>
					<Button variant="ghost" size="icon" className="hidden md:flex">
						<Bell className="h-5 w-5 text-white" />
						<span className="sr-only">View notifications</span>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="relative h-8 w-8 rounded-full"
					>
						<img
							alt="Avatar"
							className="rounded-full"
							src="https://sjc.microlink.io/S8T0Ek3ZkSGw8wp4sSN5TWYqm09Yv3VvX3DjUxqZRmo8nA632m8PPlqFSPT6uz0aML3R87ydCwRsv7uc6xXxdQ.jpeg"
							style={{
								aspectRatio: "32/32",
								objectFit: "cover",
							}}
						/>
						<span className="sr-only">Toggle user menu</span>
					</Button>
				</div>
			</div>
		</nav>
	);
}
