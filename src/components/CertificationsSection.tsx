import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Certification {
  name: string;
  organization: string;
  issued: string;
  credentialId?: string;
}

const certifications: Certification[] = [
  { name: "SEO II", organization: "HubSpot Academy", issued: "Aug 2025", credentialId: "c6f1afaec6184725b33d40cae6c516aa" },
  { name: "Generative AI for Educators Certificate", organization: "Google Career Certificates", issued: "Jul 2025" },
  { name: "SEO", organization: "HubSpot Academy", issued: "Jul 2025", credentialId: "55ca1cc0269a496e806d9f45a8785ccb" },
  { name: "Create Digital Content, Communicate and Collaborate Online", organization: "Cisco", issued: "May 2025" },
  { name: "Introduction to Modern AI", organization: "Cisco", issued: "May 2025" },
  { name: "Digital Marketing Learner", organization: "Certiprof", issued: "Jan 2025" },
  { name: "Display & Video 360 Certification Exam", organization: "Skillshop", issued: "Jan 2025", credentialId: "129247494" },
  { name: "Search Ads 360 Certification Exam", organization: "Skillshop", issued: "Jan 2025", credentialId: "130078382" },
  { name: "Amazon DSP Advanced Certification", organization: "Amazon", issued: "Sep 2024", credentialId: "5767621" },
  { name: "Amazon Video Ads Certification", organization: "Amazon", issued: "Sep 2024", credentialId: "5751220" },
  { name: "CS101: Introduction to Computer Science I", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "3926459847PB" },
  { name: "CS102: Introduction to Computer Science II", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "0078932351PB" },
  { name: "CS105: Introduction to Python", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "7870975210PB" },
  { name: "CS107: C++ Programming", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "9167450411PB" },
  { name: "CS201: Elementary Data Structures", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "8799632974PB" },
  { name: "CS202: Discrete Structures", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "7069833868PB" },
  { name: "CS301: Computer Architecture", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "9815736238PB" },
  { name: "CS302: Software Engineering", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "2510200187PB" },
  { name: "CS401: Operating Systems", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "6400859320PB" },
  { name: "CS402: Computer Communications and Networks", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "6749079538PB" },
  { name: "CS403: Introduction to Modern Database Systems", organization: "Saylor Academy", issued: "Sep 2024", credentialId: "2303280939PB" },
  { name: "Content Marketing", organization: "HubSpot Academy", issued: "Sep 2024", credentialId: "f234fe4670d04bffbcbc89213762fb5c" },
  { name: "Data Engineering Professional", organization: "ITRONIX SOLUTION", issued: "Sep 2024", credentialId: "00059673" },
  { name: "Foundations Of Business And Entrepreneurship", organization: "SkillFront", issued: "Sep 2024", credentialId: "62669878085267" },
  { name: "ISO 9001 Quality Management Systems Associate", organization: "SkillFront", issued: "Sep 2024", credentialId: "46583781320334" },
  { name: "ISO/IEC 27001 Information Security Associate", organization: "SkillFront", issued: "Sep 2024", credentialId: "65147311226930" },
  { name: "Inbound", organization: "HubSpot Academy", issued: "Sep 2024", credentialId: "d39fcdd7baa746018f2851d640208663" },
  { name: "Inbound Marketing", organization: "HubSpot Academy", issued: "Sep 2024", credentialId: "ee7785eb6f5444518da69873c8ac50ce" },
  { name: "Introduction to Data Science", organization: "Cisco", issued: "Sep 2024" },
  { name: "Introduction to IoT", organization: "Cisco", issued: "Sep 2024", credentialId: "20240908" },
  { name: "Mobile App Campaign Badge", organization: "X", issued: "Sep 2024", credentialId: "334844120" },
  { name: "Networking Basics", organization: "Cisco", issued: "Sep 2024" },
  { name: "Social Media Marketing", organization: "HubSpot Academy", issued: "Sep 2024", credentialId: "97610b1333914b1cac58d8adf097b038" },
  { name: "CS406: Information Security Certification", organization: "Saylor Academy", issued: "Aug 2024", credentialId: "0526573196PB" },
  { name: "Google Analytics for Power Users", organization: "Google", issued: "Aug 2024" },
  { name: "Introduction to Cybersecurity", organization: "Cisco", issued: "Aug 2024" },
  { name: "Advanced Google Analytics", organization: "Google Skillshop", issued: "Sep 2023" },
  { name: "Twitter Ads Manager Fundamentals Badge", organization: "Twitter", issued: "Sep 2023", credentialId: "276793511" },
  { name: "Twitter for Creatives Badge", organization: "Twitter", issued: "Sep 2023", credentialId: "276792664" },
  { name: "App Install Campaign Specialist", organization: "Twitter", issued: "Aug 2023", credentialId: "273627507" },
  { name: "Cross-Border Advertising", organization: "Twitter", issued: "Aug 2023", credentialId: "273576199" },
  { name: "Google Analytics for Beginners", organization: "Google Skillshop", issued: "Aug 2023" },
  { name: "Launch and Connect Badge", organization: "Twitter", issued: "Aug 2023", credentialId: "274734503" },
  { name: "Web Traffic Campaigns Specialist", organization: "Twitter", issued: "Aug 2023", credentialId: "273575836" },
  { name: "Search Engine Marketing Course", organization: "Digital Marketing Certificate", issued: "Jul 2023", credentialId: "CERT002179932-EMI" },
  { name: "SEO certification course", organization: "Digital Marketing Certificate", issued: "Apr 2023", credentialId: "CERT002179929-EMI" },
  { name: "Digital Citizenship and Safety Course", organization: "Digital Marketing Certificate", issued: "Apr 2023", credentialId: "CERT002179928-EMI" },
  { name: "Digital Marketing Certificate", organization: "Digital Marketing Certificate", issued: "Apr 2023", credentialId: "CERT002179927-EMI" },
  { name: "Email Marketing", organization: "HubSpot Academy", issued: "Feb 2023", credentialId: "2c2b9fe2debe4d1fa9a2b4b3dbd61a12" },
  { name: "Google Ads Display Certification", organization: "Google Skillshop", issued: "Feb 2023", credentialId: "168235511" },
  { name: "Google Ads Search Certification", organization: "Google Skillshop", issued: "Feb 2023", credentialId: "168236206" },
  { name: "Google Ads Video Certification", organization: "Google Skillshop", issued: "Feb 2023", credentialId: "168236999" },
  { name: "Google Digital Garage", organization: "Google", issued: "Feb 2023" },
  { name: "Google Tag Manager Fundamentals", organization: "Google Skillshop", issued: "Aug 2023" },
  { name: "HubSpot CMS for Developers", organization: "HubSpot Academy", issued: "Feb 2023", credentialId: "60c44d91a3a74328b270b6c1c0e41ab0" },
  { name: "Inbound Sales", organization: "HubSpot Academy", issued: "Feb 2023", credentialId: "2a9f91e56e18418e9d1a9f6a0cc5c85f" },
  { name: "Introduction to IT & Cybersecurity", organization: "Cisco", issued: "Feb 2023" },
  { name: "IT Essentials", organization: "Cisco", issued: "Feb 2023" },
  { name: "Media Buying & Planning", organization: "Google Skillshop", issued: "Feb 2023", credentialId: "168236175" },
  { name: "Microsoft Advertising Certified Professional", organization: "Microsoft", issued: "Aug 2023" },
  { name: "Microsoft Advertising Search Certification", organization: "Microsoft", issued: "Aug 2023" },
  { name: "Microsoft Advertising Shopping Certification", organization: "Microsoft", issued: "Aug 2023" },
  { name: "Mobile Experience", organization: "Google Skillshop", issued: "Aug 2023", credentialId: "103940704" },
  { name: "PPC Fundamentals", organization: "Semrush", issued: "Sep 2023", credentialId: "322585" },
  { name: "SEO Fundamentals Course", organization: "Semrush", issued: "Sep 2023", credentialId: "320306" },
  { name: "Semrush Site Audit Course", organization: "Semrush", issued: "Sep 2023", credentialId: "320348" },
  { name: "Semrush Technical SEO Course", organization: "Semrush", issued: "Sep 2023", credentialId: "322591" },
  { name: "Twitter Video Ads Specialist Badge", organization: "Twitter", issued: "Sep 2023", credentialId: "276793933" },
  { name: "Amazon Ads Retail Certification", organization: "Amazon", issued: "Aug 2023", credentialId: "3930965" },
  { name: "Campaign Manager 360", organization: "Google Skillshop", issued: "Aug 2023", credentialId: "201565225" },
  { name: "Google Ads AI-Powered Performance Ads Assessment", organization: "Google Skillshop", issued: "Aug 2023", credentialId: "192266618" },
  { name: "Google Analytics Individual Qualification", organization: "Google Skillshop", issued: "Aug 2023", credentialId: "103952449" },
  { name: "Yandex.Metrica Expert", organization: "Yandex", issued: "Aug 2023", credentialId: "253732" },
];

