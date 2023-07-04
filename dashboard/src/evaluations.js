import React, {useState, useEffect} from "react";
import StackedBarDifficulty from './charts/evaluations/stackedBarDifficulty';
import StackedBarTags from './charts/evaluations/stackedBarTags';
import ResultBar from './charts/evaluations/resultsBar';
import SemiOpen from './charts/evaluations/comboBox';
import Loading from "./loading";
import startFetch from "./API";
import percentajeFormater from "./functions/PercentajeFormater"

function Evaluations({evaluationData, setEvaluationData}) {
    const [values, setValues] = useState({});
    const [allHistorical, setAllHistorical] = useState(null);
    const [allActive, setAllActive] = useState(null);
    const [selected,setSelected] = useState("");
    const [newParticipationInEvaluation, setNewParticipationInEvaluation] = useState(78);
    const [newDifficultyInEvaluation, setNewDifficultyInEvaluation] = useState({correct: [10, 15, 25], incorrect: [20, 15, 5]});
    const [newTagsInEvaluation, setNewTagsInEvaluation] = useState({correct: [25, 2, 15], incorrect: [5, 28, 15]});
    const [newBestQuestion, setNewBestQuestion] = useState(2);
    const [newWorstQuestion, setNewWorstQuestion] = useState(4);
    const [newMeanOfActualEvaluation, setNewMeanOfActualEvaluation] = useState(77);
    const [newMeanOfHistoricalEvaluations, setNewMeanOfHistoricalEvaluations] = useState(82);
    const [newCorrectAnswer, setNewCorrectAnswer] = useState(58);
    const [newIncorrectAnswer, setNewIncorrectAnswer] = useState(23);
    const [newNoAnswer, setNewNoAnswer] = useState(57);
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
            "correctAnswer": newCorrectAnswer,
            "incorrectAnswer": newIncorrectAnswer,
            "noAnswer": newNoAnswer,
            "porcentualDistribution": newPorcentualDistribution
        }));
    }, [newParticipationInEvaluation, newDifficultyInEvaluation, newTagsInEvaluation, newBestQuestion, newWorstQuestion, newMeanOfActualEvaluation, newMeanOfHistoricalEvaluations, newCorrectAnswer, newIncorrectAnswer, newNoAnswer, newPorcentualDistribution]);

    const [isActiveEvaluation,setIsActiveEvaluation] = useState(false);
    const [isHistoricalEvaluation,setIsHistoricalEvaluation] = useState(false);
    const [option,setOption] = useState("");
    const [waitingState,setWaitingState] = useState(true);
    useEffect(() => {
        startFetch(`evaluations/`, 'GET', null, function(data) {
            setAllHistorical(Object.values(data))
            startFetch(`active-evaluations/`, 'GET', null, function(data) {
                setAllActive(Object.values(data))
                setWaitingState(false);
            });
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
                        <div className="flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <div>
                                <p className='text-xl'>Porcentaje de participacion.</p>
                                <p className='text-9xl my-5'>{values["participationInEvaluation"]}%</p>
                            </div>
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
                            <p className='text-xl'>Pregunta con mejor de resultado.</p>
                            <p className='text-5xl my-5'>Pregunta nº{values["bestQuestion"]}</p>
                        </div>
                        <div
                            className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'>Pregunta con peor de resultado.</p>
                            <p className='text-5xl my-5'>Pregunta nº{values["worstQuestion"]}</p>
                        </div>
                        <div className="flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <div>
                                <p className='text-lg'>Cantidad total de correctas.</p>
                                <p className='text-2xl my-2 font-bold'>{values["correctAnswer"]}%</p>
                            </div>
                            <div>
                                <p className='lg'>Cantidad total de incorrectas.</p>
                                <p className='text-2xl my-2 font-bold'>{values["incorrectAnswer"]}%</p>
                            </div>
                            <div>
                                <p className='lg'>Cantidad total de no respondidas.</p>
                                <p className='text-2xl my-2 font-bold'>{values["noAnswer"]}%</p>
                            </div>
                        </div>
                        <div
                            className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'>Distribucion porcentual de los resultados por pregunta.</p>
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
                                    <SemiOpen data={allActive} selected={selected} setSelected={setSelected}/>
                                </div>
                            )}
                            {option === "historical" && (
                                <div>
                                    <SemiOpen data={allHistorical} selected={selected} setSelected={setSelected}/>
                                </div>
                            )}
                            {(option === "active" || option === "historical") && (
                                <div>
                                    <button
                                        className="lg:py-4 lg:px-8 lg:mt-10 py-2 px-4 mt-3 rounded-xl border-black border font-bold"
                                        onClick={() => {
                                        setWaitingState(true);
                                        startFetch(`dashboard/evaluation/${selected["id"]}/`, 'GET', null, function(data) {
                                            console.log(data)
                                            setNewParticipationInEvaluation(percentajeFormater(data["participation_percentage"]))
                                            setNewMeanOfActualEvaluation(percentajeFormater(data["actual_and_historical_results"]["actual_results"])) 
                                            setNewMeanOfHistoricalEvaluations(percentajeFormater(data["actual_and_historical_results"]["historical_results"]))     
                                            setWaitingState(false);
                                            setEvaluationData("active")
                                        });
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
