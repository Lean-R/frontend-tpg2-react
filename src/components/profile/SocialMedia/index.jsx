import styles from './SocialMedia.module.css';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandTwitch,
  IconWorld,
} from '@tabler/icons-react';

const SOCIAL_MAP = {
  github:    { icon: IconBrandGithub,   label: 'GitHub',    color: '#e6edf3', bg: '#24292e' },
  linkedin:  { icon: IconBrandLinkedin, label: 'LinkedIn',  color: '#fff',    bg: '#0A66C2' },
  twitter:   { icon: IconBrandTwitter,  label: 'Twitter',   color: '#fff',    bg: '#1DA1F2' },
  instagram: { icon: IconBrandInstagram,label: 'Instagram', color: '#fff',    bg: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' },
  youtube:   { icon: IconBrandYoutube,  label: 'YouTube',   color: '#fff',    bg: '#FF0000' },
  twitch:    { icon: IconBrandTwitch,   label: 'Twitch',    color: '#fff',    bg: '#9146FF' },
  web:       { icon: IconWorld,         label: 'Portfolio', color: '#fff',    bg: 'var(--color-acento-primario)' },
};

const SocialMedia = ({ data }) => {
  if (!data?.socialMedia || Object.keys(data.socialMedia).length === 0) return null;

  return (
    <div className={styles.social_section}>
      <label className={styles.section_label}>ENCUÉNTRAME EN</label>
      <div className={styles.social_buttons}>
        {Object.entries(data.socialMedia).map(([platform, url]) => {
          const social = SOCIAL_MAP[platform.toLowerCase()];
          if (!social) return null;
          const IconComponent = social.icon;
          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social_btn}
              style={{
                '--social-color': social.color,
                '--social-bg': social.bg,
              }}
              aria-label={social.label}
            >
              <span className={styles.btn_bg} />
              <IconComponent size={18} stroke={1.8} className={styles.btn_icon} />
              <span className={styles.btn_label}>{social.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialMedia;
