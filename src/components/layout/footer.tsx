import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 text-muted-foreground border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm mb-4">
              Your journey begins with Аструм-Тревел. Discover amazing destinations and plan your perfect trip with us.
            </p>
            <div className="flex space-x-3">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </Link>
               <Link href="#" aria-label="Youtube" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-lg text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Destinations</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Special Offers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Booking Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-headline text-lg text-foreground mb-4">Newsletter</h4>
            <p className="text-sm mb-3">Stay updated with our latest travel deals and news.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit" variant="accent">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Аструм-Тревел. All rights reserved. Crafted with passion.</p>
        </div>
      </div>
    </footer>
  );
}
