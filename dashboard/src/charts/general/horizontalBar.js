import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';

function HorizontalChart({values}) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const data = {
            labels: [""],
            datasets: [
                {
                    label: 'Respondiendo',
                    data: [values[0]],
                    backgroundColor: 'rgb(255, 99, 132)'
                }, {
                    label: 'Respondido',
                    data: [values[1]],
                    backgroundColor: 'rgb(54, 162, 235)'
                }, {
                    label: 'No respondido',
                    data: [values[2]],
                    backgroundColor: 'rgb(201, 203, 207)'
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
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'y',
                elements: {
                    bar: {
                        borderWidth: 2
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
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
        <div className='h-[25vh]'>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default HorizontalChart;
