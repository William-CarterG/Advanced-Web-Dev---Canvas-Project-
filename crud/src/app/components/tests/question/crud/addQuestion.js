import React, { useState, useEffect } from 'react';
import QuestionTabs from '../util/QuestionTabs';
import startFetch from '../../../../../API';


// Credits to TailwindComponents user 'khatabwedaa' for 
// creating a good part of this modal window. 
function AddTestQuestion( {toggleModelOpen, setTests, item} ) {
    const [choices, setChoices] = useState([]);
    const [correct, setCorrect] = useState([]);
    const [name, setName] = useState([]);
    const [difficulty, setDifficulty] = useState(1);
    const [type, setType] = useState(0);
    const [formatedChoices, setFormatedChoices] = useState([]);
    const [tags, setTags] = useState([]);


    useEffect(() => {
        let s = ""
        for (let i in choices){
            if (choices[i] !== ""){
                s += choices[i]+";"
            }
        }
        let newStr = s.slice(0, s.length - 1);
        setFormatedChoices(newStr)
    }, [choices]);

    const handleTestNameSaveClick = () => {
        let realCorrect = correct;
        if(type === 0){
            let parent = document.getElementById("a"+correct).parentNode;
            realCorrect = (parent.childNodes[1].firstChild.value);
        }
        //formatedChoices
        let body = {"question_type":type,"difficulty":difficulty, "text": name, "correct_answer":realCorrect, "tags": tags};
        console.log(body)
        startFetch(`tests/${item.id}/questions/`, 'POST', JSON.stringify(body), function(data) {
            if (!formatedChoices){
                setFormatedChoices([correct]);
            }
            body = {"options": formatedChoices}
            startFetch(`tests/${item.id}/questions/${data.id}/answer-options/`, 'POST', JSON.stringify(body), function(data) {
                startFetch(`tests/`, 'GET', null, function(data) {
                    setTests(data);
                });
            });
        });
        toggleModelOpen();
    };

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
                        Crear Pregunta
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
                        Acá puedes crear la pregunta y añadirla a tu prueba.
                    </p>
                    <QuestionTabs toggleMenu={toggleModelOpen} setChoices={setChoices} setDifficulty={setDifficulty} setName={setName} setCorrect={setCorrect} setType={setType} setTags={setTags} prevTags={''}/>
                    <div className="flex justify-end">
                        <button href="*"
                        className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-m tracking-wide text-white 
                        capitalize transition-colors duration-200 transform bg-indigo-500 rounded-md focus:outline-none 
                        focus:ring focus:ring-opacity-50"
                        onClick={handleTestNameSaveClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                            />
                        </svg>
                        Crear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTestQuestion;
