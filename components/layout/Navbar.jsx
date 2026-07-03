"use client";

import Link from "next/link";
import { memo } from "react";
import {
  GalleryIcon,
  MoonIcon,
  NAV_ICON_MAP,
  SunIcon,
  SupportIcon,
} from "@/components/icons/Icons";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import { NAV_ITEMS } from "@/lib/constants";
import { useTheme } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";
import styles from "./Navbar.module.css";

function Navbar({ activeNav = "home" }) {
  const { isDark, toggleTheme, mounted } = useTheme();

  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        "border-b border-[var(--border-subtle)]",
        "bg-[var(--bg-page)]/80 backdrop-blur-xl backdrop-saturate-150"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Fomi home" className={styles.logo}>
            F
          </Link>

          <div className="hidden flex-1 justify-center px-8 md:flex">
            <div className={styles.progressTrack} aria-hidden="true">
              <div className={styles.progressFill} style={{ width: "62%" }} />
            </div>
            <span className="sr-only">Generation credits 62% used</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden rounded-[var(--radius-md)] sm:inline-flex"
              leftIcon={<GalleryIcon className="opacity-70" />}
              aria-label="Open gallery"
            >
              Gallery
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden rounded-[var(--radius-md)] md:inline-flex"
              leftIcon={<SupportIcon className="opacity-70" />}
              aria-label="Get support"
            >
              Support
            </Button>
            <IconButton
              label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              {mounted && isDark ? <SunIcon /> : <MoonIcon />}
            </IconButton>
            <Avatar size={34} />
          </div>
        </div>

        <nav
          aria-label="Primary"
          className="flex justify-center overflow-x-auto scrollbar-thin pb-0.5"
        >
          <ul className={styles.navPill}>
            {NAV_ITEMS.map((item) => {
              const Icon = NAV_ICON_MAP[item.id];
              const active = item.id === activeNav;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(styles.navLink, active && styles.navLinkActive)}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && <span className={styles.navIndicator} aria-hidden="true" />}
                    <Icon className="h-[1.125rem] w-[1.125rem]" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default memo(Navbar);
