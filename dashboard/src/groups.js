import React, {useState, useEffect} from "react";
import ResultBar from './charts/groups/resultsBar';
import Table from './charts/table';
import SemiOpen from './charts/groups/comboBox';
import Loading from "./loading";
import startFetch from "./API";
import percentajeFormater from "./functions/PercentajeFormater"

function Groups({ws, groupData, setGroupData, setRoute, setFromGroupToEval, setGeneralButton, setEvaluationsButton, setGroupsButton, fromGeneralToGroup}) {
    const [values, setValues] = useState({});    
    const [allGroups, setAllGroups] = useState(null);
    const [selected,setSelected] = useState("");
    const [newPorcentualDistribution, setNewPorcentualDistribution] = useState({questionsNumbers:[1,2,3,4,5,6,7], correct:[1,2,3,4,5,6,7], incorrect:[5,12,5,7,1,2,2]});
    const [newGroupEvaluations, setNewGroupEvaluations] = useState({1: {participant_name:"Matematicas Conicas", finished_tests:-1}, 2:{participant_name:"Mecanica", finished_tests:-1}, 3:{participant_name:"Pensamiento Critico", finished_tests:-1}});
    const [newActive, setNewActive] = useState({1: {participant_name:"Juan Perez", finished_tests:3}, 2:{participant_name:"John Doe", finished_tests:3}, 3:{participant_name:"Andrew Leiva", finished_tests:3}});
    const [newBestTag, setNewBestTag] = useState("");
    const [newWorstTag, setNewWorstTag] = useState("");
    const [newAnswers, setNewAnswers] = useState({1: {participant_name:"Juan Perez", finished_tests:82}, 2:{participant_name:"Andrew Leiva", finished_tests:73}, 3:{participant_name:"John Doe", finished_tests:58}});

    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            "porcentualDistribution": newPorcentualDistribution,
            "groupEvaluations": newGroupEvaluations,
            "Active": newActive,
            "bestTag": newBestTag,
            "worstTag": newWorstTag,
            "Answers": newAnswers,
        }));
    }, [newPorcentualDistribution, newGroupEvaluations, newActive, newBestTag, newWorstTag, newAnswers]);

    const [waitingState,setWaitingState] = useState(true);
    function reloadView(id){
        let defId = selected["id"];
        if (id !== false){
            defId = id
        }
        startFetch(`dashboard/group/${defId}/`, 'GET', null, function(data) {
            let groupEvals = []
            for (let i in data["participation_ranking"]){
                let insideDict = {"name":data["participation_ranking"][i]["participant_name"], "count":data["participation_ranking"][i]["finished_tests"]} 
                groupEvals.push(insideDict)
            }
            setNewActive(groupEvals)

            groupEvals = []
            for (let i in data["results_ranking"]){
                let insideDict = {"name":data["results_ranking"][i]["participant_name"], "count":data["results_ranking"][i]["correct_count"]} 
                groupEvals.push(insideDict)
            }
            setNewAnswers(groupEvals)
            let questionsNumbers = []
            let correct = []
            for (let i in data["group_results_by_tests"]){
                questionsNumbers.push(data["group_results_by_tests"][i]["test__name"])
                correct.push(percentajeFormater(data["group_results_by_tests"][i]["correct_count"]/data["group_results_by_tests"][i]["total_questions"]))
            }
            setNewPorcentualDistribution({"questionsNumbers":questionsNumbers, "correct":correct})
            if (String(data["tags_ranking"]) !== ""){
                setNewBestTag(data["tags_ranking"].slice(0, 1)[0]["question__tags"])
                setNewWorstTag(data["tags_ranking"].reverse().slice(0, 1)[0]["question__tags"])
            }
            startFetch(`evaluations/?search=${defId}`, 'GET', null, function(data) {
                groupEvals = []
                for (let i in data){
                    let insideDict = {"name":data[i]["name"], "count":-1, "id":data[i]["id"]} 
                    groupEvals.push(insideDict)
                }
                setNewGroupEvaluations(groupEvals)
                setWaitingState(false);
                setGroupData("data")
            });
        });
    }
    useEffect(() => {
        if (fromGeneralToGroup !== false){
            setGroupData("data")
            reloadView(fromGeneralToGroup)
        }else{
            startFetch(`courses/`, 'GET', null, function(data) {
                setAllGroups(Object.values(data))
                setWaitingState(false);
            });
        } 
    }, []);
    useEffect(() => {
        if (groupData !== ""){
            reloadView(fromGeneralToGroup);
        }
      }, [ws]);
    return (
    <> {
        waitingState === true && (<Loading/>)
    }
    {
        waitingState === false && (<> {
            groupData !== ""
                ? (
                    <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-3">

                        <div
                            className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                                <div className="mx-8">
                                    <p className='text-xl'>
                                        Distribucion porcentual de los resultados.</p>
                                    <ResultBar values={values["porcentualDistribution"]}/>
                                </div>
                        </div>
                        <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div className='flex flex-col justify-between'>
                                <div className='pt-2'>
                                    <p className='text-xl'>
                                        Evaluaciones del Grupo.</p>
                                    <Table headers={["Evaluaciones",""]} values={values["groupEvaluations"]} color={"bg-gray-500"} buttonColor={" hidden "} setRoute={setRoute} setFromGroupToEval={setFromGroupToEval} setGeneralButton={setGeneralButton} setEvaluationsButton={setEvaluationsButton} setGroupsButton={setGroupsButton}/>
                                </div>
                            </div>
                        </div>
                        <div className='px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div className='flex flex-col justify-between'>
                                <div className='pt-2'>
                                    <p className='text-xl lg:text-3xl'>
                                        Alumnos mas/menos activos.</p>
                                    <Table headers={["Alumnos","Evaluaciones hechas"]} values={values["Active"]} color={"bg-[#36a2eb]"} buttonColor={" bg-[#3691ce] hover:bg-[#1c6ea5] "}/>
                                </div>
                            </div>
                        </div>
                        <div
                            className='flex flex-col justify-center px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-2xl'>
                                Etiqueta con mejores resultados.</p>
                            <p className='lg:text-7xl text-3xl font-bold my-5'>Etiqueta {values["bestTag"]}</p>
                        </div>
                        <div
                            className='flex flex-col justify-center px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-2xl'>
                                Etiqueta con peores resultados.</p>
                            <p className='lg:text-7xl text-3xl font-bold my-5'>Etiqueta {values["worstTag"]}</p>
                        </div>
                        <div className='px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div className='flex flex-col justify-between'>
                                <div className='pt-2'>
                                    <p className='text-xl lg:text-3xl'>
                                        Alumnos con mas/menos resultados correctos.</p>
                                    <Table headers={["Alumnos","Resultados"]} values={values["Answers"]} color={"bg-[#ff6384]"} buttonColor={" bg-[#dd5673] hover:bg-[#d64666] "}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div
                        className='flex flex-col justify-center lg:h-[93vh] h-[60vh] text-gray-600 rounded-xl border border-gray-200'>
                        <div className='mx-auto lg:w-2/3 w-full'>
                            <p className='lg:text-9xl  text-2xl lg:mb-10 mt-10'>Seleccione el grupo.</p>
                        </div>
                        <div className="mx-auto w-2/3 my-10">
                            <SemiOpen data={allGroups} selected={selected} setSelected={setSelected}/>
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

    export default Groups;
