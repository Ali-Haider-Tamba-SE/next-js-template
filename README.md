# Next.js Transaction Management Template

A modern, full-stack transaction management application built with Next.js 15, TypeScript, and Tailwind CSS. This template provides a solid foundation for building financial tracking applications with a clean, responsive interface and robust state management.

## 🚀 Features

- **Transaction Management**: Create, read, update, and delete financial transactions
- **Transaction Types**: Support for both income and expense transactions
- **Recurring Transactions**: Set up daily, weekly, monthly, or yearly recurring transactions
- **Category Organization**: Organize transactions by custom categories
- **Account Management**: Track transactions across different accounts
- **Real-time Updates**: Optimistic updates with React Query for smooth UX
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Theme**: Modern dark UI with gradient backgrounds
- **Type Safety**: Full TypeScript support throughout the application

## 🛠️ Technologies Used

### Core Framework

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX

### Styling & UI

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Utility for merging Tailwind classes

### State Management & Data Fetching

- **[React Query](https://tanstack.com/query/v3/)** - Server state management and caching
- **[React Context](https://reactjs.org/docs/context.html)** - Client-side state management
- **[React Hook Form](https://react-hook-form.com/)** - Form state management and validation

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Turbopack](https://turbo.build/pack)** - Fast bundler (development mode)

## 📁 Project Structure

```
next-js-template/
├── public/                     # Static assets
│   ├── next.svg               # Next.js logo
│   ├── vercel.svg            # Vercel logo
│   └── *.svg                 # Other icons
├── src/                       # Source code
│   ├── app/                  # Next.js App Router
│   │   ├── transaction/      # Transaction feature pages
│   │   │   ├── components/   # Transaction-specific components
│   │   │   └── page.tsx     # Transaction list page
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── globals.css      # Global styles
│   │   └── favicon.ico      # App icon
│   ├── context/             # React Context providers
│   │   ├── providers.tsx    # App-level providers wrapper
│   │   └── transaction/     # Transaction context
│   ├── hook/                # Custom React hooks
│   │   └── transaction/     # Transaction-related hooks
│   ├── service/             # API services and data fetching
│   │   └── transaction/     # Transaction API services
│   ├── lib/                 # Utility libraries and configurations
│   │   └── query-client.ts  # React Query configuration
│   └── types/               # TypeScript type definitions
│       └── transaction.ts   # Transaction-related types
├── eslint.config.mjs        # ESLint configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

### Folder Structure Explained

- **`/src/app/`** - Next.js 13+ App Router with file-based routing
- **`/src/context/`** - React Context providers for state management
- **`/src/hook/`** - Custom React hooks for reusable logic
- **`/src/service/`** - API services and data fetching logic
- **`/src/lib/`** - Utility functions and configurations
- **`/src/types/`** - TypeScript interfaces and type definitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd next-js-template
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Architecture

### State Management

The application uses a hybrid approach to state management:

- **React Query** for server state, caching, and data synchronization
- **React Context** for client-side UI state and transaction operations
- **React Hook Form** for form state management

### Component Organization

- Feature-based organization under `/src/app/[feature]/`
- Shared components and utilities in respective directories
- Custom hooks for business logic abstraction
- Service layer for API interactions

### Type Safety

- Full TypeScript coverage
- Strict type checking enabled
- Custom interfaces for business entities
- Enum definitions for consistent value types

## 🎨 UI/UX Features

- **Dark Theme**: Modern dark interface with carefully chosen colors
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton screens and loading indicators
- **Empty States**: Helpful empty state components with call-to-actions
- **Icon System**: Consistent iconography with Lucide React

## 🔧 Customization

### Adding New Features

1. Create feature directory under `/src/app/[feature]/`
2. Add corresponding types in `/src/types/`
3. Create custom hooks in `/src/hook/[feature]/`
4. Add API services in `/src/service/[feature]/`
5. Update context providers if needed

### Styling

- Customize colors in `tailwind.config.js`
- Global styles in `src/app/globals.css`
- Component-specific styles using Tailwind utilities

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and modern web technologies.
