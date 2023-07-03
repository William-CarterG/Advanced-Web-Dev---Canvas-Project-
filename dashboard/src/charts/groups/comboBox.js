import { useState } from "react";
import { Combobox } from "@headlessui/react";

const countries = [
    { name: "Enero" },
    { name: "Febrero" },
    { name: "Marzo" },
    { name: "Abril" },
    { name: "Mayo" },
    { name: "Junio" },
    { name: "Julio" },
    { name: "Agosto" },
    { name: "Septiembre" },
    { name: "Octubre" },
    { name: "Noviembre" },
    { name: "Diciembre" }
  ];

const SemiOpen = () => {

    const [selected, setSelected] = useState("");
    const [query, setQuery] = useState("");

    const filteredCountries =
        query === ""
        ? countries
        : countries.filter((person) =>
            person.name
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, ""))
            );


    return (
        <div>
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1 text-3xl">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md border-2">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-3xl leading-5 text-gray-900 "
                            displayValue={(person) => person.name}
                            placeholder="Escriba su respuesta.."
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </div>
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-3xl shadow-lg">
                        {filteredCountries.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            No se encuentra nada.
                        </div>
                        ) : (
                        filteredCountries.map((person) => (
                            <Combobox.Option
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? "bg-gray-500 text-white" : "text-gray-900"
                                }`
                            }
                            value={person}
                            >
                            <span>
                                {person.name}
                            </span>
                            </Combobox.Option>
                        ))
                        )}
                    </Combobox.Options>
                </div>
            </Combobox>
            
        </div>
    );
  };
    
export default SemiOpen;