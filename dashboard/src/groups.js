function Groups() {
  return (
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
        
    </div>
  );
}

export default Groups;
