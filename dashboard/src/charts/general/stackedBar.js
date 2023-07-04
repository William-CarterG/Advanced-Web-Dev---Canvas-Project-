import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';

function StackedBar({ values }) {

    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const data = {
            labels: [
                "Facil", "Medio", "Dificil"
            ],
            datasets: [
                {
                    label: 'Menor o igual al 50% correcto',
                    data: values["less"],
                    backgroundColor: 'rgb(255, 99, 132)'
                }, {
                    label: 'Sobre el 50% correcto',
                    data: values["over"],
                    backgroundColor: 'rgb(54, 162, 235)'
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
    }, []); // Agregamos 'labels' al arreglo de dependencias

    return (
        <div className='lg:h-[25vh] h-[35vh]'>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default StackedBar;
