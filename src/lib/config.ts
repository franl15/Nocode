export const SITE_CONFIG = {
  brandName: "NoCode",
  tagline: "Software · Automatizaciones IA · Páginas Web",
  whatsappNumber: "573219212455",
  instagramHandle: "@nocode.studio",
  instagramUrl: "https://instagram.com/nocode.studio",
  email: "hola@nocode.studio", // Actualiza aquí cuando crees tu correo definitivo
};

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
