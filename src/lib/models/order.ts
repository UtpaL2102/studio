import { ObjectId } from 'mongodb';

export interface Order {
  _id?: ObjectId;
  userId: ObjectId;
  productType: 'model-3' | 'model-s' | 'model-y' | 'cybertruck' | 'solar-panels';
  customization: {
    color?: string;
    wheels?: string;
    interior?: string;
    autopilot?: boolean;
    [key: string]: any;
  };
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderData {
  productType: Order['productType'];
  customization: Order['customization'];
  totalPrice: number;
} 