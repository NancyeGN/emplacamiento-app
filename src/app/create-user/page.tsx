"use client";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import ListUsers from "@/app/create-user/components/listUsers";


export default function Page() {
  const { isLoaded } = useSignUp();
  const createUser = useAction(api.functions.createUser);
  const users = useQuery(api.users.get);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!isLoaded) {
      console.error("Clerk no está cargado.");
      setError("Error: Clerk no está cargado.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await createUser({
        email,
        password,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      alert("Cuenta creada con éxito. Por favor verifica tu correo electrónico.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la cuenta");
      console.error("Error al registrar usuario:", err);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Crear Cuenta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Correo</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Ingrese Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Ingrese Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div id="clerk-captcha"></div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <CardFooter className="flex mt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Crear Cuenta"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
        <div className="h-8"></div>
        <ListUsers />
      </main>

      <footer className="flex w-full items-center justify-center bg-gray-100 py-6 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            (c) 2024 Q&A platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
