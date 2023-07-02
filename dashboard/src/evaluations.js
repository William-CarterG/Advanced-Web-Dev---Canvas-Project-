import StackedBarParticipation from './charts/evaluations/stackedBarParticipation';
import StackedBarDifficulty from './charts/evaluations/stackedBarDifficulty';
import StackedBarTags from './charts/evaluations/stackedBarTags';
import ResultBar from './charts/evaluations/resultsBar';

function Evaluations() {
  return (
    <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-3">

        <div className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
          <p className='text-xl'> Participacion de la evaluacion.</p>
          <StackedBarParticipation />
        </div>
        <div className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
          <p className='text-xl'> Pregunta con mejor promedio de resultado.</p>
          <p className='text-5xl my-5'>Pregunta nº2</p>
        </div>
        <div className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
            <p className='text-xl'> Resultados segun la dificultad de la pregunta.</p>
            <StackedBarDifficulty />
        </div>
        <div className="py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white">
            <p className='text-xl'> Resultados segun la etiqueta de la pregunta.</p>
            <StackedBarTags />
        </div>
        <div className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
          <p className='text-xl'> Pregunta con peor promedio de resultado.</p>
          <p className='text-5xl my-5'>Pregunta nº4</p>
        </div>
        <div className='flex flex-col justify-center py-2 px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
          <div>
            <p className='text-xl'> Promedio de la evaluacion actual.</p>
            <p className='text-5xl my-5'>77%</p>
          </div>
          <div>
            <p className='text-xl'> Promedio de todas las evaluaciones historicas.</p>
            <p className='text-5xl my-5'>82%</p>
          </div>
        </div>
        <div className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
          <p className='text-xl'> Distribucion porcentual de los resultados.</p>
          <ResultBar />
        </div>
    </div>
  );
}

export default Evaluations;
