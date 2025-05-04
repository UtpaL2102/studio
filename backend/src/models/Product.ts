import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  basePrice: number;
  category: string;
  images: string[];
  specifications: {
    [key: string]: string | number;
  };
  availableOptions: {
    [key: string]: {
      name: string;
      price: number;
      description?: string;
    }[];
  };
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Powerwall', 'Solar Roof']
  },
  images: [{
    type: String,
    required: true
  }],
  specifications: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  availableOptions: {
    type: Map,
    of: [{
      name: String,
      price: Number,
      description: String
    }]
  }
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', productSchema); 