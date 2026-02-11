"use client"
import { ClerkProvider, SignInButton, SignUpButton, useAuth} from "@clerk/nextjs";
import { ConvexReactClient,Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "./theme-provider";
import { UserButton } from "@clerk/nextjs"; 
import { UnauthenticatedView } from "@/features/auth/component/unauthenticated-view";
import { AuthLoadingView } from "@/features/auth/component/auth-loading";


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
                   <Authenticated>
                         <UserButton/>
                         {children}
                   </Authenticated>
                   <Unauthenticated>
                      <UnauthenticatedView/>

                   </Unauthenticated>
                   <AuthLoading>
                     <AuthLoadingView/>
                   </AuthLoading>                    
                     
                 </ThemeProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};
