import React, { useState, useEffect } from "react";
import StackedBar from './charts/general/stackedBar';
import SemiOpen from './charts/general/comboBox';
import HorizontalChart from './charts/general/horizontalBar';
import PaintedBars from './charts/general/paintedBars';
import Table from './charts/general/table';
import Loading from "./loading";

function General() {
    const [waitingState, setWaitingState] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setWaitingState(false);
        }, 2000);
      }, []);

  return (
    <>
        {waitingState === true && (
            <Loading/>
        )}
        {waitingState === false && (
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-3">

                <div className="flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                    <div className='mb-4'>
                        <p className='text-xl mt-5'> Numero de evaluaciones activas.</p>
                        <p className='text-5xl my-5'>135 evaluaciones.</p>
                    </div>
                    <div>
                        <p className='text-xl'> Numero respuestas diarias completas.</p>
                        <p className='text-5xl my-5'>542 respuestas.</p>
                    </div>
                </div>
                <div className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                    <p className='text-xl'> Distibucion de resultados de todas las evaluaciones, representado en porcentajes.</p>
                    <div className='flex pt-3 justify-center'>
                        <PaintedBars />
                    </div>
                </div>

                <div className='flex flex-col justify-center row-span-2 py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                    <div>
                        <p className='text-xl mt-5'> Porcentaje respondido / evaluaciones activas.</p>
                        <p className='lg:text-9xl text-3xl my-5'>80%</p>
                    </div>
                    <div>
                        <p className='text-xl'> Estado de los test.</p>
                        <HorizontalChart />
                    </div>
                </div>
                <div
                className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                    <div className='flex items-center justify-between my-12'>
                        <p> Numero de evaluaciones ya completas para el mes de:</p>
                        <div className='w-72 mr-3'>
                            <SemiOpen />
                        </div>
                    </div>
                    <p className='text-5xl'>84 evaluaciones.</p>

                </div>
                <div className='row-span-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                    <div className='flex flex-col justify-between'>
                        <div className='pt-2'>
                            <p className='text-xl'> Mejores evaluaciones.</p>
                            <Table color={"bg-[#36a2eb]"}/>
                        </div>
                        <div>
                            <p className='text-xl'> Peores evaluaciones.</p>
                            <Table color={"bg-[#ff6384]"} />
                        </div>
                    </div>
                </div>
                <div className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                    <p className='text-xl'> Resultados segun dificultad de la pregunta.</p>
                    <StackedBar />
                </div>
            </div>
        )}
    </>
  );
}

export default General;
