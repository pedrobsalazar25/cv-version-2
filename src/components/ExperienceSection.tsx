import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Experience {
  title: string;
  company: string;
  period: string;
  type?: string;
  description: string;
  bullets?: string[];
}

const experiences: Experience[] = [
  {
    title: "SEO & Web Content Specialist",
    company: "Origami Solutions",
    period: "Aug 2025 – Present",
    type: "On-site",
    description: "Worked as an SEO and Web Content Specialist supporting multiple client accounts across different industries. My work focused on maintaining and updating client websites, creating content aligned with SEO best practices, and preparing performance reports with actionable insights.",
    bullets: [
      "Performed website maintenance, content updates, on-page SEO improvements, and technical checks to improve site visibility and usability.",
      "Created SEO-driven content for landing pages, blog posts, and product descriptions following brand voice and keyword research.",
      "Prepared SEO analysis reports, keyword tracking summaries, and competitor audits to guide client marketing decisions.",
      "Supported Google Ads campaigns by reviewing landing page performance, setting up basic tracking, and aligning content with campaign goals."
    ]
  },
  {
    title: "Freelance Web Developer",
    company: "Freelance",
    period: "2023 – Present",
    description: "As a freelance Web and Android Developer, I build fast, reliable, and user-focused applications for small businesses, startups, and personal clients. I collaborate with founders, designers, and non-technical stakeholders to translate ideas into well-structured digital products."
  },
  {
    title: "Developer",
    company: "AIMHII",
    period: "2023",
    description: "At AIMHII, I helped build and refine digital products focused on delivering clean interfaces and smooth user experiences. I collaborated with cross-functional teams to clarify requirements, plan feature rollouts, and ensure quality across releases."
  },
  {
    title: "College Professor — IT",
    company: "Universidad de Oriente",
    period: "2020 – 2022",
    description: "Full-time professor teaching development, networking, and technical fundamentals. Designed hands-on labs and delivered real-world IT examples."
  },
  {
    title: "English Professor",
    company: "British School of Languages",
    period: "2014 – 2019",
    description: "Taught English to students across levels, designed curricula, and tracked learner progress with structured assessments."
  },
  {
    title: "English Teacher",
    company: "National Institute of English",
    period: "2012 – 2014",
    description: "Delivered group and 1:1 instruction, improved lesson planning, and supported students with practical language use."
  },
  {
    title: "Radio Producer",
    company: "Oceanica Radio Station",
    period: "2009 – 2010",
    description: "Produced segments, coordinated programming, and supported live broadcast operations."
  },
  {
    title: "Content Writer & Marketing Assistant",
    company: "Gobo Latino",
    period: "2008 – 2009",
    description: "Wrote content and supported marketing initiatives with research and publishing workflows."
  },
  {
    title: "Computer Lab Manager",
    company: "Universidad de Oriente",
    period: "2008 – 2009",
    description: "Maintained lab systems, managed access, and supported students and faculty with technical issues."
  },
  {
    title: "IT Technician",
    company: "Universidad de Oriente",
    period: "2008 – 2009",
    description: "Provided technical support across university systems, including hardware and network troubleshooting."
  },
  {
    title: "Technical Support",
    company: "Oceanica Radio Station",
    period: "2007 – 2008",
    description: "Installed DMX consoles, trained staff on broadcasting equipment, and supported live audio workflows."
  },
  {
    title: "Network Technician",
    company: "Intersound Global Trading",
    period: "2006 – 2007",
    description: "Supported the installation and configuration of networking systems for the Estadio Monumental sound infrastructure."
  }
];

const ExperienceCard = ({ experience: exp, index, t }: { experience: Experience; index: number; t: any }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bento-item animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex-1">
        <h3 className="font-bold text-foreground">{exp.title}</h3>
        <p className="text-primary font-medium text-sm">{exp.company}</p>
        <p className="text-xs text-muted-foreground mb-3">
          {exp.period} {exp.type && `• ${exp.type}`}
        </p>
        
        {!showMore ? (
          <>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{exp.description}</p>
            {(exp.description.length > 150 || exp.bullets) && (
              <button 
                onClick={() => setShowMore(true)}
                className="text-primary text-sm mt-3 hover:gap-3 transition-all flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                {t.experience.showMore}
              </button>
            )}
          </>
        ) : (
          <>
            <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
            {exp.bullets && (
              <ul className="mt-3 space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
            <button 
              onClick={() => setShowMore(false)}
              className="text-primary text-sm mt-3 hover:underline flex items-center gap-2"
            >
              <ChevronUp className="w-4 h-4" />
              {t.experience.showLess}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();
  const visibleExperiences = expanded ? experiences : experiences.slice(0, 4);

  return (
    <section id="experience" className="px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="bento-item py-4 text-center mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t.experience.title}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleExperiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} t={t} />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="neo-button px-6 py-3 flex items-center gap-2 text-foreground font-medium"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>{t.experience.showLess}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>{t.experience.showMore}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;