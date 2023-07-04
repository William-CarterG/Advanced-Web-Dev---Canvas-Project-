import React, { useState, useEffect } from "react";
import StackedBar from './charts/general/stackedBar';
import SemiOpen from './charts/general/comboBox';
import HorizontalChart from './charts/general/horizontalBar';
import PaintedBars from './charts/general/paintedBars';
import Table from './charts/general/table';
import Loading from "./loading";

function General() {
    const [values, setValues] = useState({});
    const [newHorizontalBar, setNewHorizontalBar] = useState({answering:15, answered:20, notAnswer:12});
    const [newActiveEvaluations, setNewActiveEvaluations] = useState(135);
    const [newDailyAnswers, setNewDailyAnswers] = useState(542);
    const [newPaintedBars, setNewPaintedBars] = useState([10, 20, 30, 33, 40, 56, 68, 55, 50, 32, 8]);
    const [newAskedVsTotal, setNewAskedVsTotal] = useState(80);
    const [newMountEvaluations, setNewMountEvaluations] = useState(84);
    const [newCompleteMountEvaluation, setNewCompleteMountEvaluation] = useState([201,125,611,671,812,621,52,0,0,0,0,0]);
    const [newBestEvaluations, setNewBestEvaluations] = useState({1: {name:"Matematicas Conicas", amount:78}, 2:{name:"Mecanica", amount:73}, 3:{name:"Pensamiento Critico", amount:71}});
    const [newWorstEvaluations, setNewWorstEvaluations] = useState({1: {name:"Trigonometria", amount:28}, 2:{name:"Analisis de Fluidos", amount:33}, 3:{name:"Calculo II", amount:42}});
    const [newResultByDifficulty, setNewResultByDifficulty] = useState({over: [10, 15, 25], less: [20, 15, 5]});
  
    useEffect(() => {
        setValues(prevValues => ({
          ...prevValues,
            "horizontalBar": newHorizontalBar,
            "activeEvaluations": newActiveEvaluations,
            "dailyAnswers": newDailyAnswers,
            "paintedBars": newPaintedBars,
            "askedVsTotal": newAskedVsTotal,
            "mountEvaluations": newMountEvaluations,
            "completeMountEvaluation": newCompleteMountEvaluation,
            "bestEvaluations": newBestEvaluations,
            "worstEvaluations": newWorstEvaluations,
            "resultByDifficulty": newResultByDifficulty,

        }));
    }, [newHorizontalBar, newActiveEvaluations, newDailyAnswers, newPaintedBars, newAskedVsTotal, newMountEvaluations, newCompleteMountEvaluation, newBestEvaluations, newWorstEvaluations, newResultByDifficulty]);
    
    const [waitingState, setWaitingState] = useState(true);
    useEffect(() => {
      setTimeout(() => {
          setWaitingState(false);
      }, 2000);
    }, []);

    return (
        <>
        {waitingState === true && (<Loading/>)}
        {waitingState === false && (
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-3">
            <div className="flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                <div className='mb-4'>
                <p className='lg:text-xl lg:mt-5 text-lg'>Numero de evaluaciones activas.</p>
                <p className='lg:text-5xl lg:my-5 text-xl font-bold'>{values["activeEvaluations"]} evaluaciones.</p>
                </div>
                <div>
                <p className='lg:text-xl text-lg'>Numero respuestas diarias completas.</p>
                <p className='lg:text-5xl lg:my-5  text-xl font-bold'>{values["dailyAnswers"]} respuestas.</p>
                </div>
            </div>
            <div className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                <p className='text-xl'>Distibucion de resultados de todas las evaluaciones, representado en porcentajes.</p>
                <div className='flex pt-3 justify-center'>
                <PaintedBars values={values["paintedBars"]}/>
                </div>
            </div>
            <div className='flex flex-col justify-center row-span-2 py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                <div>
                <p className='text-xl mt-5'>Porcentaje respondido / evaluaciones activas.</p>
                <p className='lg:text-9xl text-3xl font-bold lg:my-5 my-2'>{values["askedVsTotal"]}%</p>
                </div>
                <div>
                <p className='text-xl'>Estado de los test.</p>
                <div className="hidden lg:block">
                    <HorizontalChart values={values["horizontalBar"]} axis={'y'} desc={["Respuestas","Estados"]}/>
                </div>
                <div className="lg:hidden">
                    <HorizontalChart values={values["horizontalBar"]} axis={'x'} desc={["Estados","Respuestas"]}/>
                </div>
                </div>
            </div>
            <div className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                <div className="flex flex-col justify-center">
                    <div className='flex items-center justify-between lg:my-12 my-4'>
                        <p className="lg:text-base text-sm">Numero de evaluaciones ya completas para el mes de:</p>
                        <div className='w-72 mr-3'>
                            <SemiOpen values={values["completeMountEvaluation"]} setNewMountEvaluations={setNewMountEvaluations}/>
                        </div>
                    </div>
                    <div>
                        <p className='lg:text-5xl font-bold text-lg'>{values["mountEvaluations"]} evaluaciones.</p>
                    </div>
                </div>
            </div>
            <div className='row-span-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                <div className='flex flex-col justify-center'>
                <div className='pt-2'>
                    <p className='text-xl'>Mejores evaluaciones.</p>
                    <Table values={values["bestEvaluations"]} color={"bg-[#36a2eb]"}/>
                </div>
                <div>
                    <p className='text-xl'>Peores evaluaciones.</p>
                    <Table values={values["worstEvaluations"]} color={"bg-[#ff6384]"}/>
                </div>
                </div>
            </div>
            <div className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                <p className='text-xl'>Resultados segun dificultad de la pregunta.</p>
                <StackedBar values={values["resultByDifficulty"]}/>
            </div>
            </div>
        )}
        </>
  );
}

export default General;
