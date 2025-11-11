import type { SideProject } from '../../data/resume';

interface SideProjectCardProps {
  project: SideProject;
}

export const SideProjectCard = ({ project }: SideProjectCardProps) => {
  return (
    <div className="side-project-card">
      <div className="project-header">
        <h3 className="project-name">{project.name}</h3>
        <span className="project-period">{project.period}</span>
      </div>

      <p className="project-description">{project.description}</p>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          🔗 {project.link}
        </a>
      )}

      {project.metrics && (
        <div className="project-metrics">
          {project.metrics.subscribers && (
            <div className="metric-item">
              <span className="metric-icon">👥</span>
              <span className="metric-label">구독자</span>
              <span className="metric-value">{project.metrics.subscribers}+</span>
            </div>
          )}
          {project.metrics.mau && (
            <div className="metric-item">
              <span className="metric-icon">📊</span>
              <span className="metric-label">MAU</span>
              <span className="metric-value">{project.metrics.mau}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
