import React from 'react';
import { Group } from '@visx/group';
import { curveCatmullRom } from '@visx/curve';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';

export const background = '#f3f3f3';

// Datos generados manualmente
const cityTemperature = [
  { date: '2024-01-01', 'New York': 30, 'San Francisco': 50 },
  { date: '2024-02-01', 'New York': 60, 'San Francisco': 55 },
  { date: '2024-03-01', 'New York': 70, 'San Francisco': 60 },
  { date: '2024-04-01', 'New York': 45, 'San Francisco': 65 },
  { date: '2024-05-01', 'New York': 50, 'San Francisco': 70 },
];

// Accessors
const date = (d) => new Date(d.date).valueOf();
const ny = (d) => Number(d['New York']);
const sf = (d) => Number(d['San Francisco']);

// Scales
const timeScale = scaleTime({
  domain: [Math.min(...cityTemperature.map(date)), Math.max(...cityTemperature.map(date))],
});
const temperatureScale = scaleLinear({
  domain: [
    Math.min(...cityTemperature.map((d) => Math.min(ny(d), sf(d)))),
    Math.max(...cityTemperature.map((d) => Math.max(ny(d), sf(d)))),
  ],
  nice: true,
});

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export default function test3({ width = 500, height = 300, margin = defaultMargin }) {
  if (width < 10) return null;

  // Bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  timeScale.range([0, xMax]);
  temperatureScale.range([yMax, 0]);

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={temperatureScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          <AxisBottom top={yMax} scale={timeScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={temperatureScale} />
          <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
            Temperature (°F)
          </text>
          <Threshold
            id={`${Math.random()}`}
            data={cityTemperature}
            x={(d) => timeScale(date(d)) ?? 0}
            y0={(d) => temperatureScale(ny(d)) ?? 0}
            y1={(d) => temperatureScale(sf(d)) ?? 0}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveCatmullRom}
            belowAreaProps={{
              fill: 'violet',
              fillOpacity: 0.4,
            }}
            aboveAreaProps={{
              fill: 'green',
              fillOpacity: 0.4,
            }}
          />
          <LinePath
            data={cityTemperature}
            curve={curveCatmullRom}
            x={(d) => timeScale(date(d)) ?? 0}
            y={(d) => temperatureScale(sf(d)) ?? 0}
            stroke="violet"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          />
          <LinePath
            data={cityTemperature}
            curve={curveCatmullRom}
            x={(d) => timeScale(date(d)) ?? 0}
            y={(d) => temperatureScale(ny(d)) ?? 0}
            stroke="#222"
            strokeWidth={1.5}
          />
        </Group>
      </svg>
    </div>
  );
}