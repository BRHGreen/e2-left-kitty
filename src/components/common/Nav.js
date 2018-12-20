import React from "react";

const Nav = ({
  history: {
    location: { pathname }
  }
}) => {
  const navItems = [
    { label: "Statements", href: "/" },
    { label: "Payment Records", href: "/payment-records" },
    { label: "Add Statement", href: "/kitty-parser" },
    { label: "Housemates", href: "/housemates" }
  ];
  return (
    <header className="navbar bg-gray docs-block">
      <section className="navbar-section">
        {navItems.map(({ label, href }, i) => (
          <a key={i} href={href} className={"btn btn-link"}>
            <h4 className={pathname === href ? "underline" : "font-light"}>
              {label}
            </h4>
          </a>
        ))}
      </section>
    </header>
  );
};

export default Nav;
