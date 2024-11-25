"use client"

import React, { useState } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { LegendOrdinal, LegendItem, LegendLabel } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';

const data = [
  { country: 'China', population: 1444216107 },
  { country: 'India', population: 1393409038 },
  { country: 'USA', population: 331893745 },
  { country: 'Indonesia', population: 273523621 },
  { country: 'Pakistan', population: 225199937 },
];

const width = 400;
const height = 400;
const radius = Math.min(width, height) / 2;

const Piechart = () => {

    const [colors,setColor] = useState(['#f6c85f', '#f79d84', '#6f4e7c', '#4e79a7', '#59a14f'])
    const blackColor = ['#000', '#000', '#000', '#000', '#000']
    const colorScale = scaleOrdinal({
    domain: data.map(d => d.country),
    range: colors,
  });

  return (
    <div>
        <svg width={width} height={height}>
            <Group top={height / 2} left={width / 2}>
                <Pie
                    data={data}
                    pieValue={d => d.population}
                    outerRadius={radius}
                    innerRadius={0} //Este es el tamaño del centro del anillo
                    padAngle={0.01}
                >
                {pie => pie.arcs.map(arc => (
                    <g key={arc.data.country} onClick={()=>{console.log(arc.data.country + " " + colorScale(arc.data.country))}}>
                        <path d={pie.path(arc)} fill={colorScale(arc.data.country)} />
                        <text
                            transform={`translate(${pie.path.centroid(arc)})`}
                            dy=".35em"
                            fontSize={10}
                            textAnchor="middle"
                            fill="white"
                        >
                            {arc.data.country}
                        </text>
                    </g>
                ))}
                </Pie>
            </Group>
        </svg>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <LegendOrdinal scale={colorScale} direction="row" labelMargin="0 15px 0 0" itemMargin="0 10px">
                    {labels => labels.map(label => (
                        <LegendItem
                            key={`legend-${label.datum}`}
                            onClick={() => setColor(blackColor)}
                            style={{ cursor: 'pointer' }}
                            >
                                <div className='flex'>
                                    <svg width={15} height={15}>
                                        <rect fill={label.value} width={15} height={15} />
                                    </svg>
                                    <LegendLabel align="left" margin="0 0 0 4px">
                                        {label.datum}
                                    </LegendLabel>
                                </div>
                            </LegendItem>
                    ))}

            </LegendOrdinal>
        </div>
    </div>
  );
};

export default Piechart;