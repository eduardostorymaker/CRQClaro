import React from 'react';
import dynamic from 'next/dynamic';

const DonutChart = dynamic(() => import('../../../Components/Test/DonutChart'), { ssr: false });

 export default function donutchart () {
  return (
    <div>
      <h1>Gráfico de Anillo con VisX</h1>
      <div className='w-full h-[500px]'>
        <p>Text</p>
        <DonutChart />
      </div>
    </div>
  );
};
