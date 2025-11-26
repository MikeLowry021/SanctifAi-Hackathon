import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

/**
 * QuickAuth: Guest-only header component
 * Authentication UI elements have been removed for guest-only mode
 */
export function Header() {
  const [location] = useLocation();

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
          {/* My Library hidden in guest mode */}
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

          {/* QuickAuth: Guest Mode indicator */}
          <Button
            variant="outline"
            size="sm"
            disabled
            className="cursor-default"
          >
            Guest Mode
          </Button>
        </nav>
      </div>
    </header>
  );
}
