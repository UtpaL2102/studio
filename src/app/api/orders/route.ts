import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { CreateOrderData } from '@/lib/models/order';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(request);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orderData: CreateOrderData = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const orders = db.collection('orders');

    const order = {
      ...orderData,
      userId: session.user._id,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await orders.insertOne(order);

    return NextResponse.json(
      { message: 'Order created successfully', orderId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(request);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const orders = db.collection('orders');

    const userOrders = await orders
      .find({ userId: session.user._id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ orders: userOrders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 