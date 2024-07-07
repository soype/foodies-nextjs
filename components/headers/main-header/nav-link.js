"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import classes from "./MainHeader.module.css"

const NavLink = ({ children, href }) => {
    
    const path = usePathname();

  return (
    <Link href={href} className={path.startsWith(href) ? classes.active : ''}>{children}</Link>
  )
}

export default NavLink;