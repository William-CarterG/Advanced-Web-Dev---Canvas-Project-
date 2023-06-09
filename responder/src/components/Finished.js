const Finished = () => {
  return (
    <div>
      <div class="flex max-w-4xl mx-auto  bg-white justify-center ">
        <div class="items-center justify-center mt-44">
          <svg xmlns="http://www.w3.org/2000/svg" class={` w-24 h-24 mx-auto text-gray-700`} viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <div class="py-1  px-8">
            <p class="mt-2 text-black text-lg text-justify">¡Este test ya ha sido realizado!</p>
          </div>
        </div>
      </div>


    </div>
  );
};
  
  export default Finished;