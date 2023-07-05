import React, { useState, useEffect } from "react";
import StackedBar from './charts/general/stackedBar';
import SemiOpenMount from './charts/general/mountComboBox';
import SemiOpen from './charts/evaluations/evalComboBox';
import HorizontalChart from './charts/general/horizontalBar';
import Table from './charts/table';
import Loading from "./loading";
import startFetch from "./API";
import percentajeFormater from "./functions/PercentajeFormater"

function General({ws, setRoute, setFromGroupToEval, setFromGeneralToGroup, setGeneralButton, setEvaluationsButton, setGroupsButton}) {
    const [values, setValues] = useState({});
    const [allEvaluations, setEvaluations] = useState([{url: 'http://35.223.95.177:8000/courses/1/', id: 1, name: 'Seed Course', members_count: 5},{url: 'http://35.223.95.177:8000/courses/2/', id: 2, name: 'G1', members_count: 9},{url: 'http://35.223.95.177:8000/courses/3/', id: 3, name: 'G2', members_count: 10},{url: 'http://35.223.95.177:8000/courses/4/', id: 4, name: 'G3', members_count: 10}]);
    const [evaluationSelected,setEvaluationSelected] = useState("");
    const [allCourses, setAllCourses] = useState([{url: 'http://35.223.95.177:8000/courses/1/', id: 1, name: 'Seed Course', members_count: 5},{url: 'http://35.223.95.177:8000/courses/2/', id: 2, name: 'G1', members_count: 9},{url: 'http://35.223.95.177:8000/courses/3/', id: 3, name: 'G2', members_count: 10},{url: 'http://35.223.95.177:8000/courses/4/', id: 4, name: 'G3', members_count: 10}]);
    const [courseSelected,setCourseSelected] = useState("");
    const [newHorizontalBar, setNewHorizontalBar] = useState({answering:0, answered:0, notAnswer:0});
    const [newActiveEvaluations, setNewActiveEvaluations] = useState(135);
    const [newCompletedActiveEvaluations, setNewCompletedActiveEvaluations] = useState(51);
    const [newDailyAnswers, setNewDailyAnswers] = useState(542);
    const [newHistoricalParticipation, setNewHistoricalParticipation] = useState(100);
    const [newAskedVsTotal, setNewAskedVsTotal] = useState(80);
    const [newMountEvaluations, setNewMountEvaluations] = useState(84);
    const [newCompleteMountEvaluation, setNewCompleteMountEvaluation] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [newEvaluations, setNewEvaluations] = useState({0: {"participant_name":"Matematicas Conicas", "finished_tests":78}, 1:{"participant_name":"Mecanica", "finished_tests":73}, 2:{"participant_name":"Pensamiento Critico", "finished_tests":71}});
    const [newResultByDifficulty, setNewResultByDifficulty] = useState({0: {"correct":0,"incorrect":0,"noSended":0}, 1: {"correct":0,"incorrect":0,"noSended":0}, 2:{"correct":0,"incorrect":0,"noSended":0}});
    
    useEffect(() => {
        startFetch(`courses/`, 'GET', null, function(data) {
            setAllCourses(Object.values(data))
        });
        startFetch(`evaluations/`, 'GET', null, function(data) {
            setEvaluations(Object.values(data))
        });
    }, []);

    useEffect(() => {
        setValues(prevValues => ({
          ...prevValues,
            "horizontalBar": newHorizontalBar,
            "activeEvaluations": newActiveEvaluations,
            "completedActiveEvaluations": newCompletedActiveEvaluations,
            "dailyAnswers": newDailyAnswers,
            "historicalParticipation": newHistoricalParticipation,
            "askedVsTotal": newAskedVsTotal,
            "mountEvaluations": newMountEvaluations,
            "completeMountEvaluation": newCompleteMountEvaluation,
            "evaluations": newEvaluations,
            "resultByDifficulty": newResultByDifficulty,

        }));
    }, [newHorizontalBar, newActiveEvaluations, newDailyAnswers, newCompletedActiveEvaluations, newHistoricalParticipation, newAskedVsTotal, newMountEvaluations, newCompleteMountEvaluation, newEvaluations, newResultByDifficulty]);
    
    
    const [waitingState, setWaitingState] = useState(true);
    function reloadView(){
        startFetch(`dashboard/general/`, 'GET', null, function(data) {
            setNewActiveEvaluations(data[0]["active_evaluations"])
            setNewCompletedActiveEvaluations(data[0]["completed_active_evaluations"])
            setNewDailyAnswers(data[0]["daily_completed_evaluations"][0]["count"])
            setNewAskedVsTotal(percentajeFormater(data[0]["active_evaluations_answered_percentage"]))
            let difResults = {0:{correct:0,incorrect:0,noSended:0},1:{correct:0,incorrect:0,noSended:0},2:{correct:0,incorrect:0,noSended:0}}
            let dif = Object.values(data[0]["results_by_question_difficulty"])
            for (let i in dif){
                difResults[dif[i]["difficulty"]]["correct"] = dif[i]["c"]
                difResults[dif[i]["difficulty"]]["incorrect"] = dif[i]["i"]
                difResults[dif[i]["difficulty"]]["noSended"] = dif[i]["n"]
            }
            setNewResultByDifficulty(difResults)
            setNewHorizontalBar({answering:data[0]["started_active_evaluations"], answered:data[0]["completed_active_evaluations"], notAnswer:data[0]["never_started_active_evaluations"]})
            setNewHistoricalParticipation(percentajeFormater(data[0]["historical_participation_results"]))
            let mountValues = [0,0,0,0,0,0,0,0,0,0,0,0]
            let mount = Object.values(data[0]["monthly_evaluations"])
            for (let i in mount){
                mountValues[mount[i]["month"]-1] = mount[i]["total"]
            }
            setNewCompleteMountEvaluation(mountValues)
            let arrayBestWorst = Object.entries(data[0]["historical_best_worst_results"]).map(([name, count]) => {
                return { name, count };
            });
            setNewEvaluations(arrayBestWorst.reverse())
            setWaitingState(false);
        });
    }

    useEffect(() => {
        reloadView();
      }, [ws]);

    return (
        <>
        {waitingState === true && (<Loading/>)}
        {waitingState === false && (
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-3">
            <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                <div className='flex flex-col justify-center h-full'>
                    <div>
                        <p className='text-lg'>Todas las evaluaciones.</p>
                        <div className="flex justify-center">
                            <SemiOpen data={allEvaluations} selected={evaluationSelected} setSelected={setEvaluationSelected} size={" text-base a" }/>
                            <button
                                className="relative right-0 lg:py-2 lg:px-4 px-2 mt-1 rounded-xl border-black border font-bold hover:bg-slate-500 hover:text-white"
                                onClick={() => {
                                    setFromGroupToEval(evaluationSelected["id"])
                                    setGeneralButton("")
                                    setEvaluationsButton("bg-gradient-to-r from-[#36a2eb] to-[#ff6384] text-white font-bold")
                                    setGroupsButton("")
                                    setRoute("evaluations")
                                }}>
                                    Ir
                            </button>
                        </div>
                    </div>
                    <div className="mt-10">
                        <p className='text-lg'>Todos los cursos.</p>
                        <div className="flex justify-center">
                            <SemiOpen data={allCourses} selected={courseSelected} setSelected={setCourseSelected} size={" text-base a" }/>
                            <button
                                className="relative right-0 lg:py-2 lg:px-4 px-2 mt-1 rounded-xl border-black border font-bold hover:bg-slate-500 hover:text-white"
                                onClick={() => {
                                    setFromGeneralToGroup(courseSelected["id"])
                                    setGeneralButton("")
                                    setEvaluationsButton("")
                                    setGroupsButton("bg-gradient-to-r from-[#36a2eb] to-[#ff6384] text-white font-bold")
                                    setRoute("groups")
                                }}>
                                    Ir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                <div>
                    <p className='lg:text-3xl text-lg'>Participacion historica.</p>
                    <p className='lg:text-9xl lg:my-1 text-xl font-bold'>{values["historicalParticipation"]}%</p>
                </div>
            </div>
            <div className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                <p className='text-xl'>Resultados segun dificultad de la pregunta.</p>
                <StackedBar values={values["resultByDifficulty"]}/>
            </div>
            <div className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                <div>
                <p className='text-xl mt-5'>Porcentaje respondido en funcion del total.</p>
                <p className='lg:text-9xl text-3xl font-bold lg:my-5 my-2'>{values["askedVsTotal"]}%</p>
                </div>
            </div>
            <div className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                <div className="flex flex-col justify-center">
                    <div className='flex items-center justify-between lg:my-12 my-4'>
                        <p className="lg:text-base text-sm">Numero de evaluaciones ya completas para el mes de:</p>
                        <div className='w-72 mr-3'>
                            <SemiOpenMount values={values["completeMountEvaluation"]} setNewMountEvaluations={setNewMountEvaluations}/>
                        </div>
                    </div>
                    <div>
                        <p className='lg:text-5xl font-bold text-lg'>{values["mountEvaluations"]} evaluaciones.</p>
                    </div>
                </div>
            </div>
            <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                <div className='flex flex-col justify-center h-full'>
                <div>
                    <p className='text-xl mb-2'>Mejores evaluaciones.</p>
                    <Table headers={["Nombre de evaluacion","Cantidad de correctas"]}  values={values["evaluations"]} color={"bg-[#6b7280]"} buttonColor={" bg-[#5b606b] hover:bg-[#52555c] "}/>
                </div>
                </div>
            </div>
            <div className="py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                <p className='text-xl'>Estado de todas las pruebas de los alumnos:</p>
                <div className="hidden lg:block">
                    <HorizontalChart values={values["horizontalBar"]} axis={'y'} desc={["Respuestas","Estados"]}/>
                </div>
                <div className="lg:hidden">
                    <HorizontalChart values={values["horizontalBar"]} axis={'x'} desc={["Estados","Respuestas"]}/>
                </div>
            </div>
           
            <div className="flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                <div>
                <p className='lg:text-2xl text-lg'>Numero de evaluaciones activas:</p>
                <p className='lg:text-5xl lg:my-1 text-xl font-bold'>{values["activeEvaluations"]}</p>
                </div>
                <div className="mt-5">
                <p className='lg:text-2xl text-lg'>Numero respuestas diarias completas:</p>
                <p className='lg:text-5xl lg:my-1  text-xl font-bold'>{values["dailyAnswers"]}</p>
                </div>
            </div>
            </div>
        )}
        </>
  );
}

export default General;
