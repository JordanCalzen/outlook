"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutGrid,
	Building2,
	Palette,
	Sparkles,
	Newspaper,
	Briefcase,
	Users,
	Construction,
	UserCog,
	FolderKanban,
	GraduationCap,
	Landmark,
	Heart,
	Building,
	Store,
	Smartphone,
	HeartHandshake,
	User,
	Package,
	Home,
	UtensilsCrossed,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const categories = [
	{ name: "All", href: "/", icon: LayoutGrid },
	{ name: "Agency", href: "/agency", icon: Building2 },
	{ name: "Artist", href: "/artist", icon: Palette },
	{ name: "Beauty", href: "/beauty", icon: Sparkles },
	{ name: "Blog", href: "/blog", icon: Newspaper },
	{ name: "Business", href: "/business", icon: Briefcase },
	{ name: "Community", href: "/community", icon: Users },
	{ name: "Construction", href: "/construction", icon: Construction },
	{ name: "Consultant", href: "/consultant", icon: UserCog },
	{ name: "Directory", href: "/directory", icon: FolderKanban },
	{ name: "Education", href: "/education", icon: GraduationCap },
	{ name: "Government", href: "/government", icon: Landmark },
	{ name: "Healthcare", href: "/healthcare", icon: Heart },
	{ name: "Hotel", href: "/hotel", icon: Building },
	{ name: "Marketplace", href: "/marketplace", icon: Store },
	{ name: "Mobile App", href: "/mobile-app", icon: Smartphone },
	{ name: "Nonprofit", href: "/nonprofit", icon: HeartHandshake },
	{ name: "Personal", href: "/personal", icon: User },
	{ name: "Product", href: "/product", icon: Package },
	{ name: "Real Estate", href: "/real-estate", icon: Home },
	{ name: "Restaurant", href: "/restaurant", icon: UtensilsCrossed },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<div className="flex h-screen w-64 flex-col border-r bg-white">
			<div className="p-6">
				<h1 className="text-xl font-semibold">Websitevice</h1>
			</div>
			<nav className="flex-1 space-y-1 overflow-y-auto p-4">
				{categories.map((category) => {
					const Icon = category.icon;
					return (
						<Link key={category.name} href={category.href}>
							<Button
								variant="ghost"
								className={cn(
									"w-full justify-start gap-3 font-normal",
									pathname === category.href && "bg-gray-100 font-medium"
								)}
							>
								<Icon className="h-4 w-4" />
								{category.name}
							</Button>
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
