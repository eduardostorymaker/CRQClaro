"use client"

import React from "react";
import { Pie } from "@visx/shape";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

const browsers = [
  { label: "Antes de recoger", usage: 25 },
  { label: "Busca el nombre de", usage: 25 },
  { label: "Cada uno de los elementos", usage: 25 },
  { label: "Dentro de la caja", usage: 25 }
];

// color scales
const getBrowserColor = scaleOrdinal({
  domain: browsers.map((d) => d.label),
  range: ["red", "orange", "green", "blue"]
});

export default function DonutChart () {
  const donutThickness = 25;
  const width = 500;
  const height = 300;
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  return (
    <svg width={width} height={height}>
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={browsers}
          pieValue={(d) => d.usage}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
        >
          {({ arcs, path }) => (
            <g>
              {arcs.map((arc, i) => {
                const arcPath = path(arc);
                const midAngle = (arc.startAngle + arc.endAngle) / 2;
                const rotate = (midAngle * 180) / Math.PI - 90;
                return (
                  <g key={`pie-arc-${i}`}>
                    <path
                      id={`arc-path-${i}`}
                      className={`arc${i}`}
                      d={arcPath}
                      fill={getBrowserColor(arc.data.label)}
                    />
                    <text dy="-0.5em">
                      <textPath
                        href={`#arc-path-${i}`}
                        startOffset="50%"
                        textAnchor="middle"
                        style={{ fontSize: 12, fill: "black" }}
                      >
                        {arc.data.label}
                      </textPath>
                    </text>
                  </g>
                );
              })}
            </g>
          )}
        </Pie>
      </Group>
    </svg>
  );
};