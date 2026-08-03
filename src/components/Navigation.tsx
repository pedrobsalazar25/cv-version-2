import { useState, useEffect } from "react";
import { MessageCircle, User, Briefcase, FolderOpen, Mail, Globe, Download, Linkedin, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logoBlack from "@/assets/logo-black.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hero");
  const { language, setLanguage, t } = useLanguage();

  const whatsappUrl = "https://wa.me/34604065849";
  const cvUrl = language === "en" 
    ? "http://pedrobarrios.com/Download/Pedro%20Barrios%20CV%20en.pdf" 
    : "http://pedrobarrios.com/Download/Curriculum%20espanol.pdf";

  const mobileNavItems = [
    { id: "whatsapp", icon: MessageCircle, href: whatsappUrl, isExternal: true },
    { id: "about", icon: User, href: "#about" },
    { id: "experience", icon: Briefcase, href: "#experience" },
    { id: "portfolio", icon: FolderOpen, href: "/portfolio", isRoute: true },
    { id: "contact", icon: Mail, href: "#contact" },
  ];

  const desktopNavItems = [
    { id: "about", label: "about", href: "#about" },
    { id: "experience", label: "experience", href: "#experience" },
    { id: "portfolio", label: "portfolio", href: "/portfolio", isRoute: true },
    { id: "contact", label: "contact", href: "#contact" },
  ];

  const handleNavClick = (id: string, href: string, isRoute?: boolean) => {
    setActiveSection(id);
    if (isRoute) {
      navigate(href);
    } else if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "education", "certifications", "portfolio", "contact"];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.querySelector(section === "hero" ? "section:first-of-type" : `#${section}`);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop/Tablet Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="neo-raised border-b border-foreground/5">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* Logo & Name */}
            <button 
              onClick={() => handleNavClick("hero", "#")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src={logoBlack} alt="Pedro Barrios Logo" className="w-8 h-8 object-contain" />
              <span className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                PEDRO <span className="text-primary">Barrios</span>
              </span>
            </button>

            {/* Center Navigation Links */}
            <div className="flex items-center gap-1">
              {desktopNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href, item.isRoute)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "neo-inset text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {t.nav[item.label as keyof typeof t.nav] || item.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+34604065849"
                className="neo-button px-3 py-2 flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">{t.contact.call}</span>
              </a>
              <a
                href="https://www.linkedin.com/in/pedro-barrios-759986289/"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-button px-3 py-2 flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden lg:inline">LinkedIn</span>
              </a>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-button px-3 py-2 flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Download className="w-4 h-4" />
                <span className="hidden lg:inline">{t.hero.downloadCV}</span>
              </a>
              <button
                onClick={toggleLanguage}
                className="neo-button px-3 py-2 flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Globe className="w-4 h-4" />
                <span>{language === "en" ? "ES" : "EN"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop/Tablet Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-background/95 backdrop-blur-md border-t border-foreground/5 px-2 py-2 safe-area-bottom">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {mobileNavItems.map((item) => (
              item.isExternal ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-2 rounded-xl text-green-500 hover:text-green-400 transition-all duration-200"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">WhatsApp</span>
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href, (item as any).isRoute)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-primary neo-inset"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">
                    {t.nav[item.id as keyof typeof t.nav] || item.id}
                  </span>
                </button>
              )
            ))}
            {/* Language Toggle in Bottom Nav */}
            <button
              onClick={toggleLanguage}
              className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <Globe className="w-5 h-5" />
              <span className="text-[10px] font-medium">{language === "en" ? "ES" : "EN"}</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;