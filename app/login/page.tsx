"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
    const router = useRouter();
    
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        const username = data.username as string;
        const password = data.password as string;
        if (!username || !password) {
            toast.error("Username and password are required");
            return;
        }
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message || "Login successful");
                router.push('/');
            } else {
                const error = await response.text();
                toast.error(error || "Login failed");
            }
        } catch (error) {
            toast.error("An error occurred during login");
            console.error('Login error:', error);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen min-h-[100dvh] px-4 py-8 bg-gradient-to-r from-blue-800 to-white-800">
            <div className="w-full max-w-sm sm:max-w-md">
                <form onSubmit={handleLogin}>
                    <Card className="p-4 sm:p-10 border">
                        <div className="text-center mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold">Login to Quick-Blogs</h2>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Username:
                                </label>
                                <Input 
                                    type="text" 
                                    name="username" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Password:
                                </label>
                                <Input 
                                    type="password" 
                                    name="password" 
                                />
                            </div>
                            <Button type="submit" className="w-full mt-4 mb-2 sm:mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                                Login
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        </main>
    );
}

export default LoginPage;