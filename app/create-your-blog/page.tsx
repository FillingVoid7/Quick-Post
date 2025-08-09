"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";

interface User {
  username?: string;
  userId?: string;
}

export default function CreateBlog() {
    const router = useRouter();
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [_user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/profile");
                const data = await response.json();

                if (data.loggedIn) {
                    setIsLoggedIn(true);
                    setUser(data.user);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        checkAuth();
    }, []);

    const handleCreateBlog = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        const title = data.title as string; 
        const content = data.content as string; 
        if (!title || !content){
            toast.error("Title and content are required");
            setIsLoading(false);
            return;
        }

        try{
            const response = await fetch('/api/create-blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            })
            if (response.ok) {
                const result = await response.json();
                console.log('Response after create-blog ', result);
                toast.success("Blog post created successfully! 🎉");
                router.push(`/`);
            } else {
                toast.error("Failed to create blog post");
            }
        } catch (_error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const BackToHomePage = () => {
        router.push('/');
    } 

    // Show loading state while checking authentication
    if (authLoading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-1/2 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
                </div>

                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="text-center animate-fade-in">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg animate-spin">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                            Checking Authentication
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Please wait while we verify your access...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    // Show login prompt if user is not authenticated
    if (!isLoggedIn) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                
                {/* Back to Homepage Button */}
                <div className="absolute top-6 left-6 z-20 animate-fade-in">
                    <Button 
                        variant="outline" 
                        onClick={BackToHomePage}
                        className="flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-200 shadow-lg hover:shadow-xl px-4 py-2 rounded-xl font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Home</span>
                    </Button>
                </div>

                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-1/2 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
                </div>

                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="text-center animate-fade-in max-w-md mx-auto px-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl mb-8 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4 pb-2">
                            Access Restricted 🔒
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            You need to be logged in to create and publish blog posts. Please login to continue.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/login">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                                    🔑 Login to Continue
                                </Button>
                            </Link>
                            <Button 
                                onClick={BackToHomePage}
                                variant="outline" 
                                size="lg"
                                className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold px-8 transition-all duration-200"
                            >
                                🏠 Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        );
    } 

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            {/* Back to Homepage Button */}
            <div className="absolute top-6 left-6 z-20 animate-fade-in">
                <Button 
                    variant="outline" 
                    onClick={BackToHomePage}
                    className="flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-200 shadow-lg hover:shadow-xl px-4 py-2 rounded-xl font-medium"
                    disabled={isLoading}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Home</span>
                </Button>
            </div>

            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/2 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 pb-2">
                            Create Your Blog
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                            Share your thoughts, ideas, and experiences with the world
                        </p>
                    </div>

                    {/* Form Card */}
                    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-2xl shadow-blue-500/10 animate-slide-up">
                        <div className="p-8">
                            <form onSubmit={handleCreateBlog} className="space-y-8">
                                {/* Title Input */}
                                <div className="space-y-3 group">
                                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors">
                                        Title
                                    </label>
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="What's your blog about?"
                                        className="w-full h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Content Textarea */}
                                <div className="space-y-3 group">
                                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors">
                                        Content
                                    </label>
                                    <div className="relative">
                                        <Textarea
                                            id="content"
                                            name="content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="Start writing your amazing blog here..."
                                            className="w-full min-h-[250px] border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 resize-y pr-20"
                                            disabled={isLoading}
                                        />
                                        {/* Word Count Badge */}
                                        <div className="absolute bottom-3 right-3 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full shadow-lg">
                                            {wordCount} words
                                        </div>
                                    </div>
                                    {/* Word Count Info */}
                                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                        <span className={`font-medium ${wordCount >= 100 ? 'text-green-600' : wordCount >= 50 ? 'text-yellow-600' : 'text-gray-500'}`}>
                                            {wordCount >= 100 ? '✨ Great length!' : wordCount >= 50 ? '👍 Good start!' : '✏️ Keep writing...'}
                                        </span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button 
                                    type="submit" 
                                    disabled={isLoading || !content.trim()}
                                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    size="lg"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Publishing...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            <span>Publish blog</span>
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </Card>

  
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }
                .delay-300 {
                    animation-delay: 0.3s;
                }
                .bg-grid-pattern {
                    background-image: radial-gradient(circle, #000 1px, transparent 1px);
                    background-size: 50px 50px;
                }
            `}</style>
        </main>
    );
}