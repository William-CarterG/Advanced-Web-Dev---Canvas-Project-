import React, { useState } from 'react';
import QuestionTabs from './question/QuestionTabs';

// Credits to TailwindComponents user 'khatabwedaa' for 
// creating a good part of this modal window. 
function AddTestQuestion() {
    const [modelOpen, setModelOpen] = useState(false);
    const [editingTestName, setEditingTestName] = useState(false);
    const [TestName, setTestName] = useState("Client-side Developing Tools");

    const handleTestNameSaveClick = () => {
        setEditingTestName(false);
        // Perform any additional save logic here if needed
    };

    const toggleModelOpen = () => {
        setModelOpen(!modelOpen);
      };

    const handleTestDetails = (e) => {
    // Be careful with when you submit Test, because
    // there is a back button!!
    toggleModelOpen();
    console.log("View test");
    };

    const questionHeaders = ["Pregunta", "Tipo"];
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
                <QuestionTabs />
            </div>
        </div>
    </div>
    );
};

export default AddTestQuestion;
