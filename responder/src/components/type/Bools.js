const Bools = () => {
    return (
        <div class="mt-4 grid space-y-4">
        <button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 focus:bg-green-200 ">
            <div class="relative flex items-center space-x-4 justify-center">
                <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Verdadero</span>
            </div>
        </button>
        <button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 focus:bg-red-100 ">
            <div class="relative flex items-center space-x-4 justify-center">
                <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Falso</span>
            </div>
        </button>
    </div>
    );
  };
    
export default Bools;