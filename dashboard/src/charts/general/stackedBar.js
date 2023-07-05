import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';

function StackedBar({ values }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    useEffect(() => {
        const data = {
            labels: [
                "Baja", "Media", "Alta"
            ],
            datasets: [
                {
                    label: 'Incorrectas',
                    data: [
                        values[0]["incorrect"],
                        values[1]["incorrect"],
                        values[2]["incorrect"]
                      ],                    
                    backgroundColor: 'rgb(255, 99, 132)'
                    }, {
                    label: 'Correctas',
                    data: [
                        values[0]["correct"],
                        values[1]["correct"],
                        values[2]["correct"]
                      ],                    
                    backgroundColor: 'rgb(54, 162, 235)'
                },
                {
                    label: 'No enviado',
                    data: [
                        values[0]["noSended"],
                        values[1]["noSended"],
                        values[2]["noSended"]
                    ],                     
                    backgroundColor: 'rgb(107, 114, 128)'
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
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Dificultad'
                        }
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Respuestas'
                        }
                    }
                },
                animation: false
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

export default StackedBar;
