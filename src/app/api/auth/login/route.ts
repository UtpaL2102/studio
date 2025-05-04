import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { LoginCredentials } from '@/lib/models/user';
import { login } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password }: LoginCredentials = await request.json();

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    // Find user
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    // Login user
    await login(userWithoutPassword);

    return NextResponse.json({
      message: 'Logged in successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 