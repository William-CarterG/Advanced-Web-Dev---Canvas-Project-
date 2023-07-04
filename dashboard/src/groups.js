import React, {useState, useEffect} from "react";
import ResultBar from './charts/groups/resultsBar';
import Table from './charts/groups/table';
import SemiOpen from './charts/groups/comboBox';
import Loading from "./loading";

function Groups({groupData, setGroupData}) {
    const [values, setValues] = useState({});
    const [newPorcentualDistribution, setNewPorcentualDistribution] = useState({questionsNumbers:[1,2,3,4,5,6,7], correct:[1,2,3,4,5,6,7], incorrect:[5,12,5,7,1,2,2]});
    const [newGroupEvaluations, setNewGroupEvaluations] = useState({1: {name:"Matematicas Conicas", amount:-1}, 2:{name:"Mecanica", amount:-1}, 3:{name:"Pensamiento Critico", amount:-1}});
    const [newMoreActive, setNewMoreActive] = useState({1: {name:"Juan Perez", amount:3}, 2:{name:"John Doe", amount:3}, 3:{name:"Andrew Leiva", amount:3}});
    const [newLessActive, setNewLessActive] = useState({1: {name:"Mathew Ñuñez", amount:0}, 2:{name:"Joe Dae", amount:0}, 3:{name:"Thomas Zie", amount:0}});
    const [newBestTag, setNewBestTag] = useState("A");
    const [newWorstTag, setNewWorstTag] = useState("D");
    const [newBestAnswers, setNewBestAnswers] = useState({1: {name:"Juan Perez", amount:82}, 2:{name:"Andrew Leiva", amount:73}, 3:{name:"John Doe", amount:58}});
    const [newWorstAnswers, setNewWorstAnswers] = useState({1: {name:"Mathew Ñuñez", amount:0}, 2:{name:"Joe Dae", amount:0}, 3:{name:"Thomas Zie", amount:0}});

    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            "porcentualDistribution": newPorcentualDistribution,
            "groupEvaluations": newGroupEvaluations,
            "moreActive": newMoreActive,
            "lessActive": newLessActive,
            "bestTag": newBestTag,
            "worstTag": newWorstTag,
            "bestAnswers": newBestAnswers,
            "worstAnswers": newWorstAnswers
        }));
    }, [newPorcentualDistribution, newGroupEvaluations, newMoreActive, newLessActive, newBestTag, newWorstTag, newBestAnswers, newWorstAnswers]);



    const [waitingState,setWaitingState] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setWaitingState(false);
        }, 2000);
    }, []);
    
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
                            <p className='text-xl'>
                                Distribucion porcentual de los resultados.</p>
                            <ResultBar values={values["porcentualDistribution"]}/>
                        </div>
                        <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div className='flex flex-col justify-between'>
                                <div className='pt-2'>
                                    <p className='text-xl'>
                                        Evaluaciones del Grupo.</p>
                                    <Table headers={["Evaluaciones",""]} values={values["groupEvaluations"]} color={"bg-gray-500"}/>
                                </div>
                            </div>
                        </div>
                        <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div className='flex flex-col justify-between'>
                                <div className='pt-2'>
                                    <p className='text-xl'>
                                        Alumnos mas activos.</p>
                                    <Table headers={["Alumnos","Evaluaciones hechas"]} values={values["moreActive"]} color={"bg-[#36a2eb]"}/>
                                </div>
                            </div>
                        </div>
                        <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div className='flex flex-col justify-between'>
                                <div className='pt-2'>
                                    <p className='text-xl'>
                                        Alumnos menos activos.</p>
                                    <Table headers={["Alumnos","Evaluaciones hechas"]}  values={values["lessActive"]} color={"bg-[#36a2eb]"}/>
                                </div>
                            </div>
                        </div>
                        <div
                            className='flex flex-col justify-center px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-2xl'>
                                Etiqueta con mejores resultados.</p>
                            <p className='lg:text-7xl text-2xl font-bold my-5'>Etiqueta {values["bestTag"]}</p>
                        </div>
                        <div
                            className='flex flex-col justify-center px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-2xl'>
                                Etiqueta con peores resultados.</p>
                            <p className='lg:text-7xl text-2xl font-bold my-5'>Etiqueta {values["worstTag"]}</p>
                        </div>
                        <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div className='flex flex-col justify-between'>
                                <div>
                                    <p className='text-xl'>
                                        Alumnos con mejores resultados.</p>
                                    <Table headers={["Alumnos","Promedio porcentual de resultados"]}  values={values["bestAnswers"]} color={"bg-[#ff6384]"}/>
                                </div>
                            </div>
                        </div>
                        <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div className='flex flex-col justify-between'>
                                <div>
                                    <p className='text-xl'>
                                        Alumnos con peores resultados.</p>
                                    <Table headers={["Alumnos","Promedio porcentual de resultados"]}  values={values["worstAnswers"]} color={"bg-[#ff6384]"}/>
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
                            <SemiOpen/>
                            <button
                                className="lg:py-4 lg:px-8 lg:mt-10 py-2 px-4 mt-10 rounded-xl border-black border font-bold"
                                onClick={() => {
                                setWaitingState(true);
                                setTimeout(() => {
                                    setWaitingState(false);
                                    setGroupData("data")
                                }, 2000);
                            }}>Enviar</button>
                        </div>
                    </div>
                )
        } </>  
    )}
    </>);
    }

    export default Groups;
