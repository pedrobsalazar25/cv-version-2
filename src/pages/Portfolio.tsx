import { useState, useMemo, useEffect } from "react";
import { Search, ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import backgroundImage from "@/assets/background.jpg";
import Navigation from "@/components/Navigation";

interface PortfolioCompany {
  name: string;
  url: string;
  domain: string;
  industry: string;
  industryEs: string;
  description: string;
  descriptionEs: string;
  favicon?: string;
}

const companies: PortfolioCompany[] = [
  {
    name: "Smile Sanctuary",
    url: "https://smilesanctuary.net",
    domain: "smilesanctuary.net",
    industry: "Healthcare",
    industryEs: "Salud",
    description: "Dental clinic offering comprehensive dental care and cosmetic dentistry services",
    descriptionEs: "Clínica dental que ofrece atención dental integral y servicios de odontología estética",
    favicon: "/favicons/smilesanctuary_net.png",
  },
  {
    name: "Marketing Innovations",
    url: "https://marketinginnovations.biz",
    domain: "marketinginnovations.biz",
    industry: "Digital Marketing",
    industryEs: "Marketing Digital",
    description: "Digital marketing agency focused on ROI optimization",
    descriptionEs: "Agencia de marketing digital enfocada en optimización de ROI",
  },
  {
    name: "Debt Relief Help",
    url: "https://debtreliefhelp.org",
    domain: "debtreliefhelp.org",
    industry: "Financial Services",
    industryEs: "Servicios Financieros",
    description: "Debt negotiation and relief services for credit cards, personal loans, collections, and business debt",
    descriptionEs: "Servicios de negociación y alivio de deudas para tarjetas de crédito, préstamos personales, cobros y deudas empresariales",
    favicon: "/favicons/debtreliefhelp_org.png",
  },
  {
    name: "Neotropic Foundation",
    url: "https://neotropicfoundation.org",
    domain: "neotropicfoundation.org",
    industry: "Non-Profit",
    industryEs: "Sin Fines de Lucro",
    description: "Environmental and conservation foundation",
    descriptionEs: "Fundación ambiental y de conservación",
    favicon: "/favicons/neotropicfoundation_org.png",
  },
  {
    name: "Axiom Financial",
    url: "https://axiomfinancialllc.com",
    domain: "axiomfinancialllc.com",
    industry: "Financial Services",
    industryEs: "Servicios Financieros",
    description: "Financial consulting and business expertise services",
    descriptionEs: "Consultoría financiera y servicios de experiencia empresarial",
  },
  {
    name: "Explore Costa Rica",
    url: "https://explorecostarica.net",
    domain: "explorecostarica.net",
    industry: "Travel & Tourism",
    industryEs: "Viajes y Turismo",
    description: "Adventure and relocation services in Costa Rica",
    descriptionEs: "Servicios de aventura y reubicación en Costa Rica",
  },
  {
    name: "Green Power Solar Systems",
    url: "https://greenpowersolarsystems.com",
    domain: "greenpowersolarsystems.com",
    industry: "Renewable Energy",
    industryEs: "Energía Renovable",
    description: "Solar power systems and green energy solutions (Tucson-based)",
    descriptionEs: "Sistemas de energía solar y soluciones de energía verde",
  },
  {
    name: "Webs para Abogados",
    url: "https://websparaabogados.com",
    domain: "websparaabogados.com",
    industry: "Legal Services",
    industryEs: "Servicios Legales",
    description: "Web design services for law firms (Spain & Panama)",
    descriptionEs: "Servicios de diseño web para bufetes de abogados (España y Panamá)",
    favicon: "/favicons/websparaabogados_com.png",
  },
  {
    name: "Vivienda Latina USA",
    url: "https://viviendalatinausa.com",
    domain: "viviendalatinausa.com",
    industry: "Real Estate",
    industryEs: "Bienes Raíces",
    description: "Mortgage and property investment services (Latin America focus)",
    descriptionEs: "Servicios de hipoteca e inversión inmobiliaria (enfoque en Latinoamérica)",
  },
  {
    name: "Medikos",
    url: "https://medikos.net",
    domain: "medikos.net",
    industry: "Healthcare",
    industryEs: "Salud",
    description: "Digital marketing agency specializing in medical and aesthetic practices",
    descriptionEs: "Agencia de marketing digital especializada en prácticas médicas y estéticas",
  },
  {
    name: "Sewage Treatment CR",
    url: "https://sewagetreatmentcr.net",
    domain: "sewagetreatmentcr.net",
    industry: "Environmental Services",
    industryEs: "Servicios Ambientales",
    description: "Compact eco-friendly wastewater treatment systems with LZT technology for homes, businesses, and industries",
    descriptionEs: "Sistemas compactos y ecológicos de tratamiento de aguas residuales con tecnología LZT para hogares, empresas e industrias",
    favicon: "/favicons/sewagetreatmentcr_net.png",
  },
  {
    name: "Mortgage Freedom",
    url: "https://mortgagefreedom.org",
    domain: "mortgagefreedom.org",
    industry: "Financial Services",
    industryEs: "Servicios Financieros",
    description: "Mortgage strategy planning and optimization services to reduce interest waste and optimize cash flow",
    descriptionEs: "Servicios de planificación y optimización de estrategias hipotecarias para reducir gastos de intereses y optimizar flujo de caja",
    favicon: "/favicons/mortgagefreedom_org.png",
  },
  {
    name: "Costa Rica Loan Experts",
    url: "https://costaricaloanexperts.net",
    domain: "costaricaloanexperts.net",
    industry: "Real Estate",
    industryEs: "Bienes Raíces",
    description: "Private lending and real estate investment opportunities in Costa Rica backed by property",
    descriptionEs: "Préstamos privados y oportunidades de inversión inmobiliaria en Costa Rica respaldados por propiedades",
    favicon: "/favicons/costaricaloanexperts_net.png",
  },
  {
    name: "700 Club",
    url: "https://700club.net",
    domain: "700club.net",
    industry: "Credit Services",
    industryEs: "Servicios de Crédito",
    description: "Credit repair and building services including credit analysis, dispute services, and identity theft restoration",
    descriptionEs: "Servicios de reparación y construcción de crédito incluyendo análisis crediticio, servicios de disputas y restauración por robo de identidad",
    favicon: "/favicons/700club_net.png",
  },
];

const Portfolio = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const allLabel = language === "en" ? "All" : "Todos";
  const [activeTab, setActiveTab] = useState(allLabel);

  // Reset tab when language changes
  useEffect(() => {
    setActiveTab(language === "en" ? "All" : "Todos");
  }, [language]);

  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(companies.map(c => language === "en" ? c.industry : c.industryEs))];
    return [allLabel, ...uniqueIndustries];
  }, [language, allLabel]);
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (language === "en" ? company.description : company.descriptionEs).toLowerCase().includes(searchQuery.toLowerCase());

      const industry = language === "en" ? company.industry : company.industryEs;
      const matchesTab = activeTab === allLabel || industry === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab, language, allLabel]);

  return (
    <div
      className="min-h-screen bg-background relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="fixed inset-0 bg-background/85 pointer-events-none" />

      <div className="relative z-10">
        <Navigation />

        <main className="pt-20 md:pt-24 pb-24 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Back button */}
            <button
              onClick={() => navigate("/")}
              className="neo-button px-4 py-2 flex items-center gap-2 text-sm font-medium text-foreground mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === "en" ? "Back" : "Volver"}
            </button>

            {/* Page Title */}
            <div className="bento-item py-4 text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground uppercase tracking-wider">
                {t.portfolio.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {language === "en"
                  ? "Websites I've designed and developed"
                  : "Sitios web que he diseñado y desarrollado"}
              </p>
            </div>

            {/* Search Box */}
            <div className="mb-6">
              <div className="neo-inset flex items-center px-4 py-3 gap-3">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder={language === "en" ? "Search projects..." : "Buscar proyectos..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none w-full text-foreground placeholder:text-muted-foreground text-sm"
                />
              </div>
            </div>

            {/* Industry Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setActiveTab(industry)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                    activeTab === industry
                      ? "neo-inset text-primary"
                      : "neo-raised text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
              {filteredCompanies.length} {language === "en" ? "projects" : "proyectos"}
            </p>

            {/* Company Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.map((company) => (
                <a
                  key={company.domain}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-item group flex flex-col gap-4"
                >
                  {/* Favicon + Name */}
                  <div className="flex items-center gap-3">
                    <div className="neo-inset p-2 rounded-xl shrink-0">
                      <img
                        src={company.favicon || `https://www.google.com/s2/favicons?domain=${company.domain}&sz=32`}
                        alt={company.name}
                        className="w-8 h-8 rounded"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                        {company.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">{company.domain}</p>
                    </div>
                  </div>

                  {/* Industry Badge */}
                  <span className="neo-inset px-3 py-1 text-xs text-muted-foreground uppercase tracking-wider self-start rounded-lg">
                    {language === "en" ? company.industry : company.industryEs}
                  </span>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {language === "en" ? company.description : company.descriptionEs}
                  </p>

                  {/* Visit link */}
                  <div className="flex items-center gap-2 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{language === "en" ? "Visit site" : "Visitar sitio"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="bento-item text-center py-12">
                <p className="text-muted-foreground">
                  {language === "en" ? "No projects found" : "No se encontraron proyectos"}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Portfolio;
