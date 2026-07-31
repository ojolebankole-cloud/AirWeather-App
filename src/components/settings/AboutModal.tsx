import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { DEVELOPER_INFO } from '../../constants/developerInfo';
import {
  CloudSun,
  Mail,
  Phone,
  Instagram,
  Send,
  MessageCircle,
  ExternalLink,
  Heart,
  Code2,
} from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { socials } = DEVELOPER_INFO;

  return (
    <GlassCard className="p-5 space-y-4">
      {/* Brand Header */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 border-b border-white/10 pb-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
          <CloudSun className="h-8 w-8" />
        </div>

        <h3 className="text-2xl font-black tracking-tight text-white">
          {DEVELOPER_INFO.appName}
        </h3>
        <p className="text-xs font-semibold text-amber-300">
          {DEVELOPER_INFO.tagline}
        </p>
        <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-mono font-medium text-white/80">
          Version {DEVELOPER_INFO.version}
        </span>
      </div>

      {/* Creator Info */}
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs text-white/80 font-medium">
          <Code2 className="h-4 w-4 text-sky-300" />
          <span>Designed & Crafted by</span>
          <strong className="text-amber-300 font-bold">{DEVELOPER_INFO.creator}</strong>
          <span>({DEVELOPER_INFO.brand})</span>
        </div>
        <p className="text-[11px] text-white/60">{DEVELOPER_INFO.copyright}</p>
      </div>

      {/* Developer Social Links */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-bold text-white/80 uppercase tracking-wider block">
          Connect with Developer
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {/* Email */}
          <a
            href={`mailto:${socials.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition group"
          >
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-300" />
              <span>Email</span>
            </div>
            <span className="font-mono text-[11px] text-white/70 group-hover:text-amber-300">
              {socials.email}
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href={socials.whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition group"
          >
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-300" />
              <span>WhatsApp</span>
            </div>
            <span className="font-mono text-[11px] text-white/70 group-hover:text-emerald-300">
              {socials.whatsApp}
            </span>
          </a>

          {/* Instagram */}
          <a
            href={socials.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition group"
          >
            <div className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-pink-300" />
              <span>Instagram</span>
            </div>
            <span className="font-mono text-[11px] text-white/70 group-hover:text-pink-300">
              {socials.instagram}
            </span>
          </a>

          {/* X / Twitter */}
          <a
            href={socials.xLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition group"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-sky-300" />
              <span>X (Twitter)</span>
            </div>
            <span className="font-mono text-[11px] text-white/70 group-hover:text-sky-300">
              {socials.x}
            </span>
          </a>

          {/* Telegram */}
          <a
            href={socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition group"
          >
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-cyan-300" />
              <span>Telegram</span>
            </div>
            <span className="font-mono text-[11px] text-white/70 group-hover:text-cyan-300">
              {socials.telegram}
            </span>
          </a>

          {/* Reddit */}
          <a
            href={socials.redditLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition group"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-orange-300" />
              <span>Reddit</span>
            </div>
            <span className="font-mono text-[11px] text-white/70 group-hover:text-orange-300">
              {socials.reddit}
            </span>
          </a>
        </div>
      </div>

      <div className="pt-2 text-center text-[10px] text-white/50 flex items-center justify-center gap-1">
        <span>Made with</span>
        <Heart className="h-3 w-3 text-red-400 fill-red-400 inline" />
        <span>for Google AI Studio Build</span>
      </div>
    </GlassCard>
  );
};
