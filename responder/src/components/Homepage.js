import startFetch from '../API';

const Homepage = ({setRoute, setIndex, evaluations, evToken, tokenState, personTestId}) => {
  return (
    <div>
      <div className="flex max-w-4xl mx-auto  bg-white justify-center ">
        <div className="items-center justify-center">
          <div className="py-6 px-8">
            <h2 className="text-gray-700 text-2xl font-bold mb-5">{evaluations["name"]}</h2>
            <p className="mt-2 text-black text-base text-justify">{evaluations["general_instructions"]}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-6 border-gray-700">
          <button className="py-3 px-4 bg-gray-700 text-gray-100 font-semibold"
            onClick={() => {
              setIndex(0)
              tokenState[evToken]["index"] = 0
              tokenState[evToken]["correct"] = 0
              localStorage.setItem('tokenState', JSON.stringify(tokenState));
              let body = {'started': true}
              startFetch(`person-tests/${personTestId}/`, 'PATCH', JSON.stringify(body), function(data) {
                console.log(data) 
               });
              setRoute('questions')
            }}>Realizar Prueba</button> 
      </div>

    </div>
  );
};
  
  export default Homepage;