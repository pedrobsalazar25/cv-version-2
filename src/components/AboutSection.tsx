import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <section id="about" className="px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Section Header */}
          <div className="md:col-span-12 bento-item py-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t.about.title}
            </p>
          </div>

          {/* Main About Card */}
          <div className="md:col-span-5 bento-item">
            <p className="text-muted-foreground leading-relaxed">
              {t.about.short}
            </p>
            
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
            >
              <ArrowRight className="w-4 h-4" />
              <span>{expanded ? t.about.showLess : t.about.showMore}</span>
            </button>
          </div>

          {/* Extended Info Card */}
          <div className="md:col-span-7 bento-item">
            <p className="text-sm text-muted-foreground mb-2">→ {t.about.showMore}</p>
            
            {expanded ? (
              <div className="animate-fade-in space-y-4 text-muted-foreground">
                {t.about.extended.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="text-foreground/60 leading-relaxed line-clamp-3">
                {t.about.extended.split('\n\n')[0]}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;