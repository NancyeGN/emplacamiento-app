import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { mutation } from "./_generated/server";


export const registerUser = action({
  args: {
    email: v.string(),
    password: v.string(),
    // otros campos que necesites
  },
  handler: async (ctx, args) => {
    try {
      // 1. Llamar a la API de Clerk para crear un usuario
      const response = await fetch("https://api.clerk.dev/v1/users", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.CLERK_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email_address: [{ email: args.email }],
          password: args.password,
          // otros campos necesarios
        })
      });
      

/* app.post('/createUser', async (req, res) => {
  const userData = req.body

  try {
    const user = await clerkClient.users.createUser(userData)
    res.status(200).json({ message: 'User created', user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error creating user' })
  }
}) */
      
      const clerkUser = await response.json();
      
      // 2. Almacenar los datos en Convex
      await ctx.runMutation(api.users.storeUser, {
        email: args.email,
        clerkId: clerkUser.id,
        // otros datos que quieras guardar
      });
      
      return { success: true, userId: clerkUser.id };
    } catch (error) {
      console.error("Error registering user:", error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  },
});