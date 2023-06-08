import React from 'react';

const Number = () => {

    return (
        <div>
            <div className="flex justify-between mb-4">
                <span className=" text-xs">Indique el numero correcto:</span>
                <span className="text-xs">Pregunta 4 de 5</span>
            </div>
            <div class="grid space-y-4">
                <input type="text" class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md border-2 py-2 px-4 text-sm" placeholder="Escriba su respuesta.." />
            </div>
        </div>
    );
  };
    
export default Number;