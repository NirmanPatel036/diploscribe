# Diploscribe - AI-Powered Text Transformation Platform

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.86.0-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.26-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=for-the-badge&logo=next.js&logoColor=white)

**Effortlessly elevate your message.** Transform your communication with AI-powered text transformations. Whether your audience is clients or colleagues, Diploscribe helps you deliver clear, professional, and engaging messages.

## 🚀 Features

### Core Capabilities
- **AI-Powered Transformation**: Advanced language models analyze context and tone to transform rough drafts into polished, professional communication
- **Multiple Tone Presets**: Professional, Casual, and Technical writing styles to match any context
- **Flexible Length Options**: Choose from under 50, 100, 200, or 500 words to fit your needs
- **Real-time Processing**: Lightning-fast text transformation with instant results
- **File Upload Support**: Upload and transform content from `.txt`, `.pdf`, `.doc`, and `.docx` files
- **Gmail Integration**: Draft and send transformed text directly to Gmail with one click

### User Experience
- **Interactive iMessage Demo**: Live auto-scrolling conversation showcasing real-world use cases
- **Beautiful Animations**: Smooth transitions powered by Framer Motion and GSAP
- **Dark Mode Support**: Seamless theme switching with next-themes
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Usage Dashboard**: Track your transformations, view statistics, and monitor usage

### Security & Authentication
- **Supabase Authentication**: Secure email/password and Google OAuth sign-in
- **Protected Routes**: Middleware-based authentication for secure access
- **Session Management**: Persistent authentication with SSR support
- **Enterprise Security**: End-to-end encryption for all communications

### Subscription & Pricing
- **Starter Plan**: Free tier with 100 transformations per month
- **Professional Plan**: $9/month with 14-day trial, 1,000 transformations
- **Lifetime Plan**: $49 one-time payment, unlimited transformations
- **Polar Integration**: Secure payment processing via Polar.sh

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.3 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.1.9
- **Components**: Radix UI primitives
- **Animations**: Framer Motion 12.23.26, GSAP 3.13.0
- **Icons**: Lucide React 0.454.0
- **Forms**: React Hook Form 7.60.0 + Zod 3.25.76

### Backend & APIs
- **Database & Auth**: Supabase 2.86.0
- **AI Model**: Google Generative AI 0.24.1
- **Payment Processing**: Polar.sh SDK 0.41.5
- **File Parsing**: mammoth 1.11.0 (DOCX), pdf-parse 2.4.5 (PDF)

### Developer Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **PostCSS**: Tailwind CSS 4.x with autoprefixer

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account
- Google AI API key
- Polar.sh account (for payments)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/diploscribe.git
   cd diploscribe
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Google AI
   GOOGLE_AI_API_KEY=your_google_ai_api_key

   # Polar.sh
   POLAR_ACCESS_TOKEN=your_polar_access_token
   NEXT_PUBLIC_POLAR_ORGANIZATION_ID=your_org_id
   NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID=your_starter_product_id
   NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID=your_pro_product_id
   NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID=your_lifetime_product_id
   ```

4. **Set up Supabase database**
   
   Run the SQL scripts in `sql-scripts/` to create the necessary tables:
   - `subscriptions` - User subscription data
   - `transformation_history` - Usage tracking

5. **Start the development server**
   ```bash
   pnpm dev
   ```
   
   The app will be available at `http://localhost:3000`

## 🔧 Configuration

### Polar.sh Setup
Follow the comprehensive guides:
- `POLAR_PRICING_CARDS.md` - Product setup in Polar Dashboard
- `POLAR_CHECKOUT_SETUP.md` - Checkout link configuration and webhooks

### Supabase Setup
Refer to `SUPABASE_SETUP.md` for detailed instructions on:
- Database schema creation
- RLS (Row Level Security) policies
- Authentication providers
- Storage buckets

## 📂 Project Structure

