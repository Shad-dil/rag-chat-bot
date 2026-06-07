"use client";
import React from "react";
import {
  SignOutButton,
  SignInButton,
  useAuth,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navigation = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="border-b border-var(--foreground)/10">
      <div className="flex container h-16 items-center justify-between px-4 mx-auto">
        <div className="text-xl font-semibold">RAG CHATBOT</div>
        <div className="flex gap-2">
          {isSignedIn ? (
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          ) : (
            <div className="flex gap-3">
              <SignInButton mode="modal">
                <Button variant={"ghost"}>Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant={"default"}>Sign Up</Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
