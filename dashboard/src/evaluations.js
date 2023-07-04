import React, {useState, useEffect} from "react";
import StackedBarParticipation from './charts/evaluations/stackedBarParticipation';
import StackedBarDifficulty from './charts/evaluations/stackedBarDifficulty';
import StackedBarTags from './charts/evaluations/stackedBarTags';
import ResultBar from './charts/evaluations/resultsBar';
import SemiOpen from './charts/evaluations/comboBox';
import Loading from "./loading";
import startFetch from "./API";

function Evaluations({evaluationData, setEvaluationData}) {
    const [values, setValues] = useState({});
    const [newParticipationInEvaluation, setNewParticipationInEvaluation] = useState({ended: [10], noEnded: [20]});
    const [newDifficultyInEvaluation, setNewDifficultyInEvaluation] = useState({over: [10, 15, 25], less: [20, 15, 5]});
    const [newTagsInEvaluation, setNewTagsInEvaluation] = useState({over: [25, 2, 15], less: [5, 28, 15]});
    const [newBestQuestion, setNewBestQuestion] = useState(2);
    const [newWorstQuestion, setNewWorstQuestion] = useState(4);
    const [newMeanOfActualEvaluation, setNewMeanOfActualEvaluation] = useState(77);
    const [newMeanOfHistoricalEvaluations, setNewMeanOfHistoricalEvaluations] = useState(82);
    const [newPorcentualDistribution, setNewPorcentualDistribution] = useState({questionsNumbers:[1,2,3,4,5,6,7], correct:[1,8,3,4,5,6,7], incorrect:[5,2,5,7,1,2,2]});

    useEffect(() => {
        setValues(prevValues => ({
          ...prevValues,
            "participationInEvaluation": newParticipationInEvaluation,
            "difficultyInEvaluation": newDifficultyInEvaluation,
            "tagsInEvaluation": newTagsInEvaluation,
            "bestQuestion": newBestQuestion,
            "worstQuestion": newWorstQuestion,
            "meanOfActualEvaluation": newMeanOfActualEvaluation,
            "meanOfHistoricalEvaluations": newMeanOfHistoricalEvaluations,
            "porcentualDistribution": newPorcentualDistribution
        }));
    }, [newParticipationInEvaluation, newDifficultyInEvaluation, newTagsInEvaluation, newBestQuestion, newWorstQuestion, newMeanOfActualEvaluation, newMeanOfHistoricalEvaluations, newPorcentualDistribution]);

    const [isActiveEvaluation,setIsActiveEvaluation] = useState(false);
    const [isHistoricalEvaluation,setIsHistoricalEvaluation] = useState(false);
    const [option,setOption] = useState("");
    const [waitingState,setWaitingState] = useState(true);
    useEffect(() => {
        startFetch(`evaluations/`, 'GET', null, function(data) {
            console.log(data)
            setWaitingState(false);
        });
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
                            <StackedBarParticipation values={values["participationInEvaluation"]}/>
                        </div>
                        <div
                            className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <p className='text-xl'>Resultados segun la etiqueta de la pregunta.</p>
                            <StackedBarTags values={values["tagsInEvaluation"]}/>
                        </div>
                        <div
                            className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <p className='text-xl'>Resultados segun la dificultad de la pregunta.</p>
                            <StackedBarDifficulty values={values["difficultyInEvaluation"]}/>
                        </div>
                        <div
                            className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'>Pregunta con mejor promedio de resultado.</p>
                            <p className='text-5xl my-5'>Pregunta nº{values["bestQuestion"]}</p>
                        </div>
                        <div
                            className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'>Pregunta con peor promedio de resultado.</p>
                            <p className='text-5xl my-5'>Pregunta nº{values["worstQuestion"]}</p>
                        </div>
                        <div
                            className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div>
                                <p className='text-xl'>Promedio de la evaluacion actual.</p>
                                <p className='text-5xl my-5'>{values["meanOfActualEvaluation"]}%</p>
                            </div>
                            <div>
                                <p className='text-xl'>Promedio de todas las evaluaciones historicas.</p>
                                <p className='text-5xl my-5'>{values["meanOfHistoricalEvaluations"]}%</p>
                            </div>
                        </div>
                        <div
                            className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'>Distribucion porcentual de los resultados.</p>
                            <ResultBar values={values["porcentualDistribution"]}/>
                        </div>
                    </div>
                )
                : (
                    <div
                        className='flex flex-col justify-center lg:h-[93vh] h-[60vh] text-gray-600 rounded-xl border border-gray-200'>
                        <div className='mx-auto lg:w-2/3 w-full'>
                            <p className='lg:text-9xl text-3xl lg:mb-36'>Seleccione el tipo de evaluacion.</p>
                            <div className='flex justify-between lg:mt-36 mt-5'>
                                <div className='lg:flex justify-center'>
                                    <p className='lg:text-4xl text-lg'>Evaluaciones activas</p>
                                    <input
                                        type='checkbox'
                                        name='evaluationGroup'
                                        checked={isActiveEvaluation}
                                        onChange={activeEvaluationChange}
                                        className='lg:ml-4 lg:w-8'/>
                                </div>
                                <div className='lg:flex justify-center'>
                                    <p className='lg:text-4xl text-lg'>Evaluaciones históricas</p>
                                    <input
                                        type='checkbox'
                                        name='evaluationGroup'
                                        checked={isHistoricalEvaluation}
                                        onChange={historicalEvaluationChange}
                                        className='lg:ml-4 lg:w-8'/>
                                </div>
                            </div>
                        </div>
                        <div className="lg:mx-auto mx-3 lg:w-2/3 lg:my-10 my-2 h-24">
                            {option === "active" && (
                                <div>
                                    <SemiOpen/>
                                    <button
                                        className="lg:py-4 lg:px-8 lg:mt-10 py-2 px-4 mt-3 rounded-xl border-black border font-bold"
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
                                        className="lg:py-4 lg:px-8 lg:mt-10 py-2 px-4 mt-3 rounded-xl border-black border font-bold"
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
