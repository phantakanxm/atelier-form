export const NAV_ITEMS = [
  { href: "/works", index: "01", label: "Works" },
  { href: "/studio", index: "02", label: "Studio" },
  { href: "/contact", index: "03", label: "Contact" },
] as const;

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
