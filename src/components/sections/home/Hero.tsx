'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  badge: 'New Launch',
  title: 'Clarity Through Simplicity',
  subtitle:
    'Experience the power of minimal design that speaks volumes. Clean, focused, and purposeful - where every element serves a clear intention.',
  description:
    'Streamlined solutions that eliminate the unnecessary and amplify what truly matters. Professional, refined, and built for those who value essential functionality over complexity.',
  ctaText: 'Get Started',
  ctaHref: '/start',
  secondaryCtaText: 'Learn More',
  secondaryCtaHref: '/about',
  features: ['Clean & Focused Design', 'Essential Functionality', 'Professional Results'],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section
      id="hero"
      className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="mb-8">
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground px-4 py-2 text-sm font-medium rounded-full border border-border"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
            <span
              data-editable="title"
              className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
            >
              {config.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            <span data-editable="description">{config.description}</span>
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {config.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground"
              >
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span data-editable={`features[${idx}]`}>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handlePrimaryClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105 group"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>

            <Button
              onClick={handleSecondaryClick}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
              variant="outline"
              size="lg"
              className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground px-8 py-3 text-base font-medium rounded-lg transition-all duration-200"
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Subtle Visual Elements */}
          <div className="mt-16 flex justify-center gap-8 opacity-30">
            <Target
              className="w-6 h-6 text-muted-foreground animate-pulse"
              style={{ animationDelay: '0s' }}
            />
            <Zap
              className="w-6 h-6 text-muted-foreground animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <Sparkles
              className="w-6 h-6 text-muted-foreground animate-pulse"
              style={{ animationDelay: '2s' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
