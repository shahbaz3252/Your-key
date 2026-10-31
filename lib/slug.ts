const RESERVED_SLUGS = new Set([
  "rent",
  "sales",
  "off-plan",
  "new",
  "admin",
  "api",
]);

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

export async function generateUniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  let root = slugify(base) || "item";

  if (RESERVED_SLUGS.has(root)) {
    root = `${root}-listing`;
  }

  let candidate = root;
  let counter = 2;

  while (await exists(candidate)) {
    candidate = `${root}-${counter}`;
    counter += 1;

    if (counter > 500) {
      throw new Error("Could not generate a unique slug");
    }
  }

  return candidate;
}