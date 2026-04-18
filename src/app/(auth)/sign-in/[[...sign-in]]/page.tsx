import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn 
      afterSignInUrl="/"
      appearance={{
        elements: {
          formButtonPrimary: 'bg-orange-500 hover:bg-orange-600 text-sm normal-case shadow-md',
          card: 'shadow-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900',
          headerTitle: 'hidden', // Oculto pois já temos no layout
          headerSubtitle: 'hidden',
          footerActionLink: 'text-orange-600 hover:text-orange-700 font-semibold',
          formFieldInput: 'focus:ring-orange-500 focus:border-orange-500 rounded-lg',
        }
      }}
    />
  );
}


