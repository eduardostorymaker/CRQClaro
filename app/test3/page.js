"use client"



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { Bar } from '@visx/shape';
// import { Group } from '@visx/group';
// import { scaleBand, scaleLinear } from '@visx/scale';
// import { AxisBottom, AxisLeft } from '@visx/axis';

// export default function test3 () {


//   const data = [
//     { label: 'A', value: 50 },
//     { label: 'B', value: 80 },
//     { label: 'C', value: 30 },
//     { label: 'D', value: 60 },
//   ];
  
//   const width = 500;
//   const height = 300;
//   const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  
//   const xMax = width - margin.left - margin.right;
//   const yMax = height - margin.top - margin.bottom;
  
//   const xScale = scaleBand({
//     range: [0, xMax],
//     round: true,
//     domain: data.map(d => d.label),
//     padding: 0.4,
//   });
  
//   const yScale = scaleLinear({
//     range: [yMax, 0],
//     round: true,
//     domain: [0, Math.max(...data.map(d => d.value))],
//   });
  

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //   const svgRef = useRef();
  //   console.log(d3)
  //   // useEffect(() => {
  //   //     // Selecciona el primer párrafo y cambia su texto
  //   //     d3.select("p").text("Este es el primer párrafo.");
    
  //   //     // Selecciona todos los párrafos y cambia su color de texto
  //   //     d3.selectAll("p").style("color", "blue");
    
  //   //     // Selecciona un círculo SVG y cambia su radio y color
  //   //     d3.select("circle")
  //   //       .attr("r", 50)
  //   //       .style("fill", "red");
    
  //   //     // Añade un nuevo párrafo al cuerpo del documento
  //   //     d3.select("body").append("p").text("Nuevo párrafo añadido.");
    
  //   //     // Elimina todos los párrafos con la clase 'remove'
  //   //     d3.selectAll("p.remove").remove();
  //   //   }, []);
  //   const [data, setData] = useState([10, 20, 30, 40, 50]);

  //   useEffect(() => {
  //       const data = [
  //         { month: 'Jan', value: 30 },
  //         { month: 'Feb', value: 20 },
  //         { month: 'Mar', value: 50 },
  //         { month: 'Apr', value: 40 },
  //         { month: 'May', value: 70 },
  //         { month: 'Jun', value: 60 }
  //       ];

  //       const margin = {
  //           top: 30,
  //           right: 30,
  //           bottom: 30,
  //           left: 30
  //       }

  //       const width = 500
  //       const height = 300
  //       //const ymax = Math.max(...data.map( d => d.value))
  //       const ymax = d3.max(data, d => d.value)

  //       const yScale = d3
  //           .scaleLinear()
  //           .domain([0, ymax])
  //           .range([height - margin.bottom, margin.top]);
            
  //       const xScale = d3
  //           .scaleBand()
  //           .domain(data.map(d => d.month))
  //           .range([margin.left, width - margin.right])
  //           .padding(0.1);

  //       const svg = d3
  //           .select(svgRef.current)
  //           .attr("width", width)
  //           .attr("height", height);
    
  //       const yAxis = g => g.attr("transform", `translate(${margin.left})`).call(d3.axisLeft(yScale)) 
  //       const xAxis = g => g.attr("transform",`translate(0,${height - margin.bottom})`).call(d3.axisBottom(xScale).tickFormat(d => d.name))
    
  //       // Añadir barras
  //       svg.selectAll(".bar")
  //         .data(data)
  //         .enter()
  //         .append("rect")
  //         .attr("class", "bar")
  //         .attr("x", d => xScale(d.month))
  //         .attr("y", d => yScale(d.value))
  //         .attr("width", xScale.bandwidth())
  //         .attr("height", d => height - yScale(d.value))
  //         .attr("fill", "blue");
    
  //       // Añadir línea
  //       const line = d3.line()
  //         .x(d => xScale(d.month) + xScale.bandwidth() / 2)
  //         .y(d => yScale(d.value))
  //         .curve(d3.curveMonotoneX);
    
  //       svg.append("path")
  //         .datum(data)
  //         .attr("fill", "none")
  //         .attr("stroke", "orange")
  //         .attr("stroke-width", 2)
  //         .attr("d", line);
    
  //       // Añadir puntos a la línea
  //       svg.selectAll(".dot")
  //         .data(data)
  //         .enter()
  //         .append("circle")
  //         .attr("class", "dot")
  //         .attr("cx", d => xScale(d.month) + xScale.bandwidth() / 2)
  //         .attr("cy", d => yScale(d.value))
  //         .attr("r", 5)
  //         .attr("fill", "orange")
  //         .on("mouseover", function(event, d) {
  //           d3.select(this).attr("fill", "red");
  //           svg.append("text")
  //             .attr("id", "tooltip")
  //             .attr("x", xScale(d.month) + xScale.bandwidth() / 2)
  //             .attr("y", yScale(d.value) - 10)
  //             .attr("text-anchor", "middle")
  //             .attr("font-size", "12px")
  //             .attr("fill", "black")
  //             .text(d.value);
  //         })
  //         .on("mouseout", function() {
  //           d3.select(this).attr("fill", "orange");
  //           svg.select("#tooltip").remove();
  //         });
  //     }, []);

  // const test1 = [1,2,3,4]

//   return (
//     // <div>
//     //   <svg ref={svgRef}></svg>

//     // </div>


//     <svg width={width} height={height}>
//     <Group top={margin.top} left={margin.left}>
//       {data.map((d, i) => (
//         <Bar
//           key={`bar-${i}`}
//           x={xScale(d.label)}
//           y={yScale(d.value)}
//           height={yMax - yScale(d.value)}
//           width={xScale.bandwidth()}
//           fill="teal" // Cambia el color de las barras aquí
//         />
//       ))}
//       <AxisBottom
//         top={yMax}
//         scale={xScale}
//         stroke='#d4ed31' // Cambia el color del eje X aquí
//         tickStroke="black" // Cambia el color de las marcas del eje X aquí
//         tickLabelProps={() => ({
//           fill: 'black', // Cambia el color de las etiquetas del eje X aquí
//           fontSize: 11,
//           textAnchor: 'middle',
//         })}
//         tickLineProps={{
//           stroke: '#d4ed31', // Cambia el color de las líneas verticales aquí
//           strokeWidth: 2,
//         }}
//       />
//       <AxisLeft
//         scale={yScale}
//         stroke='#d4ed31' // Cambia el color del eje Y aquí
//         tickStroke="black" // Cambia el color de las marcas del eje Y aquí
//         tickLineProps={{
//           stroke: '#d4ed31', // Cambia el color de las líneas verticales aquí
//           strokeWidth: 2,
//         }}
//         tickLabelProps={() => ({
//           fill: 'black', // Cambia el color de las etiquetas del eje Y aquí
//           fontSize: 11,
//           textAnchor: 'end',
//           dy: '0.33em',
//           dx: '-0.5em',
//         })}
//         // axisLineProps={{
//         //   stroke: '#d4ed31', // Cambia el color de la línea del eje aquí
//         // }}
//       />
//     </Group>
//   </svg>
//   )
// }

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