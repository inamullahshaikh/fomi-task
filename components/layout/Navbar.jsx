"use client";

import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  GalleryIcon,
  MoonIcon,
  NAV_ICON_MAP,
  SunIcon,
  SupportIcon,
} from "@/components/icons/Icons";
import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import { NAV_ITEMS } from "@/lib/constants";
import { useTheme } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";
import styles from "./Navbar.module.css";

function Navbar() {
  const headerRef = useRef(null);
  const { isDark, toggleTheme, mounted } = useTheme();
  const [activeNav, setActiveNav] = useState("home");

  const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeNav);
  const progressWidth = ((Math.max(activeIndex, 0) + 1) / NAV_ITEMS.length) * 100;

  const handleNavSelect = useCallback((id) => {
    setActiveNav(id);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const syncNavbarHeight = () => {
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${header.offsetHeight}px`
      );
    };

    syncNavbarHeight();

    const resizeObserver = new ResizeObserver(syncNavbarHeight);
    resizeObserver.observe(header);
    window.addEventListener("resize", syncNavbarHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncNavbarHeight);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 bg-[var(--bg-page)]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Fomi home"
            className={styles.logo}
            onClick={() => setActiveNav("home")}
          >
            F
          </Link>

          <div className="flex-1" aria-hidden="true" />

          <div className="flex items-center gap-1 sm:gap-2">
            <button type="button" className={cn(styles.headerAction, "hidden sm:inline-flex")}>
              <GalleryIcon className="h-4 w-4" />
              Gallery
            </button>
            <button type="button" className={cn(styles.headerAction, "hidden md:inline-flex")}>
              <SupportIcon className="h-4 w-4" />
              Support
            </button>
            <IconButton
              label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              {mounted && isDark ? <SunIcon /> : <MoonIcon />}
            </IconButton>
            <Avatar size={32} />
          </div>
        </div>

        <nav aria-label="Primary" className={styles.navCenter}>
          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressFill}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <span className="sr-only">
            {NAV_ITEMS.find((item) => item.id === activeNav)?.label} section —{" "}
            {progressWidth}% progress
          </span>

          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const Icon = NAV_ICON_MAP[item.id];
              const active = item.id === activeNav;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavSelect(item.id)}
                    className={cn(styles.navLink, active && styles.navLinkActive)}
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    title={item.label}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
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
