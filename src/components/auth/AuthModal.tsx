"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login, signup, error } = useAuth();
  const [step, setStep] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (!open) {
      setStep('signin');
      setEmail("");
      setPassword("");
      setName("");
    }
  }, [open]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      // error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(name, email, password);
      onClose();
    } catch (err) {
      // error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-8">
        <DialogTitle className="text-2xl font-semibold mb-4 text-center">
          {step === 'signin' ? 'Sign In' : 'Create Account'}
        </DialogTitle>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold mb-6">TESLA</span>
          {step === 'signin' ? (
            <>
              <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
              <form className="w-full" onSubmit={handleSignIn}>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full mb-4 px-3 py-2 border rounded"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <label className="block text-sm mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full mb-4 px-3 py-2 border rounded"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <div className="flex items-center mb-4">
                  <input
                    id="show-password"
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <label htmlFor="show-password" className="text-xs">Show Password</label>
                </div>
                {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold mb-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Next"}
                </button>
              </form>
              <button
                className="w-full bg-gray-100 text-gray-900 py-2 rounded font-semibold mt-2"
                onClick={() => setStep('signup')}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-2">Create Account</h2>
              <form className="w-full" onSubmit={handleSignUp}>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full mb-4 px-3 py-2 border rounded"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full mb-4 px-3 py-2 border rounded"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <label className="block text-sm mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full mb-4 px-3 py-2 border rounded"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <div className="flex items-center mb-4">
                  <input
                    id="show-password-signup"
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <label htmlFor="show-password-signup" className="text-xs">Show Password</label>
                </div>
                {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold mb-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
              </form>
              <button
                className="w-full bg-gray-100 text-gray-900 py-2 rounded font-semibold mt-2"
                onClick={() => setStep('signin')}
              >
                Already have an account? Sign In
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 