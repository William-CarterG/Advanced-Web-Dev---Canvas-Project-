const Questions = () => {
    return (
        <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
                <form>
                    <div class="mb-5">
                        <label
                        for="name"
                        class="mb-3 block text-base font-medium text-gray-700"
                        >
                        ¿Cual es el objetivo de la tarea?
                        </label>
                        <textarea
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full Name"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none"
                        />
                    </div>
                    <div>
                        <button
                        class="hover:shadow-form rounded-md bg-gray-700 py-3 px-8 text-base font-semibold text-white outline-none"
                        >
                        Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ); 
};

export default Questions;