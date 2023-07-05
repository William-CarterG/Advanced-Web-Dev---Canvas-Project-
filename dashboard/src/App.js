import logo from './logo.svg';
import './App.css';
import General from './general';
import Evaluations from './evaluations';
import Groups from './groups';
import {useState, useEffect} from "react";

function App() {
    const [socketSignal,setSocketSignal] = useState(0);
    const [fromGroupToEval,setFromGroupToEval] = useState(false);
    const [fromGeneralToGroup,setFromGeneralToGroup] = useState(false);
    const [generalButton,setGeneralButton] = useState("bg-gradient-to-r from-[#36a2eb] to-[#ff6384] text-white font-bold");
    const [evaluationsButton,setEvaluationsButton] = useState("");
    const [groupsButton,setGroupsButton] = useState("");
    const [route,setRoute] = useState('general');
    const [evaluationData,setEvaluationData] = useState('');
    const [groupData,setGroupData] = useState('');

    useEffect(() => {
        const ws = new WebSocket('ws://35.223.95.177:8000/ws/dashboard/');
        ws.addEventListener("message", () => {
          setSocketSignal(prevSignal => prevSignal + 1);
        });
      }, []);

    const renderDashboard = () => {
        switch (route) {
            case 'general':
                return <General ws={socketSignal} setFromGroupToEval={setFromGroupToEval} setFromGeneralToGroup={setFromGeneralToGroup} setRoute={setRoute} setGeneralButton={setGeneralButton} setEvaluationsButton={setEvaluationsButton} setGroupsButton={setGroupsButton}/>;
            case 'evaluations':
                return <Evaluations
                    ws={socketSignal}
                    evaluationData={evaluationData}
                    setEvaluationData={setEvaluationData}
                    fromGroupToEval={fromGroupToEval}/>;
            case 'groups':
                return <Groups  ws={socketSignal} groupData={groupData} setGroupData={setGroupData} setFromGroupToEval={setFromGroupToEval} setRoute={setRoute} setGeneralButton={setGeneralButton} setEvaluationsButton={setEvaluationsButton} setGroupsButton={setGroupsButton} fromGeneralToGroup={fromGeneralToGroup}/>;
            default:
                // do nothing
        }
    };



    return (
        <div className="App">
            <div className='hidden lg:block'>
                <aside
                    className="fixed z-10 top-0 pb-3 px-6 flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 ml-0 w-[25%] xl:w-[20%] 2xl:w-[15%] lg:flex hidden">
                    <div>
                        <div className="-mx-6 px-6 py-4">
                            <div className="flex">
                                <img src={logo} className="App-logo" alt='logo'/>
                                <div className="pt-2 pl-3 text-2xl font-bold">Dashboard</div>
                            </div>
                        </div>

                        <ul className="space-y-2 tracking-wide mt-8">
                            <li>
                                <div
                                    id="generalButton"
                                    aria-label="dashboard"
                                    className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl group hover:font-bold ${generalButton}`}
                                    onClick={() => {
                                    setGeneralButton("bg-gradient-to-r from-[#36a2eb] to-[#ff6384] text-white font-bold")
                                    setEvaluationsButton("")
                                    setGroupsButton("")
                                    setFromGeneralToGroup(false)
                                    setFromGroupToEval(false)
                                    setRoute('general')
                                }}>
                                    <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                                            className="fill-current text-gray-400 group-hover:text-cyan-100 dark:fill-slate-600"
                                            fillRule="evenodd"
                                            clipRule="evenodd"></path>
                                        <path
                                            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                                            className="fill-current text-gray-200 group-hover:text-cyan-300"></path>
                                        <path
                                            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                                            className="fill-current group-hover:text-sky-300"></path>
                                    </svg>
                                    <span>General</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    id="evaluationsButton"
                                    className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:font-bold ${evaluationsButton}`}
                                    onClick={() => {
                                    setGeneralButton("")
                                    setEvaluationsButton("bg-gradient-to-r from-[#36a2eb] to-[#ff6384] text-white font-bold")
                                    setGroupsButton("")
                                    setEvaluationData("")
                                    setFromGeneralToGroup(false)
                                    setFromGroupToEval(false)
                                    setRoute('evaluations')
                                }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            className="fill-current text-gray-300 group-hover:text-cyan-300"
                                            fillRule="evenodd"
                                            d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                                            clipRule="evenodd"/>
                                        <path
                                            className="fill-current text-gray-600 group-hover:text-cyan-600"
                                            d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"/>
                                    </svg>
                                    <span>Evaluacion</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    id="groupsButton"
                                    className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:font-bold ${groupsButton}`}
                                    onClick={() => {
                                    setGeneralButton("")
                                    setEvaluationsButton("")
                                    setGroupsButton("bg-gradient-to-r from-[#36a2eb] to-[#ff6384] text-white font-bold")
                                    setGroupData("")
                                    setFromGeneralToGroup(false)
                                    setFromGroupToEval(false)
                                    setRoute('groups')
                                }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            className="fill-current text-gray-600 group-hover:text-cyan-600"
                                            fillRule="evenodd"
                                            d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                            clipRule="evenodd"/>
                                        <path
                                            className="fill-current text-gray-300 group-hover:text-cyan-300"
                                            d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
                                    </svg>
                                    <span>Grupos</span>
                                </div>
                            </li>
                        </ul>

                    </div>

                    <div className="text-center space-x-4">
                        <h5 className="hidden text-xl font-semibold text-gray-600 lg:block mt-44">Javier Muñoz</h5>
                        <span className="hidden text-gray-400 lg:block">Admin</span>
                    </div>

                </aside>
            </div>
            <div className='lg:hidden'>
                <nav>
                    <div className="px-6 py-2">
                        <div className="flex justify-between">
                            <div className='flex'>
                                <img src={logo} className="App-logo -mx-6" alt='logo'/>
                                <div className="pt-3 mx-4 text-lg font-bold">Dashboard</div>
                            </div>
                            <h5 className=" text-xl font-semibold text-gray-600 my-auto ">Javier Muñoz</h5>
                        </div>
                    </div>
                    <ul className="tracking-wide">
                            <li>
                                <div
                                    id="generalButton"
                                    aria-label="dashboard"
                                    className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl group hover:font-bold ${generalButton}`}
                                    onClick={() => {
                                    setGeneralButton("bg-gradient-to-r from-[#36a2eb] to-[#ff6384] text-white font-bold")
                                    setEvaluationsButton("")
                                    setGroupsButton("")
                                    setFromGeneralToGroup(false)
                                    setFromGroupToEval(false)
                                    setRoute('general')
                                }}>
                                    <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                                            className="fill-current text-gray-400 group-hover:text-cyan-100 dark:fill-slate-600"
                                            fillRule="evenodd"
                                            clipRule="evenodd"></path>
                                        <path
                                            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                                            className="fill-current text-gray-200 group-hover:text-cyan-300"></path>
                                        <path
                                            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                                            className="fill-current group-hover:text-sky-300"></path>
                                    </svg>
                                    <span>General</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    id="evaluationsButton"
                                    className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:font-bold ${evaluationsButton}`}
                                    onClick={() => {
                                    setGeneralButton("")
                                    setEvaluationsButton("bg-gradient-to-r from-[#36a2eb] to-[#ff6384] text-white font-bold")
                                    setGroupsButton("")
                                    setEvaluationData("")
                                    setFromGeneralToGroup(false)
                                    setFromGroupToEval(false)
                                    setRoute('evaluations')
                                }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            className="fill-current text-gray-300 group-hover:text-cyan-300"
                                            fillRule="evenodd"
                                            d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                                            clipRule="evenodd"/>
                                        <path
                                            className="fill-current text-gray-600 group-hover:text-cyan-600"
                                            d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"/>
                                    </svg>
                                    <span>Evaluacion</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    id="groupsButton"
                                    className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:font-bold ${groupsButton}`}
                                    onClick={() => {
                                    setGeneralButton("")
                                    setEvaluationsButton("")
                                    setGroupsButton("bg-gradient-to-r from-[#36a2eb] to-[#ff6384] text-white font-bold")
                                    setGroupData("")
                                    setFromGeneralToGroup(false)
                                    setFromGroupToEval(false)
                                    setRoute('groups')
                                }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            className="fill-current text-gray-600 group-hover:text-cyan-600"
                                            fillRule="evenodd"
                                            d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                            clipRule="evenodd"/>
                                        <path
                                            className="fill-current text-gray-300 group-hover:text-cyan-300"
                                            d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
                                    </svg>
                                    <span>Grupos</span>
                                </div>
                            </li>
                        </ul>
                </nav>
            </div>

            <div className="ml-auto mt-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                <div className="px-6 lg:py-5 py-2 2xl:container">
                    {renderDashboard()}
                </div>
            </div>
        </div>
    );
}

export default App;
