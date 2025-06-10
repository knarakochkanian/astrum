"use client";

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/ui/hero-section';
import { DestinationCard } from '@/components/destination-card';
import { AiTravelForm } from '@/components/ai-travel-form';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { DestinationFilters } from '@/components/destination-filters';
import type { Destination, PriceRange, SortOption } from '@/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import Image from 'next/image';
import { Users, Compass, Heart } from 'lucide-react';


const DUMMY_DESTINATIONS_INITIAL: Destination[] = [
  { id: '1', name: 'Parisian Dream', country: 'France', description: 'Experience the city of lights, art, and romance with its iconic landmarks.', imageUrl: 'https://placehold.co/600x401', imageHint: 'paris eiffel', priceRange: 'luxury', rating: 4.8, tags: ['city', 'romance', 'culture'], detailsUrl: '#' },
  { id: '2', name: 'Roman Holiday', country: 'Italy', description: 'Explore ancient ruins, stunning art, and vibrant Italian culture in the eternal city.', imageUrl: 'https://placehold.co/600x402', imageHint: 'rome colosseum', priceRange: 'mid-range', rating: 4.5, tags: ['history', 'city', 'culture'], detailsUrl: '#' },
  { id: '3', name: 'Tropical Paradise', country: 'Maldives', description: 'Relax on pristine white-sand beaches and swim in crystal-clear turquoise waters.', imageUrl: 'https://placehold.co/600x403', imageHint: 'maldives beach', priceRange: 'luxury', rating: 4.9, tags: ['beach', 'relax', 'nature'], detailsUrl: '#' },
  { id: '4', name: 'Alpine Adventure', country: 'Switzerland', description: 'Hike through breathtaking alpine scenery, charming villages, and serene lakes.', imageUrl: 'https://placehold.co/600x404', imageHint: 'swiss alps', priceRange: 'mid-range', rating: 4.7, tags: ['mountains', 'adventure', 'nature'], detailsUrl: '#' },
  { id: '5', name: 'Kyoto Serenity', country: 'Japan', description: 'Discover ancient temples, tranquil gardens, and the rich traditions of Japan.', imageUrl: 'https://placehold.co/600x405', imageHint: 'kyoto temple', priceRange: 'mid-range', rating: 4.6, tags: ['culture', 'history', 'nature'], detailsUrl: '#' },
  { id: '6', name: 'Santorini Sunsets', country: 'Greece', description: 'Witness iconic sunsets over the Aegean Sea from whitewashed cliffside villages.', imageUrl: 'https://placehold.co/600x406', imageHint: 'santorini caldera', priceRange: 'luxury', rating: 4.9, tags: ['beach', 'romance', 'views'], detailsUrl: '#' },
];

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [sortOption, setSortOption] = useState<SortOption>('popularity');
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDestinations(DUMMY_DESTINATIONS_INITIAL);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const filteredAndSortedDestinations = useMemo(() => {
    let filtered = destinations;

    if (priceRange !== 'all') {
      filtered = filtered.filter(dest => dest.priceRange === priceRange);
    }

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'popularity':
          return b.rating - a.rating;
        case 'priceLowToHigh':
          const priceOrder = { affordable: 1, 'mid-range': 2, luxury: 3 };
          return priceOrder[a.priceRange] - priceOrder[b.priceRange];
        case 'priceHighToLow':
          const priceOrderDesc = { affordable: 1, 'mid-range': 2, luxury: 3 };
          return priceOrderDesc[b.priceRange] - priceOrderDesc[a.priceRange];
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [destinations, priceRange, sortOption]);

  const loadMoreItems = () => {
    setVisibleItems(prev => prev + ITEMS_PER_PAGE);
  };
  
  const currentDestinations = filteredAndSortedDestinations.slice(0, visibleItems);

  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />

        <SectionWrapper id="popular-destinations">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-4 text-primary">Popular Destinations</h2>
          <p className="text-center text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Explore our curated selection of top-rated travel spots, beloved by adventurers and wanderers alike.
          </p>
          <DestinationFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-[224px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : currentDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentDestinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg py-10">No destinations match your current filters. Try adjusting them!</p>
          )}
          {filteredAndSortedDestinations.length > visibleItems && !isLoading && (
            <div className="text-center mt-12">
              <Button onClick={loadMoreItems} variant="outline" size="lg">
                Load More Destinations
              </Button>
            </div>
          )}
        </SectionWrapper>

        <SectionWrapper id="ai-planner" className="bg-muted/30">
          <div className="max-w-2xl mx-auto">
            <AiTravelForm />
          </div>
        </SectionWrapper>

        <SectionWrapper id="about">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline mb-6 text-primary">About Astrum Voyager</h2>
              <p className="text-lg text-muted-foreground mb-4">
                At Astrum Voyager, we believe travel is more than just visiting new places; it's about creating lasting memories, discovering diverse cultures, and embarking on personal journeys of growth. Our mission is to make your dream vacations a reality with seamless planning and expert guidance.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                With years of experience and a passion for exploration, our team curates unique travel experiences tailored to your preferences. From luxurious getaways to adventurous expeditions, we're here to guide you every step of the way.
              </p>
              <Button variant="accent" size="lg" asChild>
                <a href="#">Learn More About Us</a>
              </Button>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl group">
               <Image
                src="https://placehold.co/800x600"
                alt="Happy travelers exploring"
                data-ai-hint="travelers map"
                layout="fill"
                objectFit="cover"
                className="transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
           <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-foreground mb-2">Expert Team</h3>
              <p className="text-sm text-muted-foreground">Our experienced travel advisors are dedicated to crafting your perfect itinerary.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Compass className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-foreground mb-2">Curated Experiences</h3>
              <p className="text-sm text-muted-foreground">We handpick unique destinations and activities for unforgettable journeys.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-foreground mb-2">Customer Love</h3>
              <p className="text-sm text-muted-foreground">Your satisfaction is our priority. We strive to exceed your travel expectations.</p>
            </div>
          </div>
        </SectionWrapper>

      </main>
      <Footer />
    </>
  );
}
