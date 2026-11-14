import type { MerchandiseProduct } from "./models";
export const categories = [
  "Postcards",
  "Fridge magnets",
  "Tote bags",
  "Stickers",
  "Fashion accessories",
  "Limited editions",
];
export const colors = ["Peach", "Lavender", "Sage", "Coral", "Blue", "Cream"];
export interface ShopFilters {
  category: string;
  color: string;
  min: string;
  max: string;
  type: string;
  availability: string;
}
export const emptyFilters: ShopFilters = {
  category: "all",
  color: "all",
  min: "",
  max: "",
  type: "all",
  availability: "all",
};
export function filterProducts(
  products: MerchandiseProduct[],
  filter: ShopFilters,
) {
  return products.filter(
    (p) =>
      (filter.category === "all" || p.category === filter.category) &&
      (filter.color === "all" || p.colorName === filter.color) &&
      (filter.type === "all" || p.productType === filter.type) &&
      (filter.availability === "all" ||
        p.availability === filter.availability) &&
      (filter.min === "" || p.price >= Number(filter.min)) &&
      (filter.max === "" || p.price <= Number(filter.max)),
  );
}
