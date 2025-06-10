"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { PriceRange, SortOption } from '@/types';

interface DestinationFiltersProps {
  priceRange: PriceRange;
  setPriceRange: Dispatch<SetStateAction<PriceRange>>;
  sortOption: SortOption;
  setSortOption: Dispatch<SetStateAction<SortOption>>;
}

export function DestinationFilters({
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
}: DestinationFiltersProps) {
  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="price-range-select" className="block text-sm font-medium mb-1">Price Range</Label>
          <Select value={priceRange} onValueChange={(value) => setPriceRange(value as PriceRange)}>
            <SelectTrigger id="price-range-select" className="w-full">
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="affordable">Affordable</SelectItem>
              <SelectItem value="mid-range">Mid-range</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sort-by-select" className="block text-sm font-medium mb-1">Sort By</Label>
          <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
            <SelectTrigger id="sort-by-select" className="w-full">
              <SelectValue placeholder="Sort destinations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
