import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function ResultBar() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {

    const data = {
      labels: [1,2,3,4,5,6,7],
      datasets: [
        {
          label: 'Correcto',
          data: [1,2,3,4,5,6,7],
          backgroundColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          borderRadius: 2,
          borderSkipped: false,
        },
        {
          label: 'Incorrecto',
          data: [5,12,5,7,1,2,2],
          backgroundColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
          borderRadius: 2,
          borderSkipped: false,
        }
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
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Numero de la pregunta'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Respuestas'
            }
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
    <div className='h-[25vh] w-full'>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default ResultBar;
