import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';

function PaintedBars({ values }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const data = {
            labels: [
                "0%",
                "10%",
                "20%",
                "30%",
                "40%",
                "50%",
                "60%",
                "70%",
                "80%",
                "90%",
                "100%"
            ],
            datasets: [
                {
                    label: 'personas',
                    data: values,
                    backgroundColor: 'rgb(255, 99, 132)',
                    fill: true
                }
            ]
        };

        if (chartRef.current) {
            chartRef
                .current
                .destroy();
        }

        const ctx = canvasRef
            .current
            .getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    tooltip: {
                        mode: 'index'
                    },
                    legend: {
                        display: false
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Porcentaje de correctitud'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Resultados'
                        }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef
                    .current
                    .destroy();
            }
        };
    }, [values]);

    return (
        <div className='h-[23.5vh] w-full'>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default PaintedBars;
