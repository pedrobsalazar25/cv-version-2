import { useState } from "react";
import { Linkedin, Copy, Check, Phone, Mail, ChevronDown, Download } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const {
    t,
    language
  } = useLanguage();
  const cvUrl = language === "en" ? "http://pedrobarrios.com/Download/Pedro%20Barrios%20CV%20en.pdf" : "http://pedrobarrios.com/Download/Curriculum%20espanol.pdf";
  const contactInfo = `Pedro Barrios
${t.hero.role}
Phone: +34 604 065 849
Email: pedrorafaelbarriossalazar@gmail.com
LinkedIn: https://www.linkedin.com/in/pedro-barrios-759986289/`;
  const handleCopy = async () => {
    await navigator.clipboard.writeText(contactInfo);
    setCopied(true);
    toast.success(t.hero.copied);
    setTimeout(() => setCopied(false), 2000);
  };
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="min-h-screen flex items-center justify-center px-4 py-20 pb-28 md:pb-20">
      <div className="max-w-6xl w-full">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Main Title Card - Large */}
          <div className="md:col-span-7 bento-item relative overflow-hidden min-h-[280px] flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                Portfolio • Web Developer
              </p>
              <h1 className="text-4xl md:text-6xl leading-tight mb-4" style={{
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
                <span className="block text-foreground/60 font-light tracking-tight">PEDRO</span>
                <span className="block text-primary font-bold  text-glow">Barrios</span>
              </h1>
            </div>
            <div className="flex gap-3">
              <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="neo-button px-5 py-2.5 text-sm font-medium text-foreground flex items-center gap-2">
                <Download className="w-4 h-4" />
                {t.hero.downloadCV}
              </a>
              <button onClick={handleCopy} className="neo-button px-5 py-2.5 text-sm font-medium text-foreground flex items-center gap-2">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? t.hero.copied : t.hero.copyContact}
              </button>
            </div>
          </div>

          {/* Description Card */}
          <div className="md:col-span-5 bento-item flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground" style={{
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
              {t.hero.role.toUpperCase()}...
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {t.about?.short || "Full-Stack Developer specializing in creating modern, responsive web applications with cutting-edge technologies."}
            </p>
          </div>

          {/* Avatar Card */}
          <div className="md:col-span-3 bento-item flex items-center justify-center min-h-[180px]">
            <div className="neo-inset w-24 h-24 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-primary" style={{
              fontFamily: "'Space Grotesk', sans-serif"
            }}>PB</span>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="md:col-span-5 bento-item">
            <div className="space-y-4">
              <a href="tel:+34604065849" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group">
                <div className="neo-inset p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+34 604 065 849</span>
              </a>
              <a href="mailto:pedrorafaelbarriossalazar@gmail.com" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group">
                <div className="neo-inset p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm truncate">pedrorafaelbarriossalazar@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/pedro-barrios-759986289/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group">
                <div className="neo-inset p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="text-sm">LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Card */}
          <div className="md:col-span-4 bento-item flex items-center justify-center">
            <p className="text-muted-foreground text-sm text-center">
              → {t.about?.showMore || "Explore more below"}
            </p>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <button onClick={scrollToAbout} className="neo-button px-8 py-3 flex items-center gap-2 text-foreground font-medium uppercase tracking-wider text-sm">
            {t.nav?.about || "SCROLL"}
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>;
};
export default HeroSection;