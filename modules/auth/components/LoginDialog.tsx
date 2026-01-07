import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import { signInWithGoogle } from "@/core/lib/firebase";
import { useState } from "react";

import { AuthService } from "@/modules/auth/services/auth.service";

interface LoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

const LoginDialog = ({ open, onOpenChange, onSuccess }: LoginDialogProps) => {
    const { setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const firebaseUser = await signInWithGoogle();

            if (firebaseUser) {
                // Split display name into first and last name
                const [firstName = "", ...lastNameParts] = (firebaseUser.displayName || "").split(" ");
                const lastName = lastNameParts.join(" ");

                // Sync with backend
                await AuthService.login({
                    first_name: firstName,
                    last_name: lastName || "User", // Fallback if last name is missing
                    email: firebaseUser.email || ""
                });

                setUser(firebaseUser);
                onOpenChange(false);
                onSuccess?.();
            }
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] sm:max-w-[420px] p-0 overflow-hidden gap-0 border-border/50 shadow-2xl bg-white [&>button]:text-gray-500 [&>button]:hover:text-gray-900 z-[200]">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-600/10 to-transparent pointer-events-none" />

                <div className="relative flex flex-col items-center justify-center p-6 pt-8 sm:p-8 sm:pt-10 text-center">
                    {/* Logo Section */}
                    <div className="relative mb-6 group">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-600/20 to-teal-600/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative h-20 w-20 rounded-2xl bg-white shadow-xl flex items-center justify-center p-4 ring-1 ring-gray-100">
                            <img
                                src="/images/logo.png"
                                alt="VeoCient Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="space-y-2 mb-8">
                        <DialogTitle className="text-2xl font-bold tracking-tight font-['Outfit'] text-gray-900">
                            Welcome to Greeny
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-600 max-w-[280px] mx-auto leading-relaxed">
                            Sign in to unlock personalized shopping, order tracking, and history.
                        </DialogDescription>
                    </div>

                    {/* Actions */}
                    <div className="w-full space-y-4">
                        <Button
                            onClick={handleLogin}
                            disabled={isLoading}
                            variant="outline"
                            className="w-full h-12 relative overflow-hidden transition-all hover:bg-gray-50 hover:border-emerald-200 group border-gray-200 bg-white text-gray-900"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-600/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    <span className="font-medium">Continue with Google</span>
                                </div>
                            )}
                        </Button>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-[11px] text-gray-400 text-center max-w-[240px]">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
