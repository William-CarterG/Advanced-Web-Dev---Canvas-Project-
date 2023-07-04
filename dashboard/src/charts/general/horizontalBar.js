import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';

function HorizontalChart({ values,axis,desc }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const data = {
            labels: [""],
            datasets: [
                {
                    label: 'Comenzados',
                    data: [values["answering"]],
                    backgroundColor: 'rgb(255, 99, 132)'
                }, {
                    label: 'Finalizados',
                    data: [values["answered"]],
                    backgroundColor: 'rgb(54, 162, 235)'
                }, {
                    label: 'Sin empezar',
                    data: [values["notAnswer"]],
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
                maintainAspectRatio: false,
                indexAxis: axis,
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
                            text: desc[0]
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: desc[1]
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
        <div className='lg:h-[25vh] h-[35vh]'>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default HorizontalChart;
