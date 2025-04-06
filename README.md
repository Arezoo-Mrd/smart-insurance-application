# Smart Insurance Application

A modern insurance application built with React, Vite, and TypeScript that demonstrates best practices in form handling, internationalization, and data fetching.

## Features

- ⚡ **Blazing Fast** - Built with Vite for optimal performance
- 🌐 **Multi-language Support** - Using react-i18next
- 📝 **Advanced Form Handling** - Powered by react-hook-form
- 🔄 **Efficient Data Fetching** - Using Axios and TanStack Query
- 🎨 **Modern UI** - Built with shadcn/ui components
- 📱 **Responsive Design** - Works on all device sizes

## Technologies Used

### Core Stack

- [React](https://react.dev/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

### Key Libraries

- [react-hook-form](https://react-hook-form.com/) - Form handling
- [react-i18next](https://react.i18next.com/) - Internationalization
- [@tanstack/react-query](https://tanstack.com/query/latest) - Data fetching
- [Axios](https://axios-http.com/) - HTTP client

## Key Libraries Explained

### 1. @tanstack/react-query (TanStack Query)

**Description**: TanStack Query (formerly React Query) is a powerful data synchronization library for React applications. It handles caching, background updates, and stale data out of the box.

**Key Features**:

- Automatic caching and background updates
- Deduping multiple requests for the same data
- Pagination and infinite scroll support
- Optimistic updates
- Window focus refetching

**Example Usage**:

```typescript
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPolicies = async () => {
 const { data } = await axios.get("/api/policies");
 return data;
};

function PolicyList() {
 const { data, isLoading, error } = useQuery({
  queryKey: ["policies"],
  queryFn: fetchPolicies,
  staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
 });

 if (isLoading) return <div>Loading...</div>;
 if (error) return <div>Error loading policies</div>;

 return (
  <ul>
   {data.map((policy) => (
    <li key={policy.id}>{policy.name}</li>
   ))}
  </ul>
 );
}
```

### 2. react-hook-form

**Description**A performant, flexible and extensible forms library with easy-to-use validation.

**Key Features**:

- Minimal re-renders
- Built-in form validation
- Support for complex forms with nested fields
- Integration with UI libraries
- Small bundle size

**Example Usage**:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import \* as z from 'zod';

const formSchema = z.object({
name: z.string().min(2),
age: z.number().min(18),
policyType: z.enum(['health', 'auto', 'home']),
});

type FormValues = z.infer<typeof formSchema>;

function PolicyForm() {
const {
register,
handleSubmit,
formState: { errors },
} = useForm<FormValues>({
resolver: zodResolver(formSchema),
});

const onSubmit = (data: FormValues) => {
console.log(data);
// Submit to API
};

return (

<form onSubmit={handleSubmit(onSubmit)}>
<input {...register('name')} />
{errors.name && <p>{errors.name.message}</p>}

      <input type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age && <p>{errors.age.message}</p>}

      <select {...register('policyType')}>
        <option value="health">Health</option>
        <option value="auto">Auto</option>
        <option value="home">Home</option>
      </select>

      <button type="submit">Submit</button>
    </form>

);
}
```

### 3. react-i18next

**Description**Powerful internationalization framework for React that enables multi-language support.

**Key Features**:

- Simple component-based usage
- Pluralization support
- Context-based translations
- Loading translations from backend
- Formatting functions

**Example Usage**:

```typescript
// i18n.ts configuration
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
 resources: {
  en: {
   translation: {
    welcome: "Welcome to Smart Insurance",
    form: {
     name: "Full Name",
     age: "Age",
     submit: "Submit Application",
    },
   },
  },
  fa: {
   translation: {
    welcome: "به برنامه هوشمند بیمه خوش آمدید",
    form: {
     name: "نام کامل",
     age: "سن",
     submit: "ثبت درخواست",
    },
   },
  },
 },
 lng: "en", // default language
 fallbackLng: "en",
});

// Component usage
import { useTranslation } from "react-i18next";

function WelcomeBanner() {
 const { t, i18n } = useTranslation();

 const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
 };

 return (
  <div>
   <h1>{t("welcome")}</h1>
   <button onClick={() => changeLanguage("en")}>English</button>
   <button onClick={() => changeLanguage("fa")}>فارسی</button>
  </div>
 );
}
```

## Project Structure

smart-insurance-app/
├── src/
│ ├── assets/ # Static assets
│ ├── components/ # Reusable components
| ├── locales/ # i18n translation files
│ ├── pages/ # Page components
| | ├── index.tsx/ # Page component
| | ├──api/
| | | ├──api.types.ts # TypeScript Api types
| | | ├──index.ts # Handles APIs
│ ├── assets/ # Static assets
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main App component
│ └── main.tsx # Application entry point
├── .env # Environment variables
├── vite.config.ts # Vite configuration
└── package.json # Project dependencies

## Getting Started

### 1.Clone the repository

```bash
git clone https://github.com/your-username/smart-insurance-app.git
cd smart-insurance-app
```

### 2.Install dependencies

```bash
npm install
```

### 3.Run the development server

```bash
npm run dev
```

### 4.Build for production

```bash
npm run build
```
