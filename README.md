# Tesla Website Clone

## Project Overview

This project is a comprehensive clone of the Tesla website, built using modern web technologies. The application features a sleek, responsive design that mimics Tesla's official website, complete with dynamic content loading, smooth animations, and a fully functional backend API.

## Tech Stack

- **Frontend**: Next.js 15.2.3 with TypeScript
- **Styling**: Tailwind CSS with custom Tesla-specific styling
- **UI Components**: Radix UI for accessible components
- **State Management**: React hooks and context
- **API**: Custom Next.js API routes with mock data
- **Animation**: CSS animations for smooth transitions

## Features

### Frontend

- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Tesla-style Header**: Navigation header with mobile menu support
- **Full-page Sections**: Vertical scrolling sections for each Tesla product
- **Dynamic Content Loading**: Content is loaded from the backend API
- **Loading States**: Skeleton loaders while content is being fetched
- **Error Handling**: Graceful error handling for API failures
- **Animations**: Smooth fade-in animations for content and buttons

### Backend

- **API Routes**: Next.js API routes for vehicles and solar products
- **Mock Data**: Realistic mock data for Tesla vehicles and products
- **Type Safety**: Full TypeScript support with well-defined interfaces
- **Service Layer**: API service with methods for data retrieval
- **React Hooks**: Custom hooks for data fetching and state management

## Project Structure

```
src/
├── ai/                  # AI-related functionality (GenKit)
├── app/                 # Next.js app directory
│   ├── (main)/          # Main application routes
│   │   ├── layout.tsx   # Main layout with Tesla header
│   │   ├── page.tsx     # Homepage with Tesla sections
│   │   ├── model-3/     # Model 3 page
│   │   ├── model-s/     # Model S page
│   │   ├── model-y/     # Model Y page
│   │   └── solar-panels/ # Solar panels page
│   ├── api/             # API routes
│   │   ├── vehicles/    # Vehicle API endpoints
│   │   └── solar/       # Solar products API endpoints
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── layout/          # Layout components
│   │   └── TeslaHeader.tsx # Tesla navigation header
│   └── ui/              # UI components
│       ├── button.tsx   # Button component
│       └── ...          # Other UI components
├── hooks/               # Custom React hooks
│   ├── use-tesla-api.ts # Hooks for Tesla API data fetching
│   └── use-toast.ts     # Toast notification hook
└── lib/                 # Utility functions and types
    ├── api-service.ts   # Tesla API service with mock data
    ├── api-types.ts     # TypeScript interfaces for API data
    └── utils.ts         # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

## API Documentation

### Vehicles API

- `GET /api/vehicles` - Get all vehicle models
- `GET /api/vehicles/[id]` - Get a specific vehicle model by ID

### Solar Products API

- `GET /api/solar` - Get all solar products

## Data Models

### Vehicle Model

```typescript
interface VehicleModel {
  id: string;            // Unique identifier
  name: string;          // Display name
  basePrice: number;     // Base price in USD
  description: string;   // Short description
  range: number;         // Range in miles
  topSpeed: number;      // Top speed in mph
  acceleration: number;  // 0-60 mph time in seconds
  imageUrl: string;      // Main image URL
  features: string[];    // List of features
  colors: VehicleColor[];
  interiors: VehicleInterior[];
  availableForPurchase: boolean;
  availableForLease: boolean;
  leaseStartingAt?: number;  // Monthly lease price
  taxCredit?: number;        // Federal tax credit amount
}
```

### Solar Product

```typescript
interface SolarProduct {
  id: string;            // Unique identifier
  name: string;          // Display name
  description: string;   // Short description
  basePrice: number;     // Base price in USD
  savingsEstimate: number; // Estimated savings per year
  imageUrl: string;      // Main image URL
  features: string[];    // List of features
}
```

## Frontend Components

### TeslaHeader

The main navigation header that appears on all pages. Features:
- Logo link to homepage
- Desktop navigation with model links
- Mobile-responsive menu with hamburger icon
- Right-side links for Shop and Account

### Home Page

The main landing page with full-screen sections for each Tesla product:
- Dynamic loading of sections from API
- Skeleton loading states
- Error handling
- Smooth animations
- Responsive design for all screen sizes

## Styling

The project uses Tailwind CSS with custom Tesla-specific styles defined in `globals.css`:

- `btn-tesla-primary`: Black button with white text (Tesla's primary style)
- `btn-tesla-secondary`: Light gray button with dark text (Tesla's secondary style)
- Custom section spacing and responsive adjustments
- Animation keyframes for smooth transitions

## Future Enhancements

- Vehicle customization pages
- Order processing functionality
- Test drive scheduling
- Integration with payment processing
- More detailed product pages
- Inventory browsing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is for educational purposes only and is not affiliated with Tesla, Inc.
