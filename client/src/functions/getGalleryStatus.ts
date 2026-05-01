export function getGalleryStatus(pathname: string) {
  return pathname.includes("admin")
    ? "admin"
    : pathname.includes("public")
      ? "public"
      : pathname.includes("my")
        ? "my"
        : null;
}