```
diploscribe/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── transform/            # AI text transformation endpoint
│   │   ├── upload/               # File upload handler
│   │   └── polar/                # Polar.sh webhooks & checkout
│   ├── auth/                     # Authentication pages
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── callback/
│   │   └── forgot-password/
│   ├── dashboard/                # User dashboard
│   ├── home/                     # Authenticated home page
│   ├── pricing/                  # Pricing page
│   ├── transform/                # Text transformation interface
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # Shadcn UI components
│   ├── header.tsx                # Main navigation
│   ├── footer.tsx                # Footer with links & legal
│   ├── hero-animation.tsx        # Animated grid background
│   ├── imessage-demo.tsx         # Auto-scrolling chat demo
│   ├── features-section.tsx      # Features showcase
│   ├── testimonials-section.tsx  # Customer testimonials
│   ├── pricing-section.tsx       # Pricing cards
│   ├── transform-*.tsx           # Transform UI components
│   └── stats-cards.tsx           # Dashboard statistics
├── lib/                          # Utility libraries
│   ├── supabase/                 # Supabase client setup
│   └── utils.ts                  # Helper functions
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
├── public/                       # Static assets
│   └── fonts/                    # Custom fonts
├── sql-scripts/                  # Database migration scripts
├── middleware.ts                 # Next.js middleware
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🚦 Usage

### Text Transformation

1. **Navigate to `/transform`** after signing in
2. **Enter or upload text** to transform
3. **Select tone**: Professional, Casual, or Technical
4. **Choose length**: Under 50, 100, 200, or 500 words
5. **Click "Transform"** to generate AI-enhanced text
6. **Copy or send to Gmail** directly

### Dashboard

Access your usage dashboard at `/dashboard` to:
- View total transformations and characters processed
- Track week-over-week usage trends
- See transformation history with previews
- Monitor subscription status and limits

### Pricing

Visit `/pricing` to:
- Compare plan features
- Start 14-day free trial (Professional)
- Purchase lifetime access
- Manage existing subscription

## 🎨 Key Components

### Landing Page
- **Hero Animation**: Animated grid with flowing borders
- **iMessage Demo**: Auto-scrolling conversation showing real use cases
- **Features Section**: Interactive cards with animations
- **Testimonials**: Auto-rotating customer stories
- **Pricing Section**: Authentication-aware checkout flow

### Transform Page
- **Transform Input**: Textarea with sample text button
- **Transform Controls**: Tone/length selectors, file upload
- **Transform Output**: Typewriter effect display
- **Chrome Extension Modal**: Coming soon notification

### Dashboard
- **Stats Cards**: Transformations, characters, averages
- **Usage Chart**: Weekly usage visualization (Recharts)
- **Transform History**: Recent transformations with previews
- **Subscription Card**: Plan details and usage limits

## 🔐 Authentication Flow

1. User signs up/signs in via Supabase Auth
2. Session stored in httpOnly cookie (SSR-safe)
3. Middleware checks auth for protected routes
4. Redirect to intended destination after login
5. OAuth (Google) supported with callback handling

## 💳 Payment Flow (Polar.sh)

1. User selects plan on pricing page
2. Client creates checkout session via API
3. Redirect to Polar checkout page
4. User completes payment
5. Webhook receives event from Polar
6. Subscription created/updated in Supabase
7. User redirected to success page

## 🧪 API Endpoints

### POST `/api/transform`
Transform text using Google AI

**Request Body:**
```json
{
  "text": "Your input text",
  "tone": "professional",
  "length": "100"
}
```

**Response:**
```json
{
  "transformed": "Your transformed text",
  "timestamp": "2025-12-21T..."
}
```

### POST `/api/upload`
Upload and extract text from files

**Supported formats:** `.txt`, `.pdf`, `.doc`, `.docx`

**Response:**
```json
{
  "extractedText": "Parsed file content",
  "filename": "document.pdf"
}
```

### POST `/api/polar/checkout`
Create Polar checkout session

### POST `/api/polar/webhook`
Handle Polar.sh webhooks for subscription events

## 🎯 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ |
| `GOOGLE_AI_API_KEY` | Google Generative AI API key | ✅ |
| `POLAR_ACCESS_TOKEN` | Polar.sh API access token | ✅ |
| `NEXT_PUBLIC_POLAR_ORGANIZATION_ID` | Polar organization ID | ✅ |
| `NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID` | Starter plan product ID | ✅ |
| `NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID` | Professional plan product ID | ✅ |
| `NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID` | Lifetime plan product ID | ✅ |

## 📈 Performance Optimizations

- **Optimized Images**: Next.js Image component for automatic optimization
- **Code Splitting**: Automatic route-based code splitting
- **Dynamic Imports**: Lazy loading for heavy components
- **Font Optimization**: next-themes for zero-flash dark mode
- **API Route Caching**: Smart caching strategies

## 🛡️ Security Features

- **CSRF Protection**: Built-in Next.js CSRF protection
- **Rate Limiting**: API route rate limiting (429 responses)
- **Input Validation**: Zod schemas for all inputs
- **XSS Prevention**: React automatic escaping
- **Secure Headers**: Next.js security headers
- **Environment Secrets**: Server-side only API keys

## 🧰 Development

### Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Code Style
- ESLint configuration for TypeScript + React
- Prettier for consistent formatting
- Tailwind CSS for styling consistency

## 📝 License

This project is licensed under the **MIT License**.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For support, email: nirman0511@gmail.com

## 🙏 Acknowledgments

- **Google AI**: For powerful language models
- **Supabase**: For seamless backend infrastructure
- **Polar.sh**: For developer-first payment processing
- **Vercel**: For hosting and deployment
- **Radix UI**: For accessible component primitives
- **Shadcn UI**: For beautiful component designs

## 🔮 Roadmap

- [ ] Chrome Extension for browser-based transformation
- [ ] Mobile app (iOS/Android)
- [ ] Team collaboration features
- [ ] Custom tone creation
- [ ] API access for developers
- [ ] Bulk transformation processing
- [ ] Integration with Slack, Discord, etc.
- [ ] Multi-language support

---

Made with ❤️ by Nirman Patel

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourprofile)
