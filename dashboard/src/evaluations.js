import React, {useState, useEffect} from "react";
import StackedBarParticipation from './charts/evaluations/stackedBarParticipation';
import StackedBarDifficulty from './charts/evaluations/stackedBarDifficulty';
import StackedBarTags from './charts/evaluations/stackedBarTags';
import ResultBar from './charts/evaluations/resultsBar';
import SemiOpen from './charts/evaluations/comboBox';
import Loading from "./loading";

function Evaluations({evaluationData, setEvaluationData}) {
    const [isActiveEvaluation,setIsActiveEvaluation] = useState(false);
    const [isHistoricalEvaluation,setIsHistoricalEvaluation] = useState(false);
    const [option,setOption] = useState("");
    const [waitingState,setWaitingState] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setWaitingState(false);
        }, 2000);
    }, []);

    const activeEvaluationChange = () => {
        setIsActiveEvaluation(!isActiveEvaluation);
        setIsHistoricalEvaluation(false);
        setOption("active");
    };

    const historicalEvaluationChange = () => {
        setIsHistoricalEvaluation(!isHistoricalEvaluation);
        setIsActiveEvaluation(false);
        setOption("historical");
    };

    return (
    <> {
        waitingState === true && (<Loading/>)
    }
    {
        waitingState === false && (<> {
            evaluationData !== ""
                ? (
                    <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-3">
                        <div
                            className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'>Participacion de la evaluacion.</p>
                            <StackedBarParticipation/>
                        </div>
                        <div
                            className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'>Pregunta con mejor promedio de resultado.</p>
                            <p className='text-5xl my-5'>Pregunta nº2</p>
                        </div>
                        <div
                            className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <p className='text-xl'>Resultados segun la dificultad de la pregunta.</p>
                            <StackedBarDifficulty/>
                        </div>
                        <div
                            className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <p className='text-xl'>Resultados segun la etiqueta de la pregunta.</p>
                            <StackedBarTags/>
                        </div>
                        <div
                            className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'>Pregunta con peor promedio de resultado.</p>
                            <p className='text-5xl my-5'>Pregunta nº4</p>
                        </div>
                        <div
                            className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div>
                                <p className='text-xl'>Promedio de la evaluacion actual.</p>
                                <p className='text-5xl my-5'>77%</p>
                            </div>
                            <div>
                                <p className='text-xl'>Promedio de todas las evaluaciones historicas.</p>
                                <p className='text-5xl my-5'>82%</p>
                            </div>
                        </div>
                        <div
                            className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'>Distribucion porcentual de los resultados.</p>
                            <ResultBar/>
                        </div>
                    </div>
                )
                : (
                    <div
                        className='flex flex-col justify-center h-[93vh] text-gray-600 rounded-xl border border-gray-200'>
                        <div className='mx-auto w-2/3'>
                            <p className='text-9xl mb-36'>Seleccione el tipo de evaluacion.</p>
                            <div className='flex justify-between mt-36'>
                                <div className='flex justify-center'>
                                    <p className='text-4xl'>Evaluaciones activas</p>
                                    <input
                                        type='checkbox'
                                        name='evaluationGroup'
                                        checked={isActiveEvaluation}
                                        onChange={activeEvaluationChange}
                                        className='ml-4 w-8'/>
                                </div>
                                <div className='flex justify-center'>
                                    <p className='text-4xl'>Evaluaciones históricas</p>
                                    <input
                                        type='checkbox'
                                        name='evaluationGroup'
                                        checked={isHistoricalEvaluation}
                                        onChange={historicalEvaluationChange}
                                        className='ml-4 w-8'/>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto w-2/3 my-10 h-24">
                            {option === "active" && (
                                <div>
                                    <SemiOpen/>
                                    <button
                                        className="py-4 px-8 mt-10 rounded-xl border-black border font-bold"
                                        onClick={() => {
                                        setWaitingState(true);
                                        setTimeout(() => {
                                            setWaitingState(false);
                                            setEvaluationData("active")
                                        }, 2000);
                                    }}>Enviar</button>
                                </div>
                            )}
                            {option === "historical" && (
                                <div>
                                    <SemiOpen/>
                                    <button
                                        className="py-4 px-8 mt-10 rounded-xl border-black border font-bold"
                                        onClick={() => {
                                        setWaitingState(true);
                                        setTimeout(() => {
                                            setWaitingState(false);
                                            setEvaluationData("historical")
                                        }, 2000);
                                    }}>Enviar</button>
                                </div>
                            )}
                        </div>
                    </div>
                )
        } </>
      )}
    </>);
    }

    export default Evaluations;
