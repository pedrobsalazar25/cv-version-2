import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

interface Translations {
  nav: {
    about: string;
    experience: string;
    education: string;
    certifications: string;
    portfolio: string;
    contact: string;
  };
  hero: {
    role: string;
    copyContact: string;
    copied: string;
    printPdf: string;
    downloadCV: string;
  };
  about: {
    title: string;
    showMore: string;
    showLess: string;
    short: string;
    extended: string;
  };
  experience: {
    title: string;
    showMore: string;
    showLess: string;
  };
  education: {
    title: string;
    degree: string;
  };
  certifications: {
    title: string;
    searchPlaceholder: string;
    showAll: string;
    collapse: string;
    noResults: string;
    count: string;
    matching: string;
  };
  portfolio: {
    title: string;
  };
  contact: {
    title: string;
    fullName: string;
    phoneNumber: string;
    message: string;
    call: string;
    sendEmail: string;
    whatsapp: string;
    errorName: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      role: "Web Developer & SEO Specialist",
      copyContact: "Copy contact",
      copied: "Copied!",
      printPdf: "Print / PDF",
      downloadCV: "Download CV",
    },
    about: {
      title: "About",
      showMore: "Show more",
      showLess: "Show less",
      short: "Web Developer and SEO Specialist with a background in digital marketing, content strategy, and education. Over the past several years, I've built responsive websites, optimized content for search performance, and supported marketing teams with the technical foundation they need to run effective campaigns. I enjoy helping businesses strengthen their online presence through clean development, clear communication, and intentional design.",
      extended: `My work spans website maintenance, landing page creation, SEO analysis, content development, and analytics setup. I collaborate closely with founders, designers, marketers, and non-technical stakeholders to translate ideas into well-structured, high-performing digital products. Whether I'm improving site performance, structuring content for clarity, configuring tracking tools, or supporting ad campaigns, I focus on making every deliverable both effective and easy to use.

In addition to my technical work, I have several years of experience as a college professor, teaching programming, networking, and technical communication. I've also taught English at different levels, which has strengthened my ability to explain complex concepts clearly, manage diverse groups, and support teams through strong communication.

I'm open to remote opportunities, freelance projects, and collaborations where I can contribute as a developer, SEO specialist, or hybrid digital creator. If you're working on something meaningful or need support on the technical and content side of your digital presence, let's connect.`,
    },
    experience: {
      title: "Work Experience",
      showMore: "Show more",
      showLess: "Show less",
    },
    education: {
      title: "Education",
      degree: "Bachelor's degree, Civil Engineering",
    },
    certifications: {
      title: "Certifications",
      searchPlaceholder: "Looking for certifications...",
      showAll: "Show all",
      collapse: "Collapse",
      noResults: "No certifications found matching",
      count: "certifications",
      matching: "matching",
    },
    portfolio: {
      title: "Portfolio",
    },
    contact: {
      title: "Contact",
      fullName: "Full name",
      phoneNumber: "Phone number",
      message: "Your message...",
      call: "Call",
      sendEmail: "Send Email",
      whatsapp: "WhatsApp",
      errorName: "Please enter your full name",
    },
  },
  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      education: "Educación",
      certifications: "Certificaciones",
      portfolio: "Portafolio",
      contact: "Contacto",
    },
    hero: {
      role: "Desarrollador Web y Especialista en SEO",
      copyContact: "Copiar contacto",
      copied: "¡Copiado!",
      printPdf: "Imprimir / PDF",
      downloadCV: "Descargar CV",
    },
    about: {
      title: "Sobre mí",
      showMore: "Ver más",
      showLess: "Ver menos",
      short: "Desarrollador Web y Especialista en SEO con experiencia en marketing digital, estrategia de contenido y educación. Durante los últimos años, he construido sitios web responsivos, optimizado contenido para rendimiento en buscadores y apoyado a equipos de marketing con la base técnica necesaria para ejecutar campañas efectivas. Disfruto ayudando a empresas a fortalecer su presencia en línea a través de un desarrollo limpio, comunicación clara y diseño intencional.",
      extended: `Mi trabajo abarca mantenimiento de sitios web, creación de landing pages, análisis SEO, desarrollo de contenido y configuración de analítica. Colaboro estrechamente con fundadores, diseñadores, especialistas en marketing y stakeholders no técnicos para traducir ideas en productos digitales bien estructurados y de alto rendimiento. Ya sea mejorando el rendimiento del sitio, estructurando contenido para mayor claridad, configurando herramientas de seguimiento o apoyando campañas publicitarias, me enfoco en hacer que cada entrega sea efectiva y fácil de usar.

Además de mi trabajo técnico, tengo varios años de experiencia como profesor universitario, enseñando programación, redes y comunicación técnica. También he enseñado inglés en diferentes niveles, lo que ha fortalecido mi capacidad para explicar conceptos complejos con claridad, gestionar grupos diversos y apoyar equipos a través de una comunicación sólida.

Estoy abierto a oportunidades remotas, proyectos freelance y colaboraciones donde pueda contribuir como desarrollador, especialista en SEO o creador digital híbrido. Si estás trabajando en algo significativo o necesitas apoyo en el lado técnico y de contenido de tu presencia digital, conectemos.`,
    },
    experience: {
      title: "Experiencia Laboral",
      showMore: "Ver más",
      showLess: "Ver menos",
    },
    education: {
      title: "Educación",
      degree: "Licenciatura en Ingeniería Civil",
    },
    certifications: {
      title: "Certificaciones",
      searchPlaceholder: "Buscando certificaciones...",
      showAll: "Ver todas",
      collapse: "Colapsar",
      noResults: "No se encontraron certificaciones para",
      count: "certificaciones",
      matching: "coincidentes con",
    },
    portfolio: {
      title: "Portafolio",
    },
    contact: {
      title: "Contacto",
      fullName: "Nombre completo",
      phoneNumber: "Número de teléfono",
      message: "Tu mensaje...",
      call: "Llamar",
      sendEmail: "Enviar Email",
      whatsapp: "WhatsApp",
      errorName: "Por favor ingresa tu nombre completo",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
