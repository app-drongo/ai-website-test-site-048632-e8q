'use client';

import { Separator } from '@/components/ui/separator';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  copyright: '© 2024 Test Site. All rights reserved.',
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  contactEmail: 'hello@testsite.com',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${config.contactEmail}`;
  };

  return (
    <footer id="footer" className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            <span data-editable="copyright">{config.copyright}</span>
          </div>

          {/* Legal Links and Contact */}
          <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
            {/* Legal Links */}
            <div className="flex items-center space-x-4">
              {config.legalLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  data-editable-href={`legalLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                </button>
              ))}
            </div>

            {/* Separator */}
            <Separator orientation="vertical" className="hidden sm:block h-4" />

            {/* Contact Email */}
            <button
              onClick={handleEmailClick}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              data-editable-href="contactEmail"
              data-href={`mailto:${config.contactEmail}`}
            >
              <span data-editable="contactEmail">{config.contactEmail}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
