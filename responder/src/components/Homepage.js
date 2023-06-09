const Homepage = ({setRoute, setIndex}) => {
  return (
    <div>
      <div class="flex max-w-4xl mx-auto  bg-white justify-center ">
        <div class="items-center justify-center">
          <div class="py-6 px-8">
            <h2 class="text-gray-700 text-2xl font-bold mb-5">Cuestionario de Web</h2>
            <p class="mt-2 text-black text-base text-justify">En el siguiente test, se abordaran preguntas basicas del manejo de css, y html.</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center pb-6 border-gray-700">
          <button class="py-3 px-4 bg-gray-700 text-gray-100 font-semibold"
            onClick={() => {
              setIndex(0)
              setRoute('questions')
            }}>Realizar Prueba</button> 
      </div>

    </div>
  );
};
  
  export default Homepage;