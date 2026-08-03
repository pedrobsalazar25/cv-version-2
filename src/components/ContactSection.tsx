import { useState } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    comments: "",
  });
  const { t } = useLanguage();

  const phoneNumber = "+34604065849";
  const email = "pedrorafaelbarriossalazar@gmail.com";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateWhatsAppMessage = () => {
    const message = `Hello Pedro!

My name is ${formData.fullName || "[Your Name]"}.
Phone: ${formData.phoneNumber || "[Not provided]"}

Message:
${formData.comments || "[No message]"}

I found your resume and would like to connect!`;
    return encodeURIComponent(message);
  };

  const handleWhatsApp = () => {
    if (!formData.fullName.trim()) {
      toast.error(t.contact.errorName);
      return;
    }
    const url = `https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`;
    window.open(url, "_blank");
  };

  const handleEmail = () => {
    if (!formData.fullName.trim()) {
      toast.error(t.contact.errorName);
      return;
    }
    const subject = encodeURIComponent(`Contact from ${formData.fullName}`);
    const body = encodeURIComponent(`Hello Pedro,

My name is ${formData.fullName}.
Phone: ${formData.phoneNumber || "Not provided"}

${formData.comments}`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
  };

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, "_self");
  };

  return (
    <section id="contact" className="px-4 py-16 md:py-24 pb-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Section Header */}
          <div className="md:col-span-12 bento-item py-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t.contact.title}
            </p>
          </div>

          {/* Form Card */}
          <div className="md:col-span-7 bento-item">
            <div className="space-y-4">
              {/* Full Name */}
              <div className="neo-inset">
                <input
                  type="text"
                  name="fullName"
                  placeholder={t.contact.fullName}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="neo-input"
                />
              </div>

              {/* Phone Number */}
              <div className="neo-inset">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder={t.contact.phoneNumber}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="neo-input"
                />
              </div>

              {/* Comments */}
              <div className="neo-inset">
                <textarea
                  name="comments"
                  placeholder={t.contact.message}
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={4}
                  className="neo-input resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons Card */}
          <div className="md:col-span-5 bento-item flex flex-col justify-center gap-4">
            <button
              onClick={handleCall}
              className="neo-button w-full px-6 py-4 flex items-center justify-center gap-3 text-foreground font-medium"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span>{t.contact.call}</span>
            </button>

            <button
              onClick={handleEmail}
              className="neo-button w-full px-6 py-4 flex items-center justify-center gap-3 text-foreground font-medium"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span>{t.contact.sendEmail}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="neo-button w-full px-6 py-4 flex items-center justify-center gap-3 text-foreground font-medium"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              <span>{t.contact.whatsapp}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;