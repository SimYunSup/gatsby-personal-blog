import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ProjectShowcaseProps {
  projectName: string;
  description: string;
  screens?: {
    type: 'image';
    src: string;
  }[];
}

export const ProjectShowcase = ({ projectName, description, screens }: ProjectShowcaseProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasScreens = screens && screens.length > 0;

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold" style={{ color: 'var(--color-primary)' }}>
          {projectName}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </div>

      {hasScreens && (
        <div className="space-y-4">
          {screens.length > 1 && (
            <div className="flex gap-2">
              {screens.map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeIndex === index
                      ? 'text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  style={activeIndex === index ? { backgroundColor: 'var(--color-primary)' } : undefined}
                  onClick={() => setActiveIndex(index)}
                >
                  스크린 {index + 1}
                </button>
              ))}
            </div>
          )}

          <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <img
              src={screens[activeIndex].src}
              alt={`${projectName} screenshot ${activeIndex + 1}`}
              className="w-full h-auto"
              style={{ display: 'block' }}
            />
          </div>
        </div>
      )}
    </Card>
  );
};
