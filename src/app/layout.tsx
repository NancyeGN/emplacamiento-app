"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { use } from "react";
import { Metadata } from "next";
import { ClerkProvider,
         SignInButton,
         SignUpButton,
         SignedIn,
         SignedOut,
         UserButton
 } from "@clerk/nextjs";
import { Header } from "../components/Header";
import { Inter } from "next/font/google"
import "./globals.css"


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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