"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "../components/Header";
import "./globals.css"


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
console.log("CLERK KEY", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <header>
          <Header/>
        </header>
        
        <ConvexProvider client={convex}>
          {children}
        </ConvexProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}