# Coquito Frontend

Modern frontend application for Librería Coquito management system, built with React, TypeScript, and Vite.

## Tech Stack

- **React** - UI library
- **TypeScript** - Static typing
- **Vite** - Build tool and dev server
- **Fetch API** - HTTP client
- **CSS** - Styling (flexible for Bootstrap/Tailwind)

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Project Structure

```text
src/
├── api/            # Backend API calls
├── components/     # Reusable components
├── pages/          # Application views/screens
├── types/          # TypeScript interfaces and DTOs
├── hooks/          # Custom hooks
├── utils/          # Helper functions
├── styles/         # Global styles
├── App.tsx         # Main component
└── main.tsx        # Entry point
```

## Backend Configuration

### API Base URL

By default, the frontend connects to:

```
http://localhost:8080/api
```

### HTTP Utility

The project includes a typed fetch utility in `src/api/http.ts`:

```ts
const API_BASE_URL = "http://localhost:8080/api";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API error");
  }

  return response.json();
}
```

## Implemented Modules

### Categories (First module)

Complete module for category management:

- List categories
- Create new category
- Delete category

**Related files:**

- `src/types/category.ts` - Category interface
- `src/api/categoryApi.ts` - API functions
- `src/pages/CategoriesPage.tsx` - Main view

**Usage example:**

```tsx
import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import { Category } from "../types/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Roadmap

### Upcoming Features

1. **Products** - Complete inventory management
2. **Sales** - Sales and invoicing system
3. **Routing** - Navigation with React Router
4. **Styles** - Unified design system
5. **Error Handling** - UI for errors and validations

## What NOT to do yet

To keep the project simple and scalable, **avoid** implementing prematurely:

- Redux or complex state managers
- Authentication/authorization
- Guards and middlewares
- Premature optimizations
- Micro-frontend architectures

**Principle:** Make it work first, optimize later.

## Commit Convention

```text
feat: add products page
fix: correct error in category listing
chore: update dependencies
refactor: reorganize folder structure
docs: update README
```

## Contributing

1. Create branch from `main`
2. Implement changes
3. Commit with descriptive message
4. Push and create Pull Request

## License

This project is for internal use by Librería Coquito.
