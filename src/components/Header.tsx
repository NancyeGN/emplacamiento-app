import { Button } from "@/components/ui/button"; 
import { NavigationMenu } from "@/components/ui/navigation-menu"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";

export const Header = () =>{

return(
  <ClerkProvider>
  <header className="flex justify-between items-center p-4 border-b">
  <h1 className="text-xl font-semibold">Emplacamiento</h1>
    <div className = "grid grid-cols-2 gap-4">
      <SignedOut>
      <Button asChild variant= "outline">
        <SignInButton />
      </Button>
      <Button asChild variant= "outline">
        <SignUpButton />
      </Button>          
    </SignedOut>
    </div>
    <SignedIn>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => console.log("Perfil")}>
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Configuración")}>
          Configuración
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </SignedIn>
    </header>
    
</ClerkProvider>

)
}