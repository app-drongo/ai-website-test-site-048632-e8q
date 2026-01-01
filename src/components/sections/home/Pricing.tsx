'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the perfect plan for your needs. Upgrade or downgrade at any time.',
  monthlyLabel: 'Monthly',
  yearlyLabel: 'Yearly',
  yearlyDiscount: 'Save 20%',
  plans: [
    {
      name: 'Basic',
      monthlyPrice: 9,
      yearlyPrice: 86,
      description: 'Perfect for individuals and small projects',
      features: [
        'Up to 5 projects',
        '2 team members',
        '10GB storage',
        'Email support',
        'Basic analytics',
      ],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=basic',
      popular: false,
    },
    {
      name: 'Pro',
      monthlyPrice: 29,
      yearlyPrice: 278,
      description: 'Best for growing teams and businesses',
      features: [
        'Unlimited projects',
        '10 team members',
        '100GB storage',
        'Priority support',
        'Advanced analytics',
        'Custom integrations',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 99,
      yearlyPrice: 950,
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited everything',
        'Unlimited team members',
        '1TB storage',
        '24/7 phone support',
        'Custom analytics',
        'SSO & advanced security',
        'Dedicated account manager',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
      popular: false,
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
            >
              <span data-editable="monthlyLabel">{config.monthlyLabel}</span>
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
              >
                <span data-editable="yearlyLabel">{config.yearlyLabel}</span>
              </span>
              {isYearly && (
                <Badge variant="secondary" className="text-xs">
                  <span data-editable="yearlyDiscount">{config.yearlyDiscount}</span>
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative border transition-all duration-200 hover:shadow-lg ${
                plan.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-xl font-semibold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
