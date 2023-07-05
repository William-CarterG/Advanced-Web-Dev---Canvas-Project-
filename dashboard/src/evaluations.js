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

    const [waitingState,setWaitingState] = useState(true);
    useEffect(() => {
        if (fromGroupToEval !== false){
            setEvaluationData("data")
            reloadView(fromGroupToEval)
            
        }else{
            startFetch(`evaluations/`, 'GET', null, function(data) {
                setAllHistorical(Object.values(data))
                setWaitingState(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function reloadView(id){
        let defId = selected["id"];
        if (id !== false){
            defId = id
        }
        startFetch(`dashboard/evaluation/${defId}/`, 'GET', null, function(data) {
            let questionsNumbers = []
            let realQuestionsNumbers = []
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
            if (questionsInfo !== []){
                startFetch(`evaluations/${defId}/`, 'GET', null, function(data) {
                    for (let i in questionsNumbers){
                        startFetch(`tests/${data["test_id"]}/questions/${questionsInfo[i]["question"]}/`, 'GET', null, function(data) {
                            realQuestionsNumbers.push(data["order"])
                            if (realQuestionsNumbers.length === questionsNumbers.length){
                                let diccionario = {"questionsNumbers":realQuestionsNumbers, "correct":correct, "incorrect":incorrect, "noSended":noSended }
                                const length = diccionario.questionsNumbers.length;

                                const indicesOrdenados = Array.from(Array(length).keys()).sort((a, b) => {
                                const aFifth = diccionario.questionsNumbers[a];
                                const bFifth = diccionario.questionsNumbers[b];
                                
                                return aFifth - bFifth;
                                });

                                for (let key in diccionario) {
                                    diccionario[key] = indicesOrdenados.map(index => diccionario[key][index]);
                                }
                                setNewPorcentualDistribution(diccionario)

                                let maxIncorrectIndex = 0;
                                for (let i = 1; i < diccionario.incorrect.length; i++) {
                                if (diccionario.incorrect[i] > diccionario.incorrect[maxIncorrectIndex]) {
                                    maxIncorrectIndex = i;
                                }
                                }

                                const maxIncorrectQuestionNumber = diccionario.questionsNumbers[maxIncorrectIndex];

                                let maxCorrectIndex = 0;
                                for (let i = 1; i < diccionario.correct.length; i++) {
                                if (diccionario.correct[i] > diccionario.correct[maxCorrectIndex]) {
                                    maxCorrectIndex = i;
                                }
                                }

                                const maxCorrectQuestionNumber = diccionario.questionsNumbers[maxCorrectIndex];

                                setNewBestQuestion(maxCorrectQuestionNumber)
                                setNewWorstQuestion(maxIncorrectQuestionNumber)

                            }
                        });
                    }
                });
                
            }
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
            setWaitingState(false);
            setEvaluationData("active")
        });
    }
    useEffect(() => {
        if (evaluationData !== ""){
            reloadView(fromGroupToEval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                <p className='lg:text-9xl text-5xl my-5'>{values["participationInEvaluation"]}%</p>
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
                            <p className='lg:text-5xl text-3xl font-bold my-5'>Nº{values["bestQuestion"]}.</p>
                        </div>
                        <div
                            className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'>Pregunta con peor de resultado.</p>
                            <p className='lg:text-5xl text-3xl font-bold my-5'>Nº{values["worstQuestion"]}.</p>
                        </div>
                        <div className="flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <div className="flex justify-center my-2">
                                <p className='lg:text-xl mr-2'>Cantidad total de correctas:</p>
                                <p className='lg:text-2xl font-bold'>{values["correctAnswer"]}</p>
                            </div>
                            <div className="flex justify-center my-2">
                                <p className='lg:text-xl mr-2'>Cantidad total de incorrectas:</p>
                                <p className='lg:text-2xl font-bold'>{values["incorrectAnswer"]}</p>
                            </div>
                            <div className="flex justify-center my-2">
                                <p className='lg:text-xl mr-2'>Cantidad total de no respondidas:</p>
                                <p className='lg:text-2xl font-bold'>{values["noAnswer"]}</p>
                            </div>
                            <div className="flex justify-center my-2">
                                <p className='lg:text-xl mr-2'>Cantidad Total de respuestas:</p>
                                <p className='lg:text-2xl font-bold'>{values["Total"]}</p>
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
                            <p className='lg:text-9xl  text-2xl lg:mb-10 mt-10'>Seleccione el tipo de evaluacion.</p>
                        </div>
                        <div className="mx-auto w-2/3 my-10">
                            <SemiOpen data={allHistorical} selected={selected} setSelected={setSelected} size={""}/>
                            <button
                                className="lg:py-4 lg:px-8 lg:mt-10 py-2 px-4 mt-10 rounded-xl border-black border font-bold"
                                onClick={() => {
                                    setWaitingState(true);
                                    reloadView(false)
                            }}>Enviar</button>
                        </div>
                    </div>
                )
        } </>
      )}
    </>);
    }

    export default Evaluations;
