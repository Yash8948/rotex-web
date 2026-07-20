import type { IconType } from "react-icons";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
  FaWhatsapp,
  FaTiktok,
  FaPinterestP,
  FaThreads,
} from "react-icons/fa6";

export type SocialPlatform = { id: string; label: string; icon: IconType };

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { id: "linkedin", label: "LinkedIn", icon: FaLinkedinIn },
  { id: "instagram", label: "Instagram", icon: FaInstagram },
  { id: "facebook", label: "Facebook", icon: FaFacebookF },
  { id: "youtube", label: "YouTube", icon: FaYoutube },
  { id: "twitter", label: "X (Twitter)", icon: FaXTwitter },
  { id: "whatsapp", label: "WhatsApp", icon: FaWhatsapp },
  { id: "tiktok", label: "TikTok", icon: FaTiktok },
  { id: "pinterest", label: "Pinterest", icon: FaPinterestP },
  { id: "threads", label: "Threads", icon: FaThreads },
];

export const SOCIAL_PLATFORM_MAP: Record<string, SocialPlatform> = Object.fromEntries(
  SOCIAL_PLATFORMS.map((p) => [p.id, p])
);
