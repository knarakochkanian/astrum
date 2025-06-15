"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#popular-destinations', label: 'Предназначение' },
  { href: '#ai-planner', label: 'Планировщик путешествий ИИ' },
  { href: '#about', label: 'О нас' },
  { href: '/table', label: 'График Геленджик' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-background/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="/Аструм-Тревел">
            <Logo className={cn(isScrolled ? 'text-primary' : 'text-white')} />
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-accent',
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">

            <Button variant="accent" size="sm">
           Забронировать сейчас
            </Button>
          </div>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className={cn(isScrolled ? 'text-foreground' : 'text-primary-foreground hover:bg-primary-foreground/10')}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-background shadow-lg animate-in fade-in-20 slide-in-from-top-5 duration-300">
          <nav className="flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-l rounded-md px-3 py-2 font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-2">
              <Globe className="mr-2 h-4 w-4" /> EN
            </Button>
            <Button variant="accent" size="sm" className="w-full mt-2">
              Book Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
