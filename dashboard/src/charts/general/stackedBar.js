import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';



function StackedBar() {
  const labels = ["Facil", "Medio", "Dificil"];

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Sobre el 50% correcto',
          data: [20,15,5],
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Menor o igual al 50% correcto',
          data: [10,15,25],
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ]
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {

        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); 
      }
    };
  }, []);

  return (
    <div className='h-[25vh]'>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default StackedBar;
