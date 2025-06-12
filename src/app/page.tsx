"use client";

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import  HeroSection  from '@/components/ui/hero-section';
import { DestinationCard } from '@/components/destination-card';
import { AiTravelForm } from '@/components/ai-travel-form';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { DestinationFilters } from '@/components/destination-filters';
import type { Destination, PriceRange, SortOption } from '@/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import Image from 'next/image';
import { Users, Compass, Heart } from 'lucide-react';
// import { TestimonialsSection } from "@/components/ui/testimonials-section";


const DUMMY_DESTINATIONS_INITIAL: Destination[] = [
  { id: '1', name: 'Итальянский Дворик', country: 'Геленджик', description: 'Гостевой дом "Итальянский Дворик" находится в центре города и обладает ценными преимуществами: тишина, спокойствие, летняя прохлада, уют домашней обстановки, морской воздух, удобные условия для жизни и отдыха в течение всего года.', imageUrl: '/home/italyanskiy.png', imageHint: 'paris eiffel', priceRange: 'luxury', rating: 4.8, tags: ['city', 'romance', 'culture'], detailsUrl: '#' },
  { id: '2', name: 'Лилона', country: 'Лазаревское', description: 'Гостевой дом «Лилона» представляет собой новое современное строение, включающее в себя два спальных корпуса, гармонично объединенных одним вестибюлем и рядом коридорных и лестничных переходов. Оба корпуса имеют единый парадный вход. Круглосуточно на территории гостевого дома ведется видеонаблюдение.', imageUrl: '/home/1-lilona.jpg', imageHint: 'rome colosseum', priceRange: 'mid-range', rating: 4.5, tags: ['history', 'city', 'culture'], detailsUrl: '#' },
  { id: '3', name: 'Массандра', country: 'Лоо', description: 'Всего в 200х метрах от хорошего пляжа Лоо-1 и Магадан. Это 3−5 минут неспешным шагом. Имеется пригорок с  лесенкой метров 20.', imageUrl: '/home/massandra_loo_1.jpg', imageHint: 'maldives beach', priceRange: 'luxury', rating: 4.9, tags: ['beach', 'relax', 'nature'], detailsUrl: '#' },
  { id: '4', name: 'Горизонт', country: 'Лазаревское', description: 'Гостевой дом «Горизонт» расположен на территории филиала турбазы «Чайка». Дорога к морю занимает 3 минуты ходьбы. Пляж с развитой инфраструктурой, не очень многолюдный, оборудованный, со множеством морских развлечений и с прокатом пляжного инвентаря.', imageUrl: '/home/1-gorizont-sochi-lazarevskoe.jpg', imageHint: 'swiss alps', priceRange: 'mid-range', rating: 4.7, tags: ['mountains', 'adventure', 'nature'], detailsUrl: '#' },
  { id: '5', name: 'У фонтана', country: 'Геленджик', description: 'Гостевой дом "У Фонтана" расположен в городе-курорте Геленджик в 10-15 минутах ходьбы от берега Черного моря. В шаговой доступности вся необходимая инфраструктура курорта: песчаный и галечный пляж, аквапарк, дельфинарий, рынок, магазины, сувенирные лавочки, аптека, остановка общественного транспорта.', imageUrl: '/home/1-u-fontana-gelendzhik.jpg', imageHint: 'kyoto temple', priceRange: 'mid-range', rating: 4.6, tags: ['culture', 'history', 'nature'], detailsUrl: '#' },
  { id: '6', name: 'Анна-Мария', country: 'Лоо', description: 'Гостевой дом «Анна-Мария» расположен в одном из популярнейших курортов Большого Сочи — в центральной части поселка Лоо. Дом находится очень удобно, рядом вокзал, но поездов не слышно, так же не надо подыматься в гору.', imageUrl: '/home/1-loo-anna-mariya.jpg', imageHint: 'maldives beach', priceRange: 'luxury', rating: 4.9, tags: ['beach', 'relax', 'nature'], detailsUrl: '#' },

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
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-4 text-primary">Популярные направления</h2>
          <p className="text-center text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Познакомьтесь с нашей тщательно отобранной подборкой самых популярных туристических мест, любимых как искателями приключений, так и путешественниками.
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
        {/*<TestimonialsSection/>*/}
        <SectionWrapper id="about">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline mb-6 text-primary">Турфирма Аструм-Тревел </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Являемся туроператором по внутреннему туризму (реестровый номер ВНТ 013003).
              </p>
                <p className="text-lg text-muted-foreground mb-4">  Предлагаем:

                Экскурсионные туры из Твери: Москва, Санкт-Петербург, Золотое кольцо, Карелия, Белоруссия и др.

                Пляжный отдых на Черноморском побережье.

                Поездки в театры, музеи, торговые центры.

                Индивидуальный подход и высокое качество обслуживания.</p>


                <p className="text-lg text-muted-foreground mb-4">

                Надёжность и безопасность:

                Все поездки лицензированы и застрахованы.

                Профессиональные водители с регулярной аттестацией.

                Отличное техническое состояние автобусов.

                Дополнительные удобства:

                Видеоразвлечения, кофеварка, регулируемые сиденья, индивидуальное освещение и вентиляция.
                </p>


              <Button variant="accent" size="lg" asChild>
                <a href="#">Learn More About Us</a>
              </Button>
            </div>
            <div className="relative h-full rounded-lg overflow-hidden group">
               <Image
                src="/home/svidetelstvo2021.jpg"
                alt="Happy travelers exploring"
                data-ai-hint="travelers map"
                layout="fill"
                objectFit="contain"
                className="transform h-full transition-transform duration-500 group-hover:scale-110"
              />
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
