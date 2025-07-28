// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
// We will use next-auth for handling the login logic
import { signIn } from 'next-auth/react'; 
import { useRouter } from 'next/navigation';
import ArrowLeftIcon from '@heroicons/react/20/solid/ArrowLeftIcon';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push('/dashboard'); // Redirect to a protected page on success
    }
  };

  return (
       
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Log in to Your Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg border p-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-lg border p-3"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-400"
          >
            Log In
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
       <p className="mt-6 text-center text-sm text-gray-600">
  Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}