// Organization logo URLs (using real favicon/logo URLs)
const getOrgLogo = (org: string): string => {
  const logos: Record<string, string> = {
    "HubSpot Academy": "https://www.hubspot.com/favicon.ico",
    "Google Career Certificates": "https://www.google.com/favicon.ico",
    "Google": "https://www.google.com/favicon.ico",
    "Google Skillshop": "https://www.google.com/favicon.ico",
    "Cisco": "https://www.cisco.com/favicon.ico",
    "Certiprof": "https://certiprof.com/cdn/shop/files/favicon_32x32.png",
    "Skillshop": "https://www.google.com/favicon.ico",
    "Amazon": "https://www.amazon.com/favicon.ico",
    "Saylor Academy": "/favicons/saylor_academy.png",
    "ITRONIX SOLUTION": "https://itronixsolution.com/favicon.ico",
    "SkillFront": "https://www.skillfront.com/favicon.ico",
    "X": "https://x.com/favicon.ico",
    "Twitter": "https://x.com/favicon.ico",
    "Digital Marketing Certificate": "https://digitalmarketinginstitute.com/favicon.ico",
    "Microsoft": "https://www.microsoft.com/favicon.ico",
    "Semrush": "https://www.semrush.com/favicon.ico",
    "Yandex": "https://yandex.com/favicon.ico",
  };
  return logos[org] || "";
};

const CertificationsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const { t } = useLanguage();

  const filteredCerts = useMemo(() => {
    if (!searchQuery) return certifications;
    const query = searchQuery.toLowerCase();
    return certifications.filter(
      cert =>
        cert.name.toLowerCase().includes(query) ||
        cert.organization.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const visibleCerts = showAll ? filteredCerts : filteredCerts.slice(0, 8);
  const hasMore = filteredCerts.length > 8;

  return (
    <section id="certifications" className="px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="bento-item py-4 text-center mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t.certifications.title}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Box Card */}
          <div className="md:col-span-12 bento-item">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-muted-foreground text-sm">
                {filteredCerts.length} {t.certifications.count} {searchQuery && `${t.certifications.matching} "${searchQuery}"`}
              </p>
              <div className="neo-inset p-1 flex-1 max-w-md">
                <div className="flex items-center gap-3 px-4 py-2">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t.certifications.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-foreground placeholder:text-muted-foreground text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Grid */}
          {visibleCerts.length === 0 ? (
            <div className="md:col-span-12 bento-item text-center text-muted-foreground">
              {t.certifications.noResults} "{searchQuery}"
            </div>
          ) : (
            visibleCerts.map((cert, index) => (
              <div
                key={index}
                className="md:col-span-6 lg:col-span-4 bento-item animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="neo-inset w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {getOrgLogo(cert.organization) ? (
                      <img 
                        src={getOrgLogo(cert.organization)} 
                        alt={cert.organization}
                        className="w-7 h-7 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<span class="text-xl font-bold text-primary">${cert.organization.charAt(0)}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-xl font-bold text-primary">{cert.organization.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm line-clamp-2">{cert.name}</h3>
                    <p className="text-sm text-primary">{cert.organization}</p>
                    <p className="text-xs text-muted-foreground">{cert.issued}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Show More/Less Button */}
        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="neo-button px-6 py-3 flex items-center gap-2 text-foreground font-medium"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>{t.certifications.collapse}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>{t.certifications.showAll} ({filteredCerts.length})</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;