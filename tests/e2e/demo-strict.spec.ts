type UserRole = "admin" | "client" | "vip";

export function calculateDiscount(role: UserRole): number {
  if (role === "vip") return 20;
  return 0;
}

export async function getFirstProductPrice(prices: string[]): Promise<number> {
  const first = prices[0];
  if (first === undefined) {
    throw new Error("Aucun prix dans la liste");
  }
  return parseFloat(first);
}
