import React, {useState, useEffect} from "react";
import StackedBarDifficulty from './charts/evaluations/stackedBarDifficulty';
import StackedBarTags from './charts/evaluations/stackedBarTags';
import ResultBar from './charts/evaluations/resultsBar';
import SemiOpen from './charts/evaluations/evalComboBox';
import Loading from "./loading";
import startFetch from "./API";
import percentajeFormater from "./functions/PercentajeFormater"

function Evaluations({ws,evaluationData, setEvaluationData, fromGroupToEval}) {
    const [values, setValues] = useState({});
    const [allHistorical, setAllHistorical] = useState(null);
    const [allActive, setAllActive] = useState(null);
    const [selected,setSelected] = useState("");
    const [newParticipationInEvaluation, setNewParticipationInEvaluation] = useState(78);
    const [newDifficultyInEvaluation, setNewDifficultyInEvaluation] = useState({0: {"correct":0,"incorrect":0,"noSended":0}, 1: {"correct":0,"incorrect":0,"noSended":0}, 2:{"correct":0,"incorrect":0,"noSended":0}});
    const [newTagsInEvaluation, setNewTagsInEvaluation] = useState({"No hay tags disponibles":{correct:0,incorrect:0,noSended:0}});
    const [newBestQuestion, setNewBestQuestion] = useState(0);
    const [newWorstQuestion, setNewWorstQuestion] = useState(0);
    const [newMeanOfActualEvaluation, setNewMeanOfActualEvaluation] = useState(77);
    const [newMeanOfHistoricalEvaluations, setNewMeanOfHistoricalEvaluations] = useState(82);
    const [newCorrectAnswer, setNewCorrectAnswer] = useState(58);
    const [newIncorrectAnswer, setNewIncorrectAnswer] = useState(23);
    const [newNoAnswer, setNewNoAnswer] = useState(57);
    const [newTotal, setNewTotal] = useState(500);
    const [newPorcentualDistribution, setNewPorcentualDistribution] = useState({questionsNumbers:[1,2,3,4,5,6,7], correct:[1,8,3,4,5,6,7], incorrect:[5,2,5,7,1,2,2], noSended:[1,1,1,1,1,1,1]});

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
            "Total": newTotal,
            "porcentualDistribution": newPorcentualDistribution
        }));
    }, [newParticipationInEvaluation, newDifficultyInEvaluation, newTagsInEvaluation, newBestQuestion, newWorstQuestion, newMeanOfActualEvaluation, newMeanOfHistoricalEvaluations, newCorrectAnswer, newIncorrectAnswer, newNoAnswer, newTotal, newPorcentualDistribution]);

    const [isActiveEvaluation,setIsActiveEvaluation] = useState(false);
    const [isHistoricalEvaluation,setIsHistoricalEvaluation] = useState(false);
    const [option,setOption] = useState("");
    const [waitingState,setWaitingState] = useState(true);
    useEffect(() => {
        if (fromGroupToEval !== false){
            setEvaluationData("data")
            reloadView(fromGroupToEval)
            
        }else{
            startFetch(`evaluations/`, 'GET', null, function(data) {
                setAllHistorical(Object.values(data))
                startFetch(`active-evaluations/`, 'GET', null, function(data) {
                    setAllActive(Object.values(data))
                    setWaitingState(false);
                });
            });
        }
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
    function reloadView(id){
        let defId = selected["id"];
        if (id !== false){
            defId = id
        }
        startFetch(`dashboard/evaluation/${defId}/`, 'GET', null, function(data) {
            setNewParticipationInEvaluation(percentajeFormater(data["participation_percentage"]))
            setNewMeanOfActualEvaluation(percentajeFormater(data["actual_and_historical_results"]["actual_results"])) 
            setNewMeanOfHistoricalEvaluations(percentajeFormater(data["actual_and_historical_results"]["historical_results"]))     
            let difResults = {0:{correct:0,incorrect:0,noSended:0},1:{correct:0,incorrect:0,noSended:0},2:{correct:0,incorrect:0,noSended:0}}
            let dif = data["questions_analysis"]["results_by_difficulty"]
            for (let i in dif){
                difResults[dif[i]["difficulty"]]["correct"] = dif[i]["c"]
                difResults[dif[i]["difficulty"]]["incorrect"] = dif[i]["i"]
                difResults[dif[i]["difficulty"]]["noSended"] = dif[i]["n"]
            }
            setNewDifficultyInEvaluation(difResults)
            let tagTrigger = 0;
            let tagResults = {}
            let tag = data["questions_analysis"]["results_by_tag"]
            for (let i in tag){
                tagTrigger = 1;
                tagResults[String(tag[i]["tag"])] = {}
                tagResults[String(tag[i]["tag"])]["correct"] = tag[i]["c"]
                tagResults[String(tag[i]["tag"])]["incorrect"] = tag[i]["i"]
                tagResults[String(tag[i]["tag"])]["noSended"] = tag[i]["n"]
            }
            if (tagTrigger !== 0){
                setNewTagsInEvaluation(tagResults)
            }
            setNewCorrectAnswer(data["results"]["correct"])
            setNewIncorrectAnswer(data["results"]["incorrect"])
            setNewNoAnswer(data["results"]["no_answer"])
            setNewTotal(data["results"]["total"])
            let questionsNumbers = []
            let correct = []
            let incorrect = []
            let noSended = []
            let questionsInfo = data["questions_analysis"]["results_by_question"]
            for (let i in questionsInfo){
                questionsNumbers.push(questionsInfo[i]["question"])
                correct.push(questionsInfo[i]["c"])
                incorrect.push(questionsInfo[i]["i"])
                noSended.push(questionsInfo[i]["n"])
            }
            setNewPorcentualDistribution({"questionsNumbers":questionsNumbers, "correct":correct, "incorrect":incorrect, "noSended":noSended })
            if (questionsInfo === []){
                setNewBestQuestion(questionsInfo[0]["question"])
                setNewWorstQuestion(questionsInfo.reverse()[0]["question"])
            }
            setWaitingState(false);
            setEvaluationData("active")
        });
    }
    useEffect(() => {
        if (evaluationData !== ""){
            reloadView(fromGroupToEval);
        }
      }, [ws]);
    return (
    <> {
        waitingState === true && (<Loading/>)
    }
    {
        waitingState === false && (<> {
            (evaluationData !== "" )
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
                            <div className="flex justify-center my-2">
                                <p className='text-xl mr-2'>Cantidad total de correctas:</p>
                                <p className='text-2xl font-bold'>{values["correctAnswer"]}</p>
                            </div>
                            <div className="flex justify-center my-2">
                                <p className='text-xl mr-2'>Cantidad total de incorrectas:</p>
                                <p className='text-2xl font-bold'>{values["incorrectAnswer"]}</p>
                            </div>
                            <div className="flex justify-center my-2">
                                <p className='text-xl mr-2'>Cantidad total de no respondidas:</p>
                                <p className='text-2xl font-bold'>{values["noAnswer"]}</p>
                            </div>
                            <div className="flex justify-center my-2">
                                <p className='text-xl mr-2'>Cantidad Total de respuestas:</p>
                                <p className='text-2xl font-bold'>{values["Total"]}</p>
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
                                    <SemiOpen data={allActive} selected={selected} setSelected={setSelected} size={""}/>
                                </div>
                            )}
                            {option === "historical" && (
                                <div>
                                    <SemiOpen data={allHistorical} selected={selected} setSelected={setSelected} size={""}/>
                                </div>
                            )}
                            {(option === "active" || option === "historical") && (
                                <div>
                                    <button
                                        className="lg:py-4 lg:px-8 lg:mt-10 py-2 px-4 mt-3 rounded-xl border-black border font-bold"
                                        onClick={() => {
                                        setWaitingState(true);
                                        reloadView(false);
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
