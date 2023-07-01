import logo from './logo.svg';
import './App.css';
import StackedBar from './charts/general/stackedBar';
import SemiOpen from './charts/general/comboBox';
import HorizontalChart from './charts/general/horizontalBar';
import PaintedBars from './charts/general/paintedBars';
import Table from './charts/general/table';


function App() {
    return (
        <div className="App">
            <div className='hidden lg:block'>
                <aside
                    className="fixed z-10 top-0 pb-3 px-6 flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 ml-0 w-[25%] xl:w-[20%] 2xl:w-[15%] lg:flex hidden">
                    <div>
                        <div className="-mx-6 px-6 py-4">
                            <div className="flex" >
                                <img src={logo} className="App-logo" alt='logo'/>
                                <div className="pt-2 pl-3 text-2xl font-bold">Dashboard</div>
                            </div>
                        </div>

                        <ul className="space-y-2 tracking-wide mt-8">
                            <li>
                                <div
                                    aria-label="dashboard"
                                    className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                                    <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                                            className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                                        <path
                                            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                                            className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                                        <path
                                            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                                            className="fill-current group-hover:text-sky-300"></path>
                                    </svg>
                                    <span className="-mr-1 font-medium">General</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
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
                                    <span className="group-hover:text-gray-700">Evaluacion</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
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
                                    <span className="group-hover:text-gray-700">Grupos</span>
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
                        <div className="flex justify-between" >
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
                                    aria-label="dashboard"
                                    className="relative px-4 py-3 flex items-center space-x-4 rounded-xl w-[100vw] text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                                    <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                                            className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                                        <path
                                            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                                            className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                                        <path
                                            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                                            className="fill-current group-hover:text-sky-300"></path>
                                    </svg>
                                    <span className="-mr-1 font-medium">General</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
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
                                    <span className="group-hover:text-gray-700">Evaluacion</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
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
                                    <span className="group-hover:text-gray-700">Grupos</span>
                                </div>
                            </li>
                        </ul>
                </nav>
            </div>
            
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                <div className="px-6 pt-5 2xl:container">
                    <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-3">
                        <div className="flex flex-col justify-between py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <div>
                                <p className='text-xl mt-5'> Numero de evaluaciones activas.</p>
                                <p className='text-5xl my-5'>135 evaluaciones.</p>
                            </div>
                            <div>
                                <p className='text-xl'> Numero respuestas diarias completas.</p>
                                <p className='text-5xl my-5'>542 respuestas.</p>
                            </div>
                        </div>
                        <div className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <p className='text-xl'> Distibucion de resultados de todas las evaluaciones, representado en porcentajes.</p>
                            <div className='flex ml-60 justify-center'>
                                <PaintedBars />
                            </div>
                        </div>

                        <div className='flex flex-col justify-between row-span-2 py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div className='mt-5'>
                                <p className='text-xl mt-5'> Porcentaje respondido / evaluaciones activas.</p>
                                <p className='lg:text-9xl text-3xl mt-5'>80%</p>
                            </div>
                            <div>
                                <p className='text-xl'> Estado de los test.</p>
                                <HorizontalChart />
                            </div>
                        </div>
                        <div
                        className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <div className='flex items-center justify-between my-12'>
                                <p> Numero de evaluaciones ya completas para el mes de:</p>
                                <div className='w-72 mr-3'>
                                    <SemiOpen />
                                </div>
                            </div>
                            <p className='text-5xl'>84 evaluaciones.</p>

                        </div>
                        <div className='row-span-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
                            <div className='flex flex-col justify-between'>
                            <div className='pt-2'>
                                <p className='text-xl'> Mejores evaluaciones.</p>
                                <Table color={"bg-[#36a2eb]"}/>
                            </div>
                            <div>
                                <p className='text-xl'> Peores evaluaciones.</p>
                                <Table color={"bg-[#ff6384]"} />
                            </div>
                            </div>
                        </div>
                        <div
                        className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <p className='text-xl'> Resultados segun dificultad de la pregunta.</p>
                            <StackedBar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
