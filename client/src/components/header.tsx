import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { LogIn, User, Bookmark } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [location] = useLocation();
  const { user, isLoading, isAuthenticated } = useAuth();

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const getUserInitials = () => {
    if (!user) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-background/90">
      <div className="container flex h-16 items-center justify-between mx-auto px-6">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center hover-elevate active-elevate-2 px-3 py-2 -ml-3 rounded-lg cursor-pointer">
            <img 
              src="/logo-full.png" 
              alt="SanctifAi Logo" 
              className="h-8 w-auto"
            />
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" data-testid="link-search">
            <span
              className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                location === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Search
            </span>
          </Link>
          {isAuthenticated && (
            <Link href="/library" data-testid="link-library">
              <span
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === "/library" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                My Library
              </span>
            </Link>
          )}
          <Link href="/community" data-testid="link-community">
            <span
              className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                location === "/community" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Community
            </span>
          </Link>
          <Link href="/about" data-testid="link-about">
            <span
              className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                location === "/about" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About
            </span>
          </Link>
          <ThemeToggle />
          
          {!isLoading && (
            <>
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full" 
                      data-testid="button-user-menu"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={user.profileImageUrl || undefined} 
                          alt={user.firstName || "User"} 
                          className="object-cover"
                        />
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel data-testid="text-user-email">
                      {user.email || "User"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/library" data-testid="menu-library">
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>My Library</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
                      <User className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="outline" size="sm" disabled>
                  Guest Mode
                </Button>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
