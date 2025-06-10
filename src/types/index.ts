export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  priceRange: 'affordable' | 'mid-range' | 'luxury';
  rating: number; // 1-5
  tags: string[];
  detailsUrl: string;
}

export type PriceRange = 'affordable' | 'mid-range' | 'luxury' | 'all';
export type SortOption = 'popularity' | 'priceLowToHigh' | 'priceHighToLow' | 'name';
