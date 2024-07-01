"use client";
import MobileNavbar from "./NavBar";

export default function AppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  return (
    <MobileNavbar>
        {children}
    </MobileNavbar>
  );
}
