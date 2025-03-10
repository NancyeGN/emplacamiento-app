import { mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { api } from "./_generated/api";

interface UserResponse {
  success: boolean;
  userData?: {
    id: string;
    email: string;
    convexId: string;
  };
  error?: string;
}

interface ClerkError {
  status: number;
  errors?: Array<{
    code: string;
    message: string;
  }>;
}

export const createUser = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<UserResponse> => {
    try {
      // Crear usuario en Clerk
      const user = await clerkClient.users.createUser({
        emailAddress: [args.email],
        password: args.password,
      });

      // Guardar en Convex usando la mutación addUser
      const userId: string = await ctx.runMutation(api.functions.addUser, {
        email: args.email,
        clerkId: user.id,
      });

      // Devolver solo los datos necesarios
      return { 
        success: true, 
        userData: {
          id: user.id,
          email: args.email,
          convexId: userId
        }
      };
    } catch (error) {
      console.error(error);
      
      // Manejar error específico de Clerk para email duplicado
      const clerkError = error as ClerkError;
      if (clerkError.status === 422) {
        return {
          success: false,
          error: "Este correo electrónico ya está registrado. Por favor, utiliza otro."
        };
      }

      // Otros errores
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error al crear el usuario' 
      };
    }
  },
});

export const addUser = mutation({
  args: { 
    email: v.string(),
    clerkId: v.string()
  },
  handler: async ({ db }, { email, clerkId }) => {
    // Verificar si el usuario ya existe
    const existingUser = await db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existingUser) {
      throw new Error("El usuario ya está registrado.");
    }

    // Guardar nuevo usuario en la base de datos
    const userId = await db.insert("users", { email, clerkId });

    return userId;
  }
});

/* 
export async function POST() {
    try {
      const user = await clerkClient.users.createUser({
        emailAddress: ['test@example.com'],
        password: 'password',
      })
      return Response.json({ message: 'User created', user })
    } catch (error) {
      console.log(error)
      return Response.json({ error: 'Error creating user' })
    }
  }
*/