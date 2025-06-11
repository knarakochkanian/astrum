import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
      <section id="hero"
               className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-primary-foreground overflow-hidden">
          <div className="relative w-full h-[500px]">
              <Image
                  src="/home/bus.jpg"
                  alt="Breathtaking travel destination"
                  layout="fill"
                  objectFit="cover"
                  quality={80}
                  className="z-0"
                  priority
              />
          </div>

          <div className="absolute inset-0 bg-black/50 z-10"></div>

          <div className="relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Откройте для себя новые горизонты
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10">
                  Погрузитесь в мир захватывающих путешествий, уникальных культур и незабываемых впечатлений вместе с
                  Аструм-Тревел.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                      size="lg"
                      variant="accent"
                      className="font-semibold text-lg px-8 py-6 shadow-lg transform transition-transform hover:scale-105"
                  >
                      Посмотреть туры
                      <ChevronRight className="ml-2 h-5 w-5"/>
                  </Button>
                  <Button
                      size="lg"
                      variant="outline"
                      className="font-semibold text-lg px-8 py-6 shadow-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transform transition-transform hover:scale-105"
                  >
                      Спланировать поездку
                  </Button>
              </div>
          </div>


          {/* Subtle Parallax/Animation element if desired */}
          {/* Example: A subtle animated gradient or pattern */}
          <div
              className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
      </section>
  );
}
