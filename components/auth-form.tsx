"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type SignupProps = {
	email: string;
	username: string;
	password: string;
};

export type LoginProps = {
	password: string;
	email: string;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function AuthPage() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SignupProps>();
	const router = useRouter();

	const validateEmail = (email: string) => {
		const validDomains = ["@outlook.com", "@gmail.com"];
		return validDomains.some((domain) => email.toLowerCase().endsWith(domain));
	};

	async function formSubmit(data: SignupProps) {
		try {
			setLoading(true);
			const res = await fetch(`${baseUrl}/api/v1/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (res.status === 409) {
				setLoading(false);
				setError("User already exists");
				reset();
			} else if (res.status === 201) {
				setLoading(false);
				toast.success("created Account");
				reset();
				router.push("/mail");
				router.refresh();
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}

	async function LoginSubmit(data: LoginProps) {
		try {
			setLoading(true);
			const res = await fetch(`${baseUrl}/api/v1/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (res.status === 403) {
				setLoading(false);
				setError("Wrong credentials");
				toast.error("Wrong credentials");
				reset();
			} else if (res.status === 201) {
				setLoading(false);
				toast.success("Logged in successfully");
				reset();
				router.push("/mail");
				router.refresh();
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-6">
				<div className="text-center space-y-4">
					<h1 className="text-2xl font-semibold text-gray-900">
						Welcome to the new Outlook
					</h1>

					<div className="flex justify-center gap-4">
						<Image
							src="/outlook-removebg-preview.png"
							alt="Outlook"
							width={100}
							height={100}
							className="object-contain w-[80px]"
						/>
						<Image
							src="/gmail-removebg-preview.png"
							alt="gmail"
							width={100}
							height={100}
							className="object-contain w-[80px]"
						/>
					</div>

					<p className="text-sm text-gray-600">
						Outlook supports Outlook & Gmail accounts
					</p>
				</div>

				<Tabs defaultValue="signup" className="space-y-4">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="signup">Sign Up</TabsTrigger>
						<TabsTrigger value="login">Login</TabsTrigger>
					</TabsList>
					<TabsContent value="signup">
						<form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="signup-email">Email</Label>
								<Input
									type="email"
									placeholder="name@example.com"
									{...register("email", { required: true })}
								/>
								{errors.email && (
									<span className="text-red-700">This field is required</span>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="username">Username</Label>
								<Input
									type="text"
									{...register("username", { required: true })}
								/>
								{errors.username && (
									<span className="text-red-700">This field is required</span>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="signup-password">Password</Label>
								<Input
									type="password"
									{...register("password", { required: true })}
								/>
								{errors.password && (
									<span className="text-red-700">This field is required</span>
								)}
							</div>
							{error && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}
							{loading ? (
								<Button
									type="submit"
									className="w-full flex items-center justify-center gap-4  bg-blue-400 hover:bg-blue-700"
								>
									<Loader className="w-4 h-4 animate-spin" />
									Creating Account
								</Button>
							) : (
								<Button
									type="submit"
									className="w-full bg-blue-600 hover:bg-blue-700"
								>
									Create Account
								</Button>
							)}
						</form>
					</TabsContent>

					<TabsContent value="login">
						<form onSubmit={handleSubmit(LoginSubmit)} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="login-email">Email</Label>
								<Input
									type="email"
									placeholder="name@example.com"
									{...register("email", { required: true })}
								/>
								{errors.email && (
									<span className="text-red-700">This field is required</span>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									type="password"
									{...register("password", { required: true })}
								/>
								{errors.password && (
									<span className="text-red-700">This field is required</span>
								)}
							</div>
							{error && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}
							{loading ? (
								<Button
									type="submit"
									className="w-full flex items-center justify-center gap-4  bg-blue-400 hover:bg-blue-700"
								>
									<Loader className="w-4 h-4 animate-spin" />
									Logging in
								</Button>
							) : (
								<Button
									type="submit"
									className="w-full bg-blue-600 hover:bg-blue-700"
								>
									Login
								</Button>
							)}
						</form>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
