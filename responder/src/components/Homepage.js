const Homepage = ({setRoute, setIndex, evaluations, evToken, tokenState}) => {
  return (
    <div>
      <div class="flex max-w-4xl mx-auto  bg-white justify-center ">
        <div class="items-center justify-center">
          <div class="py-6 px-8">
            <h2 class="text-gray-700 text-2xl font-bold mb-5">{evaluations["name"]}</h2>
            <p class="mt-2 text-black text-base text-justify">{evaluations["general_instructions"]}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center pb-6 border-gray-700">
          <button class="py-3 px-4 bg-gray-700 text-gray-100 font-semibold"
            onClick={() => {
              setIndex(0)
              tokenState[evToken]["index"] = 0
              tokenState[evToken]["correct"] = 0
              localStorage.setItem('tokenState', JSON.stringify(tokenState));
              setRoute('questions')
            }}>Realizar Prueba</button> 
      </div>

    </div>
  );
};
  
  export default Homepage;