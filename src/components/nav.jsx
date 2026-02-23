"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, LogOut, Settings, Package, UserCircle, Home, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/store/cartSlice";
import { clearAuthErrors, logout } from "@/store/authSlice";

export function Navigation() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const { items, loading } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);

  // Read cookies and update state whenever auth state changes
  useEffect(() => {
    const userCookie = Cookies.get('user');
    const tokenCookie = Cookies.get('accessToken');

    setUser(userCookie ? JSON.parse(userCookie) : null);
    setToken(tokenCookie || null);
  }, [isAuthenticated]); // Re-run when Redux auth state changes

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Bundles", href: "/bundles" },
    { label: "Subscriptions", href: "/subscriptions" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
    { label: "Catering", href: "/catering" },
  ];

  // In Navigation component - simplified
  useEffect(() => {
    dispatch(fetchCart()); // No need to pass params
  }, [dispatch, isAuthenticated]); // Just depend on auth state

  // In Navigation component
  const handleLogout = async () => {
    try {
      // Clear auth cookies
      Cookies.remove('accessToken');
      Cookies.remove('user');

      // Generate new session_id for guest
      const newSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      Cookies.set('session_id', newSessionId, { expires: 7 });

      // Clear local state
      setUser(null);
      setToken(null);

      // Dispatch Redux logout action
      await dispatch(logout());
      dispatch(clearAuthErrors());

      // Redirect to home page
      router.push('/login');

      // Fetch empty cart for new guest
      dispatch(fetchCart());

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // In Navigation component
  useEffect(() => {
    // Always fetch cart when auth state changes
    const loadCart = async () => {
      await dispatch(fetchCart());
    };

    loadCart();
  }, [dispatch, isAuthenticated]); // Depend on isAuthenticated

  // Also watch for changes in cart items to update UI
  useEffect(() => {
    console.log('Cart updated:', items);
  }, [items]);

  const getUserInitials = () => {
    if (!user) return "U";

    if (user?.username) {
      return user.username.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
    }
    if (user?.name) {
      return user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  // Calculate total cart items
  const totalItems = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                F
              </span>
            </div>
            <span className="font-bold text-xl text-foreground">FreshPrep</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 mt-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative hover:bg-accent mt-2"
              disabled={loading}
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
                {loading && (
                  <span className="absolute -top-1 -right-1">
                    <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-red-500 animate-spin"></div>
                  </span>
                )}
              </Link>
            </Button>

            {/* Login/User Section */}
            {!user ? (
              <>
                <Link href="/login" className="hidden md:block">
                  <Button>Login</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:bg-accent p-0"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user?.profilePic || ""}
                        alt={user?.username || user?.name || "User"}
                      />
                      <AvatarFallback className="bg-primary text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mt-2 border border-border shadow-lg rounded-xl"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.username || user?.name || "Welcome"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/account"
                      className={`flex items-center w-full ${pathname === "/account"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <HomeIcon className="mr-2 h-4 w-4" />
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/account/profile"
                      className={`flex items-center w-full ${pathname === "/account/profile" || pathname.startsWith("/account/profile/")
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/account/orders"
                      className={`flex items-center w-full ${pathname === "/account/orders" || pathname.startsWith("/account/orders/")
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      <span className="text-sm font-medium">Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 hover:text-red-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-accent mt-2"
                >
                  <Menu className="h-5 w-5 text-foreground" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 mt-8">
                  {/* User Info in Mobile Menu */}
                  {user && (
                    <div className="flex items-center gap-3 pb-4 border-b border-border mb-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.profilePic} alt={user.username || user.name} />
                        <AvatarFallback className="bg-primary text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.username || user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Menu Items */}
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-medium transition-colors py-1 ${pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="border-t border-border pt-4 mt-4">
                    {!user ? (
                      <>
                        <Link href="/login">
                          <Button className="w-full mb-3">Login</Button>
                        </Link>
                        <Link href="/register">
                          <Button variant="outline" className="w-full">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/account"
                          className={`flex items-center gap-3 py-3 text-sm font-medium transition-colors ${pathname === "/account"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                          <HomeIcon className="h-5 w-5" />
                          Dashboard
                        </Link>
                        <Link
                          href="/account/profile"
                          className={`flex items-center gap-3 py-3 text-sm font-medium transition-colors ${pathname === "/account/profile" || pathname.startsWith("/account/profile/")
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                          <UserCircle className="h-5 w-5" />
                          Profile
                        </Link>
                        <Link
                          href="/account/orders"
                          className={`flex items-center gap-3 py-3 text-sm font-medium transition-colors ${pathname === "/account/orders" || pathname.startsWith("/account/orders/")
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                          <Package className="h-5 w-5" />
                          Orders
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}