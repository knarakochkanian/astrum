import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-primary-foreground overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://placehold.co/1920x1080"
        alt="Breathtaking travel destination"
        data-ai-hint="tropical beach"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="z-0"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Discover Your Next Adventure
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10">
          Explore breathtaking destinations, unique cultures, and unforgettable experiences with Astrum Voyager.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="accent" className="font-semibold text-lg px-8 py-6 shadow-lg transform transition-transform hover:scale-105">
            Explore Tours
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="font-semibold text-lg px-8 py-6 shadow-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transform transition-transform hover:scale-105">
            Plan Your Trip
          </Button>
        </div>
      </div>
      
      {/* Subtle Parallax/Animation element if desired */}
      {/* Example: A subtle animated gradient or pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
}
