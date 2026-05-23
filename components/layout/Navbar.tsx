import Link from "next/link";

const navItems = [
  {
    label: "Poses",
    href: "/poses",
  },
  {
    label: "Modules",
    href: "/modules",
  },
  {
    label: "Class Templates",
    href: "/class-templates",
  },
  {
    label: "Builder",
    href: "/builder",
  },
];

export default function Navbar() {
    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="text-lg font-bold tracking-tight"
                >
                    Yoga Sequencing
                </Link>

                <nav className="flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-gray-600 transition hover:text-black"
                          >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
