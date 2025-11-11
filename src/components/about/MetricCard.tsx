import type { Metric } from '../../data/resume';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { useMemo } from 'react';

interface MetricCardProps {
  metric: Metric;
  title: string;
  animated?: boolean;
}

const parseMetricValue = (value: string | number): number => {
  if (typeof value === 'number') return value;

  // Remove common units and convert to number
  const numStr = value
    .replace(/ms|초|분|일|개월|주|%/g, '')
    .replace(/[^0-9.]/g, '');

  // Handle time conversions
  if (value.includes('분') && value.includes('초')) {
    const parts = value.split(' ');
    let total = 0;
    parts.forEach(part => {
      if (part.includes('분')) {
        total += parseFloat(part) * 60;
      } else if (part.includes('초')) {
        total += parseFloat(part);
      }
    });
    return total;
  }

  if (value.includes('개월')) {
    return parseFloat(numStr) * 30;
  }

  if (value.includes('주')) {
    return parseFloat(numStr) * 7;
  }

  if (value.includes('일')) {
    return parseFloat(numStr);
  }

  return parseFloat(numStr) || 0;
};

export const MetricCard = ({ metric, title, animated = true }: MetricCardProps) => {
  const width = 300;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };

  const data = useMemo(() => {
    const beforeValue = parseMetricValue(metric.before);
    const afterValue = parseMetricValue(metric.after);

    return [
      { label: 'Before', value: beforeValue },
      { label: 'After', value: afterValue },
    ];
  }, [metric]);

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: data.map(d => d.label),
        padding: 0.4,
      }),
    [xMax, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, Math.max(...data.map(d => d.value)) * 1.1],
        nice: true,
      }),
    [yMax, data]
  );

  return (
    <div className={`metric-card ${animated ? 'animate-fade-in' : ''}`}>
      <h4 className="metric-title">{title}</h4>

      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={yScale}
            width={xMax}
            strokeDasharray="3,3"
            stroke="#e0e0e0"
            strokeOpacity={0.3}
          />

          {data.map((d) => {
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(d.value) ?? 0);
            const barX = xScale(d.label);
            const barY = yMax - barHeight;

            return (
              <Group key={`bar-${d.label}`}>
                <Bar
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={d.label === 'Before' ? '#94a3b8' : '#10b981'}
                  rx={4}
                />
                <text
                  x={(barX ?? 0) + barWidth / 2}
                  y={barY - 5}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight="bold"
                  fill={d.label === 'Before' ? '#64748b' : '#059669'}
                >
                  {metric[d.label === 'Before' ? 'before' : 'after']}
                </text>
              </Group>
            );
          })}

          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke="#94a3b8"
            tickStroke="#94a3b8"
            tickLabelProps={() => ({
              fill: '#64748b',
              fontSize: 12,
              textAnchor: 'middle',
            })}
          />

          <AxisLeft
            scale={yScale}
            stroke="#94a3b8"
            tickStroke="#94a3b8"
            tickLabelProps={() => ({
              fill: '#64748b',
              fontSize: 10,
              textAnchor: 'end',
              dx: -4,
            })}
          />
        </Group>
      </svg>

      <div className="metric-improvement">
        <span className="improvement-badge">{metric.improvement} 개선</span>
        {metric.unit && <span className="metric-unit-label">{metric.unit}</span>}
      </div>
    </div>
  );
};
