'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'Brand',
  brandHref: '/',
  navItems: [{ label: 'Home', href: '#hero' }],
  ctaText: 'Get Started',
  ctaHref: '/get-started',
  showCta: true,
  showMobileMenu: true,
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const handleBrandClick = () => {
    navigate(config.brandHref);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              className="text-xl font-bold text-foreground hover:text-primary p-0 h-auto"
              onClick={handleBrandClick}
              data-editable-href="brandHref"
              data-href={config.brandHref}
            >
              <span data-editable="brandName">{config.brandName}</span>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {config.navItems.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="text-foreground hover:text-primary hover:bg-accent px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => handleNavClick(item.href)}
                  data-editable-href={`navItems[${idx}].href`}
                  data-href={item.href}
                >
                  <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          {config.showCta && (
            <div className="hidden md:block">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleCtaClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {config.showMobileMenu && (
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:text-primary hover:bg-accent"
                    aria-label="Open menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[400px] bg-background border-border"
                >
                  <div className="flex flex-col space-y-6 mt-6">
                    {/* Mobile Brand */}
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        className="text-xl font-bold text-foreground hover:text-primary p-0 h-auto"
                        onClick={handleBrandClick}
                        data-editable-href="brandHref"
                        data-href={config.brandHref}
                      >
                        <span data-editable="brandName">{config.brandName}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-foreground hover:text-primary hover:bg-accent"
                        aria-label="Close menu"
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col space-y-4">
                      {config.navItems.map((item, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          className="justify-start text-foreground hover:text-primary hover:bg-accent px-4 py-3 text-base font-medium"
                          onClick={() => handleNavClick(item.href)}
                          data-editable-href={`navItems[${idx}].href`}
                          data-href={item.href}
                        >
                          <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                        </Button>
                      ))}
                    </div>

                    {/* Mobile CTA */}
                    {config.showCta && (
                      <div className="pt-4 border-t border-border">
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={handleCtaClick}
                          data-editable-href="ctaHref"
                          data-href={config.ctaHref}
                        >
                          <span data-editable="ctaText">{config.ctaText}</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
