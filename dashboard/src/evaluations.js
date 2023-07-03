import React, {useState, useEffect} from "react";
import StackedBarParticipation from './charts/evaluations/stackedBarParticipation';
import StackedBarDifficulty from './charts/evaluations/stackedBarDifficulty';
import StackedBarTags from './charts/evaluations/stackedBarTags';
import ResultBar from './charts/evaluations/resultsBar';
import SemiOpen from './charts/evaluations/comboBox';
import Loading from "./loading";

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
