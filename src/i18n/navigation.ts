import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Lightweight wrappers around Next.js' navigation that
// are aware of the locale and prefix paths automatically
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
