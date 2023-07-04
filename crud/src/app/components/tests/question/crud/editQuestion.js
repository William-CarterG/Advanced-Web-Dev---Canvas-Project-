import React, { useState, useEffect } from 'react';
import RenderQuestion from '../util/renderQuestion';
import RenderAlternatives from '../util/renderAlternatives';
import Tags from '../../tags/Tags';
import startFetch from '../../../../../API';
// import startFetch from '../../../../../API';

const EditTestQuestion = ({ toggleModelOpen, data, testId, setTests }) => {
    const [question, setQuestion] = useState('');
    const [alternatives, setAlternatives] = useState([]);
    const [answer, setAnswer] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [tags, setTags] = useState([]);

    const handleSaveEdit = () => {
        /*
        let realCorrect = answer;
        if(data.question_type === "Verdadero o Falso"){
            let parent = document.getElementById("alternativa"+correct).parentNode;
            realCorrect = (parent.childNodes[1].firstChild.value);
        }
        */
        //formatedChoices
        let body = {"question_type": data.question_type,"difficulty":difficulty, "text": question, "correct_answer": answer, "tags": tags};
        startFetch(`tests/${testId}/questions/`, 'PATCH', JSON.stringify(body), function(data) {
            /*
            if (!formatedChoices){
                setFormatedChoices([correct]);
            }
            */
            body = {"options": alternatives}
            startFetch(`tests/${testId}/questions/${data.id}/answer-options/`, 'PATCH', JSON.stringify(body), function(data) {
                startFetch(`tests/`, 'GET', null, function(data) {
                    setTests(data);
                });
            });
        });
        toggleModelOpen();
    };

    useEffect(() => {
        console.log(data);
        setQuestion(data.text);

        setAlternatives(data.options);

        setAnswer(data.correct_answer);

        if (data.difficulty === 'Baja') {
            setDifficulty(0);
        } else if (data.difficulty === 'Media') {
            setDifficulty(1);
        } else if (data.difficulty === 'Alta') {
            setDifficulty(2);
        }  
    }, [data]);

    return (
        <div
        className="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
                <div onClick={toggleModelOpen}
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40"
                aria-hidden="true"
                />
                <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
                    <div className="flex items-center justify-between space-x-2">
                        <h1 className="text-xl font-bold text-gray-800">
                        Editar Pregunta 
                        </h1>
    
                        <button
                        onClick={toggleModelOpen}
                        className="text-gray-600 focus:outline-none hover:text-gray-700"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        </button>
                    </div>
                    <p className="mb-2 text-sm text-gray-500 ">
                        Acá puedes editar el contenido de la pregunta
                    </p>
                    {data.question_type !== 'Matriz' && (
                        <div className="mb-6">
                        <label htmlFor="questionName" className="block text-gray-600">
                            Pregunta:
                        </label>
                        <RenderQuestion data={data}/>
                        </div>
                    )}
                    <div className='flex flex-row'>
                        <div>
                            {data.question_type !== 'numerical' ? (
                                <label htmlFor="alternatives" className=" block text-gray-600">
                                Alternativas:
                                </label>
                            ):(
                                <label htmlFor="alternatives" className="mb-2 block text-gray-600">
                                Respuesta:
                                </label>
                            )}
                            <RenderAlternatives data={data} setAlternatives={setAlternatives} setAnswer={setAnswer} />
                        </div>
                        <div className="ml-10">
                            <label htmlFor="difficulty" className="mr-2 mb-2 block text-gray-600">
                                Dificultad: {difficulty}
                            </label>
                            <select
                                id="difficulty"
                                onChange={(e) => setDifficulty(e.target.value)}
                                value={parseInt(difficulty, 10)} // Convert difficulty to string and set it as the value
                                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                            >
                                <option value={0}>Fácil</option>   
                                <option value={1}>Medio</option>
                                <option value={2}>Difícil</option>
                            </select>
                        </div>
                    </div>
                    <Tags sendTags={setTags} prevTags={data.tags} />
                    <div className="flex justify-end mt-6">
                        <button
                        className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-m tracking-wide text-white 
                        capitalize transition-colors duration-200 transform bg-indigo-500 rounded-md focus:outline-none 
                        focus:ring focus:ring-opacity-50"
                        onClick={handleSaveEdit}>
                            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                            </svg>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTestQuestion;
