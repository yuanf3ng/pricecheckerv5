import { Product, PricePoint } from '../types';

export function updateProductPrice(
  product: Product, 
  newPrice: number, 
  newDate: string, 
  newCTNPrice?: number
): Product {
  // Check if this exact price point already exists
  const priceExists = product.priceHistory.some(
    point => point.date === newDate && point.price === newPrice
  );

  if (priceExists) {
    return product;
  }

  return {
    ...product,
    currentPrice: newPrice,
    pricePerCTN: newCTNPrice,
    lastChecked: newDate,
    priceHistory: [
      ...product.priceHistory, // Keep all previous history
      { 
        price: newPrice, 
        date: newDate,
        pricePerCTN: newCTNPrice
      }
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date
  };
}

export function getUniqueProductNames(products: Product[]): string[] {
  return Array.from(new Set(products.map(p => p.name))).sort();
}

export function getUniqueLocations(products: Product[]): string[] {
  return Array.from(new Set(products.map(p => p.location))).sort();
}