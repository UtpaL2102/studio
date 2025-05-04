import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';

export default function Signup() {
  return (
    <div>
      <SignupForm />
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 