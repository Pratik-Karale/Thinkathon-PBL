import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";

interface NavbarProps {
  logo?: {
    src: string;
    alt: string;
  };
  navLinks?: Array<{
    text: string;
    href: string;
  }>;
}

const Navbar = ({
  logo = {
    src: "/logo.svg", 
    alt: "Logo"
  },
  navLinks = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Contact", href: "/contact" },
  ]
}: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-8 lg:px-12">
        {/* Logo */}

        {/* Navigation Links - Center */}
        <div className="flex flex-1 justify-center">
        {/* <div className="mr-4 md:flex"> */}
          <a href="/" className="flex items-center space-x-2">
            <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
          </a>
        {/* </div> */}
          {/* <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    {link.text}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu> */}
        </div>

        {/* Sign In Button - Right */}
        <div className="ml-auto">
          <Button variant="outline">Sign In</Button>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
