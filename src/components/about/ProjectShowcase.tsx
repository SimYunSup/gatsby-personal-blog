import { useState } from 'react';

interface ProjectShowcaseProps {
  projectName: string;
  description: string;
  screens?: {
    mobile?: string;
    desktop?: string;
    architecture?: string;
  };
}

export const ProjectShowcase = ({ projectName, description, screens }: ProjectShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<'mobile' | 'desktop' | 'architecture'>(
    screens?.mobile ? 'mobile' : screens?.desktop ? 'desktop' : 'architecture'
  );

  const hasScreens = screens && (screens.mobile || screens.desktop || screens.architecture);

  return (
    <div className="project-showcase">
      <div className="showcase-header">
        <h3 className="showcase-title">{projectName}</h3>
        <p className="showcase-description">{description}</p>
      </div>

      {hasScreens && (
        <div className="showcase-content">
          <div className="showcase-tabs">
            {screens.mobile && (
              <button
                className={`tab-button ${activeTab === 'mobile' ? 'active' : ''}`}
                onClick={() => setActiveTab('mobile')}
              >
                📱 Mobile
              </button>
            )}
            {screens.desktop && (
              <button
                className={`tab-button ${activeTab === 'desktop' ? 'active' : ''}`}
                onClick={() => setActiveTab('desktop')}
              >
                💻 Desktop
              </button>
            )}
            {screens.architecture && (
              <button
                className={`tab-button ${activeTab === 'architecture' ? 'active' : ''}`}
                onClick={() => setActiveTab('architecture')}
              >
                🏗️ Architecture
              </button>
            )}
          </div>

          <div className="showcase-viewer">
            {activeTab === 'mobile' && screens.mobile && (
              <div className="screen-container mobile">
                <div className="mobile-frame">
                  <div className="screen-placeholder">
                    <p>Mobile Screen Preview</p>
                    <p className="screen-path">{screens.mobile}</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'desktop' && screens.desktop && (
              <div className="screen-container desktop">
                <div className="desktop-frame">
                  <div className="screen-placeholder">
                    <p>Desktop Screen Preview</p>
                    <p className="screen-path">{screens.desktop}</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'architecture' && screens.architecture && (
              <div className="screen-container architecture">
                <div className="architecture-diagram">
                  <div className="diagram-placeholder">
                    <p>Architecture Diagram</p>
                    <p className="screen-path">{screens.architecture}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
