"use client"
import { ClerkProvider, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "./theme-provider";

import { UnauthenticatedView } from "@/features/auth/component/unauthenticated-view";
import { AuthLoadingView } from "@/features/auth/component/auth-loading";


import { TooltipProvider } from "@/components/ui/tooltip";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <ClerkProvider >

      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <TooltipProvider delayDuration={0}>
            <Authenticated>

              {children}

            </Authenticated>
            <Unauthenticated>
              <UnauthenticatedView />

            </Unauthenticated>
            <AuthLoading>
              <AuthLoadingView />
            </AuthLoading>
          </TooltipProvider>
        </ThemeProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
