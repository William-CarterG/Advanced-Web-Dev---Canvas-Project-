import ResultBar from './charts/groups/resultsBar';
import Table from './charts/groups/table';


function Groups() {
  return (
    <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-3">

      <div className='py-2 px-2 lg:col-span-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
        <p className='text-xl'> Distribucion porcentual de los resultados.</p>
        <ResultBar />
      </div>
      <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
        <div className='flex flex-col justify-between'>
          <div className='pt-2'>
              <p className='text-xl'> Evaluaciones del Grupo.</p>
              <Table color={"bg-[#c9cbcf]"}/>
          </div>
        </div>
      </div>
      <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
        <div className='flex flex-col justify-between'>
          <div className='pt-2'>
              <p className='text-xl'> Alumnos mas activos.</p>
              <Table color={"bg-[#36a2eb]"}/>
          </div>
        </div>
      </div>
      <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
        <div className='flex flex-col justify-between'>
          <div className='pt-2'>
              <p className='text-xl'> Alumnos con mejores resultados.</p>
              <Table color={"bg-[#36a2eb]"}/>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
          <p className='text-2xl'> Etiqueta con mejores resultados.</p>
          <p className='text-7xl my-5'>Etiqueta A</p>
      </div>
      <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
        <div className='flex flex-col justify-between'>
          <div>
              <p className='text-xl'> Alumnos menos activos.</p>
              <Table color={"bg-[#ff6384]"} />
          </div>
        </div>
      </div>
      <div className='px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
        <div className='flex flex-col justify-between'>
          <div>
              <p className='text-xl'> Alumnos con peores resultados.</p>
              <Table color={"bg-[#ff6384]"} />
          </div>
        </div>      
      </div>
      <div className='flex flex-col justify-center px-2 text-gray-600 rounded-xl border border-gray-200 bg-white'>
          <p className='text-2xl'> Etiqueta con peores resultados.</p>
          <p className='text-7xl my-5'>Etiqueta D</p>
      </div>
    </div>
  );
}

export default Groups;
