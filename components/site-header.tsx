"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  Menu,
  Radio,
  X,
} from "lucide-react";

import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mobileOpenSection, setMobileOpenSection] = useState<
    string | null
  >(null);

  function isActive(href?: string) {
    if (!href) return false;

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function isGroupActive(
    children?: {
      label: string;
      href: string;
    }[]
  ) {
    if (!children) return false;

    return children.some((child) => isActive(child.href));
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setMobileOpenSection(null);
  }

  return (
    <header className="sticky top-0 z-50">
      {/* GÓRNY PASEK */}
      <div className="hidden bg-stone-950 text-stone-300 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-xs">
          <div className="flex items-center gap-6">
            <Link
              href="/parafia/msze"
              className="transition-colors duration-200 hover:text-white"
            >
              Msze Święte
            </Link>

            <Link
              href="/parafia/biuro-parafialne"
              className="transition-colors duration-200 hover:text-white"
            >
              Biuro parafialne
            </Link>

            <Link
              href="/kontakt"
              className="transition-colors duration-200 hover:text-white"
            >
              Kontakt
            </Link>
          </div>

          <Link
            href="/kamera"
            className="flex items-center gap-2 font-medium text-red-300 transition-colors duration-200 hover:text-red-200"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>

            Kamera online
          </Link>
        </div>
      </div>

      {/* GŁÓWNA NAWIGACJA */}
      <div className="border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* LOGO / NAZWA */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex min-h-20 flex-col justify-center py-3"
          >
            <span className="text-lg font-semibold tracking-tight text-stone-900 transition-colors duration-300 group-hover:text-amber-800">
              Sanktuarium w Buku
            </span>

            <span className="hidden text-xs text-stone-500 sm:block">
              Matki Bożej Bukowskiej Literackiej
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden h-20 items-stretch lg:flex">
            {siteConfig.navigation.map((item) => {
              const groupActive = isGroupActive(item.children);

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="group relative flex items-center"
                  >
                    <button
                      type="button"
                      className={`
                        relative flex h-full items-center gap-1 px-3
                        text-sm font-medium
                        transition-all duration-300
                        xl:px-4
                        ${
                          groupActive
                            ? "text-amber-800"
                            : "text-stone-700 hover:text-amber-800"
                        }
                      `}
                    >
                      {item.label}

                      <ChevronDown
                        size={15}
                        className="transition-transform duration-300 group-hover:rotate-180"
                      />

                      <span
                        className={`
                          absolute bottom-0 left-1/2 h-[3px]
                          -translate-x-1/2 rounded-full bg-amber-700
                          transition-all duration-300
                          ${
                            groupActive
                              ? "w-[calc(100%-24px)]"
                              : "w-0 group-hover:w-[calc(100%-24px)]"
                          }
                        `}
                      />
                    </button>

                    {/* DROPDOWN */}
                    <div
                      className="
                        pointer-events-none absolute left-1/2 top-full
                        w-72 -translate-x-1/2 translate-y-2
                        opacity-0
                        transition-all duration-200
                        group-hover:pointer-events-auto
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                    >
                      <div className="mt-0 overflow-hidden rounded-b-2xl border border-stone-200 bg-white p-2 shadow-xl shadow-stone-950/10">
                        {item.children.map((child) => {
                          const active = isActive(child.href);

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`
                                group/item flex items-center
                                rounded-xl px-4 py-3
                                text-sm
                                transition-all duration-200
                                ${
                                  active
                                    ? "bg-amber-50 font-semibold text-amber-900"
                                    : "text-stone-700 hover:bg-stone-50 hover:pl-5 hover:font-medium hover:text-amber-800"
                                }
                              `}
                            >
                              <span
                                className="
                                  mr-0 h-1.5 w-0 rounded-full bg-amber-700
                                  opacity-0 transition-all duration-200
                                  group-hover/item:mr-3
                                  group-hover/item:w-1.5
                                  group-hover/item:opacity-100
                                "
                              />

                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`
                    group relative flex h-full items-center px-3
                    text-sm font-medium
                    transition-all duration-300
                    xl:px-4
                    ${
                      isActive(item.href)
                        ? "text-amber-800"
                        : "text-stone-700 hover:text-amber-800"
                    }
                  `}
                >
                  <span className="transition-transform duration-200 group-hover:-translate-y-[1px]">
                    {item.label}
                  </span>

                  <span
                    className={`
                      absolute bottom-0 left-1/2 h-[3px]
                      -translate-x-1/2 rounded-full bg-amber-700
                      transition-all duration-300
                      ${
                        isActive(item.href)
                          ? "w-[calc(100%-24px)]"
                          : "w-0 group-hover:w-[calc(100%-24px)]"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* KAMERA DESKTOP */}
          <Link
            href="/kamera"
            className="
              group hidden items-center gap-2
              rounded-full bg-stone-950
              px-5 py-2.5
              text-sm font-semibold text-white
              shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-amber-800
              hover:shadow-md
              lg:flex
            "
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>

            Kamera
          </Link>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="
              rounded-xl p-2.5 text-stone-700
              transition-colors
              hover:bg-stone-100
              lg:hidden
            "
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
            overflow-hidden border-t border-stone-100 bg-white
            transition-all duration-300 ease-in-out
            lg:hidden
            ${
              mobileMenuOpen
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 border-t-0 opacity-0"
            }
          `}
        >
          <nav className="mx-auto max-w-7xl px-5 py-4">
            {/* KAMERA MOBILE */}
            <Link
              href="/kamera"
              onClick={closeMobileMenu}
              className="
                mb-4 flex items-center justify-center gap-2
                rounded-xl bg-stone-950
                px-5 py-3.5
                text-sm font-semibold text-white
                transition-colors
                hover:bg-amber-800
              "
            >
              <Radio size={18} className="text-red-400" />

              Kamera online
            </Link>

            {siteConfig.navigation.map((item) => {
              if (item.children) {
                const open = mobileOpenSection === item.label;

                const active = isGroupActive(item.children);

                return (
                  <div
                    key={item.label}
                    className="border-b border-stone-100"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileOpenSection(
                          open ? null : item.label
                        )
                      }
                      className={`
                        flex w-full items-center justify-between
                        py-4 text-left text-sm
                        transition-colors
                        ${
                          active
                            ? "font-semibold text-amber-800"
                            : "font-medium text-stone-800 hover:text-amber-800"
                        }
                      `}
                    >
                      {item.label}

                      <ChevronDown
                        size={18}
                        className={`
                          transition-transform duration-300
                          ${open ? "rotate-180" : ""}
                        `}
                      />
                    </button>

                    <div
                      className={`
                        overflow-hidden
                        transition-all duration-300
                        ${
                          open
                            ? "max-h-[600px] pb-3 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >
                      <div className="ml-3 border-l border-stone-200 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMobileMenu}
                            className={`
                              block rounded-lg px-3 py-2.5
                              text-sm
                              transition-all duration-200
                              ${
                                isActive(child.href)
                                  ? "bg-amber-50 font-semibold text-amber-900"
                                  : "text-stone-600 hover:bg-stone-50 hover:pl-4 hover:text-amber-800"
                              }
                            `}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={closeMobileMenu}
                  className={`
                    block border-b border-stone-100
                    py-4 text-sm
                    transition-all duration-200
                    ${
                      isActive(item.href)
                        ? "font-semibold text-amber-800"
                        : "font-medium text-stone-800 hover:pl-1 hover:text-amber-800"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}