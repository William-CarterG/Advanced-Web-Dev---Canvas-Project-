const Finished = ({index}) => {
  let correctValue = parseInt(localStorage.getItem('correct'));
  console.log(correctValue +"/"+ index)
  function calcularPorcentaje(dividendo, divisor) {
    var resultado = (dividendo / divisor) * 100;
    return resultado;
  }
  
  return (
    <div>
      <div class="flex max-w-4xl mx-auto  bg-white justify-center ">
        <div class="items-center justify-center mt-36">
          <div class="py-3 px-4">
            <p class="mt-2 text-black text-lg text-justify">¡Este test ya ha sido realizado!</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class={` w-24 h-24 mx-auto text-gray-700`} viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <div>
            <div class="py-3 px-4">
              <p class="mt-2 text-black text-lg text-justify">Respuestas correctas:</p>
            </div>            
            <div class="flex justify-between">
                <p class="ml-4">Cantidad:</p>
                <p class="mr-4">{correctValue}/{index}</p>
            </div>
            <div class="flex justify-between">
              <p class="ml-4">Porcentaje:</p>
              <p class="mr-4">{calcularPorcentaje(correctValue,index)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  
  export default Finished;