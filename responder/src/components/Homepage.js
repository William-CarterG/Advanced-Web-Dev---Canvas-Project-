const Homepage = () => {
  return (
    <div class="flex max-w-4xl mx-auto md:h-56 bg-white justify-center p-12">
      <div class="md:flex items-center justify-center md:w-1/2 md:bg-gray-700">
        <div class="py-6 px-8 md:py-0">
          <h2 class="text-gray-700 text-2xl font-bold md:text-gray-100">Cuestionario de Web</h2>
          <p class="mt-2 text-gray-600 md:text-gray-400">En el siguiente test, se abordaran preguntas basicas del manejo de css, y html.</p>
        </div>
      </div>
      <div class="flex items-center justify-center pb-6 md:py-0 md:w-1/2 md:border-b-8 border-gray-700">
        <form>
          <div class="flex flex-col rounded-lg overflow-hidden sm:flex-row">
            <button class="py-3 px-4 bg-gray-700 text-gray-100 font-semibold uppercase hover:bg-gray-600">subscribe</button>
          </div>
        </form>
      </div>
    </div>
  );
};
  
  export default Homepage;