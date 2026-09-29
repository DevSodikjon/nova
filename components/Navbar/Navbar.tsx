import "@/components/Navbar/Navbar.module.scss";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <header>
      <main className="container">
        <div className="logo"></div>

        {/* Navigation */}
        <nav>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="actions">
          <button>Search</button>
          <button>Wishlist</button>
          <button>Cart</button>
          <button>Account</button>
        </div>
      </main>
    </header>
  );
}
