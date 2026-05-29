import styles from './TechStack.module.css';
import {
  IconBrandReact,
  IconBrandJavascript,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandGit,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandTypescript,
  IconBrandVite,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandMongodb,
  IconDatabase,
  IconBrandAws,
  IconBrandVscode,
} from '@tabler/icons-react';

const ICON_MAP = {
  react:      { icon: IconBrandReact,      label: 'React',      color: '#61DAFB' },
  javascript: { icon: IconBrandJavascript, label: 'JavaScript', color: '#F7DF1E' },
  html:       { icon: IconBrandHtml5,      label: 'HTML5',      color: '#E34F26' },
  css:        { icon: IconBrandCss3,       label: 'CSS3',       color: '#1572B6' },
  git:        { icon: IconBrandGit,        label: 'Git',        color: '#F05032' },
  nodejs:     { icon: IconBrandNodejs,     label: 'Node.js',    color: '#339933' },
  python:     { icon: IconBrandPython,     label: 'Python',     color: '#3776AB' },
  typescript: { icon: IconBrandTypescript, label: 'TypeScript', color: '#3178C6' },
  vite:       { icon: IconBrandVite,       label: 'Vite',       color: '#646CFF' },
  docker:     { icon: IconBrandDocker,     label: 'Docker',     color: '#2496ED' },
  figma:      { icon: IconBrandFigma,      label: 'Figma',      color: '#F24E1E' },
  mongodb:    { icon: IconBrandMongodb,    label: 'MongoDB',    color: '#47A248' },
  sql:        { icon: IconDatabase,        label: 'SQL',        color: '#CC2927' },
  aws:        { icon: IconBrandAws,        label: 'AWS',        color: '#FF9900' },
  vscode:     { icon: IconBrandVscode,     label: 'VS Code',    color: '#007ACC' },
};

const TechStack = ({ data }) => {
  if (!data?.techStack || data.techStack.length === 0) return null;

  return (
    <div className={styles.tech_stack_section}>
      <label className={styles.section_label}>TECH STACK</label>
      <div className={styles.icons_grid}>
        {data.techStack.map((key) => {
          const tech = ICON_MAP[key.toLowerCase()];
          if (!tech) return null;
          const IconComponent = tech.icon;
          return (
            <div
              key={key}
              className={styles.tech_item}
              style={{ '--tech-color': tech.color }}
            >
              <div className={styles.icon_wrapper}>
                <IconComponent size={32} stroke={1.5} className={styles.tech_icon} />
                <div className={styles.icon_glow} />
              </div>
              <span className={styles.tech_label}>{tech.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStack;
