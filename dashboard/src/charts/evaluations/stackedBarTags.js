import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function StackedBaTags({ values }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = Object.keys(values);
    const incorrectData = Object.values(values).map((item) => item.incorrect);
    const correctData = Object.values(values).map((item) => item.correct);
    const noSendedData = Object.values(values).map((item) => item.noSended);
    

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Incorrectas',
          data: incorrectData,
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Correctas',
          data: correctData,
          backgroundColor: 'rgb(54, 162, 235)',
        },
        {
          label: 'No enviado',
          data: noSendedData,
          backgroundColor: 'rgb(107, 114, 128)',
        },
      ],
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
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Dificultad',
            },
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Respuestas',
            },
          },
        },
        barPercentage: 0.5
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [values]);

  return (
    <div className="lg:h-[25vh] h-[35vh]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default StackedBaTags;
