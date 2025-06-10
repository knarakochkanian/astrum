import Image from 'next/image';
import Link from 'next/link';
import type { Destination } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, DollarSign } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const { name, country, description, imageUrl, imageHint, priceRange, rating, tags, detailsUrl } = destination;

  const priceIcons = {
    affordable: <DollarSign className="h-4 w-4 text-green-500" />,
    'mid-range': <><DollarSign className="h-4 w-4 text-yellow-500" /><DollarSign className="h-4 w-4 text-yellow-500" /></>,
    luxury: <><DollarSign className="h-4 w-4 text-red-500" /><DollarSign className="h-4 w-4 text-red-500" /><DollarSign className="h-4 w-4 text-red-500" /></>,
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
      <CardHeader className="p-0 relative">
        <Link href={detailsUrl} aria-label={`View details for ${name}`}>
          <Image
            src={imageUrl}
            alt={`Image of ${name}`}
            data-ai-hint={imageHint}
            width={600}
            height={400}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 px-2 py-1 rounded-full text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
          ))}
          <span className="ml-1 font-semibold">{rating.toFixed(1)}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-1 truncate hover:text-primary transition-colors">
          <Link href={detailsUrl}>{name}</Link>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{country}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-3" title={`Price: ${priceRange}`}>
          {priceIcons[priceRange]}
          <span className="ml-1 capitalize">{priceRange}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild variant="accent" className="w-full">
          <Link href={detailsUrl}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
