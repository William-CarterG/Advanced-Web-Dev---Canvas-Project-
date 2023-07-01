import PaintedBars from './charts/general/paintedBars';

function Evaluations() {
  return (
    <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-3">

        <div className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
            <p className='text-xl'> Distibucion de resultados de todas las evaluaciones, representado en porcentajes.</p>
            <div className='flex ml-60 justify-center'>
                <PaintedBars />
            </div>
        </div>

    </div>
  );
}

export default Evaluations;
