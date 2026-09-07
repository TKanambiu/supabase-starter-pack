import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, normKey, type Category, type Product } from "@/data/catalogue";

export const BUCKET = "product-images";
export const STORAGE_PREFIX = "storage:";

export type DbProduct = {
  id: string;
  product_key: string;
  name: string;
  category_slug: string;
  subcategory: string;
  price: number;
  reseller: number | null;
  image_url: string | null;
  is_custom: boolean;
};

export type CatalogueDb = {
  byKey: Record<string, DbProduct>;
  signed: Record<string, string>;
};

export const productKey = (name: string) => normKey(name);

/** Turns a stored image reference into something an <img> can load. */
export function resolveImage(url: string | null | undefined, signed: Record<string, string>) {
  if (!url) return undefined;
  if (url.startsWith(STORAGE_PREFIX)) return signed[url.slice(STORAGE_PREFIX.length)];
  return url;
}

export async function fetchCatalogueDb(): Promise<CatalogueDb> {
  const { data, error } = await supabase
    .from("products")
    .select("id, product_key, name, category_slug, subcategory, price, reseller, image_url, is_custom");
  if (error) throw error;

  const rows = (data ?? []) as DbProduct[];
  const paths = rows
    .map((r) => r.image_url)
    .filter((u): u is string => !!u && u.startsWith(STORAGE_PREFIX))
    .map((u) => u.slice(STORAGE_PREFIX.length));

  const signed: Record<string, string> = {};
  if (paths.length) {
    const { data: urls } = await supabase.storage
      .from(BUCKET)
      .createSignedUrls(Array.from(new Set(paths)), 60 * 60 * 24 * 7);
    for (const u of urls ?? []) {
      if (u.path && u.signedUrl) signed[u.path] = u.signedUrl;
    }
  }

  const byKey: Record<string, DbProduct> = {};
  for (const r of rows) byKey[r.product_key] = r;
  return { byKey, signed };
}

export function useCatalogueDb() {
  return useQuery({
    queryKey: ["catalogue-db"],
    queryFn: fetchCatalogueDb,
    staleTime: 60_000,
  });
}

function applyToProduct(prod: Product, db: CatalogueDb | undefined): Product {
  if (!db) return prod;
  const row = db.byKey[productKey(prod.name)];
  if (!row) return prod;
  return {
    ...prod,
    price: row.price,
    reseller: row.reseller ?? undefined,
    image: resolveImage(row.image_url, db.signed) ?? prod.image,
  };
}

/** Merges admin edits and admin-added products into a static category. */
export function mergeCategory(category: Category, db: CatalogueDb | undefined): Category {
  if (!db) return category;
  const subs = category.subcategories.map((s) => ({
    ...s,
    products: s.products.map((p) => applyToProduct(p, db)),
  }));

  const known = new Set(
    category.subcategories.flatMap((s) => s.products.map((p) => productKey(p.name))),
  );
  const extras = Object.values(db.byKey).filter(
    (r) => r.is_custom && r.category_slug === category.slug && !known.has(r.product_key),
  );

  for (const row of extras) {
    const product: Product = {
      name: row.name,
      price: row.price,
      reseller: row.reseller ?? undefined,
      image: resolveImage(row.image_url, db.signed),
    };
    const sub = subs.find((s) => s.name === row.subcategory);
    if (sub) sub.products = [...sub.products, product];
    else subs.push({ name: row.subcategory || "General", products: [product] });
  }

  return { ...category, subcategories: subs };
}

export function mergedCategories(db: CatalogueDb | undefined): Category[] {
  return CATEGORIES.map((c) => mergeCategory(c, db));
}

export function mergedProducts(db: CatalogueDb | undefined) {
  return mergedCategories(db).flatMap((c) =>
    c.subcategories.flatMap((s) =>
      s.products.map((prod) => ({
        ...prod,
        category: c.name,
        categorySlug: c.slug,
        subcategory: s.name,
        categoryImage: c.image,
      })),
    ),
  );
}
