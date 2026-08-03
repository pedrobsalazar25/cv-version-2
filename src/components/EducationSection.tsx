import { GraduationCap } from "lucide-react";
import iupsmLogo from "@/assets/iupsm-logo.jpeg";
import { useLanguage } from "@/contexts/LanguageContext";

const EducationSection = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="bento-item py-4 text-center mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t.education.title}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Education Card */}
          <div className="md:col-span-8 bento-item">
            <div className="flex items-start gap-6">
              <div className="neo-inset p-3 rounded-xl flex-shrink-0">
                <img
                  src={iupsmLogo}
                  alt="Instituto Universitario Politécnico Santiago Mariño"
                  className="w-14 h-14 object-contain rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-lg">
                  Instituto Universitario Politécnico Santiago Mariño
                </h3>
                <p className="text-primary font-medium">{t.education.degree}</p>
                <p className="text-sm text-muted-foreground mt-2">Aug 2011 – Jan 2024</p>
              </div>
            </div>
          </div>

          {/* Icon Card */}
          <div className="md:col-span-4 bento-item flex items-center justify-center">
            <div className="neo-inset p-6 rounded-2xl">
              <GraduationCap className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;