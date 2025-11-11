import type { Experience } from '../../data/resume';
import { MetricCard } from './MetricCard';

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="experience-card">
      <div className="experience-header">
        <h3 className="company-name">{experience.company}</h3>
        <span className="position">{experience.position}</span>
        <span className="period">{experience.period}</span>
      </div>

      <div className="projects-section">
        {experience.projects.map((project, idx) => (
          <div key={idx} className="project">
            <h4 className="project-name">{project.name}</h4>
            <p className="project-description">{project.description}</p>

            <div className="achievements">
              {project.achievements.map((achievement, aidx) => (
                <div key={aidx} className="achievement">
                  <h5 className="achievement-title">{achievement.title}</h5>
                  <p className="achievement-description">{achievement.description}</p>

                  {achievement.metrics && (
                    <MetricCard
                      metric={achievement.metrics}
                      title={achievement.title}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
