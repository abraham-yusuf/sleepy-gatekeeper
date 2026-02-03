# Component Documentation

This document provides comprehensive documentation for all React components and pages in the xCreator402 application.

## Table of Contents

1. [Page Components](#page-components)
   - [Home Page](#home-page)
   - [Articles Pages](#articles-pages)
   - [Podcasts Pages](#podcasts-pages)
   - [Videos Pages](#videos-pages)
   - [Creator Dashboard](#creator-dashboard)
2. [Layout Components](#layout-components)
3. [Component Architecture](#component-architecture)

---

## Page Components

### Home Page

**File:** `app/page.tsx`

**Route:** `/`

**Description:** The main landing page of the application, showcasing trending content and providing navigation to various content categories.

**Features:**
- Responsive header with navigation
- Mobile menu support
- Hero section with search functionality
- Content filter buttons
- Trending content cards (articles, podcasts, videos)
- Call-to-action buttons

**Props:** None (default export)

**State Management:**
```typescript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

**Key Sections:**

#### Header
- Logo and branding
- Search bar (desktop)
- Navigation links (Browse, Creators, My Library, Articles, Podcasts, Videos)
- Wallet connect button
- Mobile menu toggle

#### Mobile Menu
- Slide-down navigation overlay
- Direct links to Articles, Podcasts, Videos
- Responsive design for mobile devices

#### Hero Section
- Main headline with gradient text
- Live protocol badge with animation
- Enhanced search input with category filter
- Popular tags/hashtags
- CTA buttons (Start Exploring, Learn More)
- Featured creator card

#### Filter Buttons
- Sticky category filters (All, Articles, Podcasts, Videos, NFT Access)
- Hover effects and transitions

#### Trending Content Grid
- 3-column responsive grid (1 column on mobile)
- Content cards for articles, podcasts, and videos
- Price display
- Author/creator information
- Duration/read time indicators
- Unlock buttons linking to content pages

**Usage Example:**
```typescript
// This is the default export and is automatically used by Next.js
export default function Home() {
  // Component implementation
}
```

**Styling:**
- Uses Tailwind CSS utility classes
- Custom dark theme (`bg-[#131022]`)
- Material Symbols icons
- Gradient effects for emphasis
- Hover animations and transitions

**Navigation Links:**
```typescript
<Link href="/articles">Articles</Link>
<Link href="/podcasts">Podcasts</Link>
<Link href="/videos">Videos</Link>
```

---

### Articles Pages

#### Articles Landing Page

**File:** `app/articles/page.tsx`

**Route:** `/articles`

**Description:** Landing page displaying all available premium articles with pricing and descriptions.

**Features:**
- List of premium articles
- Article cards with:
  - Title and excerpt
  - Author information
  - Price display
  - Read time estimate
  - Link to full article
- Filter/search functionality (if implemented)
- Responsive grid layout

**Example Structure:**
```typescript
export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#131022]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Premium Articles</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Article cards */}
        </div>
      </div>
    </div>
  );
}
```

---

#### Web3 Future Article

**File:** `app/articles/web3-future/page.tsx`

**Route:** `/articles/web3-future`

**Payment Required:**
- **EVM/Base Network:** $0.01 USDC
- **Solana Network:** $0.01 USDC

**Description:** Premium article about the future of Web3 payments.

**Content:**
- In-depth analysis of Web3 payment systems
- Future trends and predictions
- Technical implementation details
- Use cases and examples

---

#### Creator Economy Article

**File:** `app/articles/creator-economy/page.tsx`

**Route:** `/articles/creator-economy`

**Payment Required:**
- **EVM/Base Network:** $0.02 USDC
- **Solana Network:** $0.02 USDC

**Description:** Premium article about building in the creator economy.

**Content:**
- Creator economy fundamentals
- Blockchain technology for creators
- Monetization strategies
- Platform comparisons

---

#### Decentralized Content Article

**File:** `app/articles/decentralized-content/page.tsx`

**Route:** `/articles/decentralized-content`

**Payment Required:**
- **EVM/Base Network:** $0.015 USDC
- **Solana Network:** $0.015 USDC

**Description:** Premium article about decentralized content distribution.

**Content:**
- Decentralization principles
- Content distribution platforms
- Benefits and challenges
- Future outlook

---

### Podcasts Pages

#### Podcasts Landing Page

**File:** `app/podcasts/page.tsx`

**Route:** `/podcasts`

**Description:** Landing page displaying all available premium podcast episodes.

**Features:**
- Grid of podcast episode cards
- Episode information:
  - Title and description
  - Duration
  - Host/creator
  - Price
  - Preview image/thumbnail
- Play button indicators
- Responsive layout

**Example Structure:**
```typescript
export default function PodcastsPage() {
  return (
    <div className="min-h-screen bg-[#131022]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Premium Podcasts</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Podcast episode cards */}
        </div>
      </div>
    </div>
  );
}
```

---

#### Web3 Insights Podcast

**File:** `app/podcasts/web3-insights/page.tsx`

**Route:** `/podcasts/web3-insights`

**Payment Required:**
- **EVM/Base Network:** $0.02 USDC
- **Solana Network:** $0.02 USDC

**Description:** Premium podcast episode about Web3 insights.

**Content:**
- Audio player integration
- Episode description and show notes
- Host information
- Duration: ~45 minutes
- Topics: Web3 technologies, trends, and insights

---

### Videos Pages

#### Videos Landing Page

**File:** `app/videos/page.tsx`

**Route:** `/videos`

**Description:** Landing page displaying all available premium video content.

**Features:**
- Video grid layout
- Video cards with:
  - Thumbnail image
  - Title and description
  - Duration
  - Price
  - View count
  - Creator information
- Play button overlays
- Hover effects

**Example Structure:**
```typescript
export default function VideosPage() {
  return (
    <div className="min-h-screen bg-[#131022]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Premium Videos</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Video cards */}
        </div>
      </div>
    </div>
  );
}
```

---

#### Blockchain Basics Video

**File:** `app/videos/blockchain-basics/page.tsx`

**Route:** `/videos/blockchain-basics`

**Payment Required:**
- **EVM/Base Network:** $0.05 USDC
- **Solana Network:** $0.05 USDC

**Description:** Premium video tutorial about blockchain fundamentals.

**Content:**
- Video player integration
- Comprehensive blockchain tutorial
- Duration: ~15 minutes
- Topics: Blockchain basics, smart contracts, consensus mechanisms

---

### Creator Dashboard

The creator dashboard provides content management functionality for creators.

#### Creator Dashboard Home

**File:** `app/creator/page.tsx`

**Route:** `/creator`

**Description:** Main creator dashboard showing overview and quick actions.

**Features:**
- Dashboard overview
- Quick links to content creation
- Analytics/stats (if implemented)
- Navigation to articles, podcasts, and videos management

**Example Structure:**
```typescript
export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-[#131022]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Creator Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <DashboardCard title="Articles" link="/creator/articles" />
          <DashboardCard title="Podcasts" link="/creator/podcasts" />
          <DashboardCard title="Videos" link="/creator/videos" />
        </div>
      </div>
    </div>
  );
}
```

---

#### Articles Management

**File:** `app/creator/articles/page.tsx`

**Route:** `/creator/articles`

**Description:** Manage published articles.

**Features:**
- List of creator's articles
- Edit/delete functionality
- Link to create new article

---

**File:** `app/creator/articles/new/page.tsx`

**Route:** `/creator/articles/new`

**Description:** Create a new article.

**Features:**
- Article creation form
- Title, content, excerpt inputs
- Price configuration
- Network selection
- Publish button

---

#### Podcasts Management

**File:** `app/creator/podcasts/page.tsx`

**Route:** `/creator/podcasts`

**Description:** Manage published podcast episodes.

**Features:**
- List of creator's podcasts
- Episode management
- Link to upload new episode

---

**File:** `app/creator/podcasts/new/page.tsx`

**Route:** `/creator/podcasts/new`

**Description:** Upload a new podcast episode.

**Features:**
- Episode upload form
- Title, description inputs
- Audio file upload
- Price configuration
- Publish button

---

#### Videos Management

**File:** `app/creator/videos/page.tsx`

**Route:** `/creator/videos`

**Description:** Manage published videos.

**Features:**
- List of creator's videos
- Video management
- Link to upload new video

---

**File:** `app/creator/videos/new/page.tsx`

**Route:** `/creator/videos/new`

**Description:** Upload a new video.

**Features:**
- Video upload form
- Title, description inputs
- Video file upload
- Thumbnail upload
- Price configuration
- Publish button

---

## Layout Components

### Root Layout

**File:** `app/layout.tsx`

**Description:** The root layout component that wraps all pages in the application.

**Features:**
- HTML document structure
- Global styles and fonts
- Metadata configuration
- Children component rendering

**Metadata:**
```typescript
export const metadata: Metadata = {
  title: "xCreator402",
  description: "Decentralized content monetization platform",
  // Additional metadata
};
```

**Implementation:**
```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Material Symbols icons */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={/* font classes */}>
        {children}
      </body>
    </html>
  );
}
```

**Global Styles:**
- Font configuration
- Material Symbols icons
- Tailwind CSS base styles
- Custom CSS variables

---

## Component Architecture

### Design Patterns

#### 1. Client Components
Most pages use the `"use client"` directive for client-side interactivity:

```typescript
"use client";

import { useState } from "react";

export default function Component() {
  const [state, setState] = useState(initialValue);
  // Component logic
}
```

#### 2. Server Components
API routes and some pages use server-side rendering:

```typescript
// No "use client" directive
export default function ServerComponent() {
  // Server-side logic
}
```

---

### Common Patterns

#### Card Component Pattern
Many pages use a card-based layout for content display:

```typescript
<div className="flex flex-col rounded-xl overflow-hidden bg-[#1e1933] border border-white/5 hover:border-[#3713ec]/50 transition-all group">
  {/* Thumbnail/Image */}
  <div className="w-full aspect-video bg-cover" style={{backgroundImage: 'url(...)'}}>
    {/* Overlays and badges */}
  </div>
  
  {/* Content */}
  <div className="flex flex-col flex-1 p-5 gap-3">
    <h3 className="text-white text-lg font-bold">{title}</h3>
    <p className="text-gray-300">{description}</p>
    
    {/* Metadata */}
    <div className="flex items-center justify-between">
      <span className="text-sm">{author}</span>
      <span className="text-sm">{duration}</span>
    </div>
    
    {/* Action button */}
    <button className="w-full mt-2 bg-[#3713ec] hover:bg-[#3713ec]/90 text-white">
      Unlock Content
    </button>
  </div>
</div>
```

---

#### Responsive Navigation Pattern
```typescript
{/* Desktop Navigation */}
<div className="hidden lg:flex items-center gap-6">
  <Link href="/articles">Articles</Link>
  <Link href="/podcasts">Podcasts</Link>
  <Link href="/videos">Videos</Link>
</div>

{/* Mobile Menu Toggle */}
<button 
  className="lg:hidden"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
  <span className="material-symbols-outlined">menu</span>
</button>

{/* Mobile Menu Overlay */}
{isMobileMenuOpen && (
  <div className="lg:hidden fixed inset-0 z-40">
    {/* Mobile navigation items */}
  </div>
)}
```

---

### Styling Conventions

#### Color Palette
- Primary Background: `#131022`
- Card Background: `#1e1933`, `#292348`
- Primary Accent: `#3713ec` (blue/purple)
- Text Colors: `white`, `#9b92c9` (muted), `#3713ec` (accent)

#### Common Classes
- Container: `container mx-auto px-4`
- Heading: `text-4xl font-bold text-white`
- Button: `bg-[#3713ec] hover:bg-[#3713ec]/90 text-white rounded-lg px-4 py-2`
- Card: `rounded-xl bg-[#1e1933] border border-white/5`

#### Responsive Breakpoints
- Mobile: default
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)

---

### State Management

Currently, the application uses React's built-in state management:

```typescript
// Local component state
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Server state from API
const [articles, setArticles] = useState([]);

useEffect(() => {
  fetch('/api/articles')
    .then(res => res.json())
    .then(data => setArticles(data.articles));
}, []);
```

For more complex state management, consider:
- React Context for global state
- SWR or React Query for server state
- Zustand or Redux for complex client state

---

## Best Practices

### 1. Payment-Protected Pages
When creating payment-protected pages:

```typescript
// 1. Add route configuration in proxy.ts
export const routeConfigurations = {
  "/your-route": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.01",
        network: "eip155:84532",
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.01",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
        payTo: svmAddress,
      }
    ],
    description: "Your content description",
    mimeType: "text/html",
  },
};

// 2. Add matcher pattern
export const config = {
  matcher: ["/your-route/:path*", /* ... */]
};

// 3. Create page component
// app/your-route/page.tsx
export default function YourPage() {
  return <div>Protected content</div>;
}
```

### 2. Responsive Design
Always design mobile-first:

```typescript
<div className="
  flex flex-col     // Mobile: column layout
  md:flex-row       // Tablet+: row layout
  gap-4             // Mobile gap
  md:gap-8          // Larger gap on tablet+
">
  {/* Content */}
</div>
```

### 3. Accessibility
- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation works
- Provide alt text for images

```typescript
<button 
  aria-label="Toggle menu"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
  <span className="material-symbols-outlined">menu</span>
</button>
```

---

## Support

For additional help:
- Review [API_REFERENCE.md](./API_REFERENCE.md) for API documentation
- Check [CORE_FUNCTIONS.md](./CORE_FUNCTIONS.md) for utility functions
- Visit [X402 Protocol Documentation](https://www.x402.org)
