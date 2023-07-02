import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function HorizontalChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: [""],
      datasets: [
        {
          label: 'Respondiendo',
          data: [15],
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Respondido',
          data: [20],
          backgroundColor: 'rgb(54, 162, 235)',
        },
        {
          label: 'No respondido',
          data: [10],
          backgroundColor: 'rgb(201, 203, 207)',
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
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          x: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Respuestas'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Estados'
            }
          }
        }
      },
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

export default HorizontalChart;
