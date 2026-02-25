'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, User, Lock, Eye, EyeOff, Smartphone } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginType, setLoginType] = useState<'consumer' | 'admin'>('consumer');
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate authentication
        setTimeout(() => {
            if (loginType === 'consumer') {
                router.push('/consumer');
            } else {
                router.push('/dashboard');
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white text-black relative overflow-hidden flex items-center justify-center p-6">
            {/* Background removed for clean white design */}

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black mb-4 shadow-lg">
                        <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-black">Bijuli Batti</h1>
                    <p className="text-gray-600">Smart Grid Management System</p>
                </div>

                {/* Login Type Selector */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                        type="button"
                        onClick={() => setLoginType('consumer')}
                        className={`p-3 rounded-xl border transition-all duration-300 ${
                            loginType === 'consumer'
                                ? 'bg-black text-white border-black'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <Smartphone className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-sm">Consumer</div>
                    </button>
                    <button
                        type="button"
                        onClick={() => setLoginType('admin')}
                        className={`p-3 rounded-xl border transition-all duration-300 ${
                            loginType === 'admin'
                                ? 'bg-black text-white border-black'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <Zap className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-sm">Admin</div>
                    </button>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-lg">
                        {/* Username */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-2">
                                <User className="w-4 h-4 inline mr-1" />
                                Username or Meter ID
                            </label>
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                placeholder={loginType === 'consumer' ? 'MTR-12345' : 'admin@bijulibatti'}
                                className="w-full p-3 bg-white border border-gray-300 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-300"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">
                                <Lock className="w-4 h-4 inline mr-1" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full p-3 bg-white border border-gray-300 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-300 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between mt-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded bg-white border-gray-300 text-black focus:ring-black"
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-sm text-black hover:text-gray-700 transition-colors"
                            >
                                Forgot?
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full p-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Signing in...
                            </div>
                        ) : (
                            `Sign in as ${loginType === 'consumer' ? 'Consumer' : 'Admin'}`
                        )}
                    </button>

                    {/* Demo Credentials */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="text-xs text-gray-500 mb-2">Demo Credentials:</div>
                        <div className="text-xs text-gray-700">
                            <div>Consumer: MTR-12345 / demo123</div>
                            <div>Admin: admin@bijulibatti / admin123</div>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <span className="text-gray-600 text-sm">Don't have an account? </span>
                        <button
                            type="button"
                            className="text-black hover:text-gray-700 transition-colors text-sm font-medium"
                        >
                            Request Access
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
