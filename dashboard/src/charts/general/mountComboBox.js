import {useState, useEffect} from "react";
import {Combobox} from "@headlessui/react";

const SemiOpenMount = ({ values, setNewMountEvaluations }) => {
    let countries = [
        {
            name: "Enero", amount: values[0]
        }, {
            name: "Febrero", amount: values[1]
        }, {
            name: "Marzo", amount: values[2]
        }, {
            name: "Abril", amount: values[3]
        }, {
            name: "Mayo", amount: values[4]
        }, {
            name: "Junio", amount: values[5]
        }, {
            name: "Julio", amount: values[6]
        }, {
            name: "Agosto", amount: values[7]
        }, {
            name: "Septiembre", amount: values[8]
        }, {
            name: "Octubre", amount: values[9]
        }, {
            name: "Noviembre", amount: values[10]
        }, {
            name: "Diciembre", amount: values[11]
        }
    ];

    const [selected,setSelected] = useState(countries[6]);
    const [query,setQuery] = useState("");

    const filteredCountries = query === ""
        ? countries
        : countries.filter((person) => person.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));


    useEffect(() => {
        setNewMountEvaluations(selected["amount"])
        }, [selected]);

    useEffect(() => {
        setNewMountEvaluations(countries[6]["amount"])
        }, [values]);

    return (
        <div>
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <div
                        className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md border-2">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 "
                            displayValue={(person) => person.name}
                            placeholder="Escriba su respuesta.."
                            onChange={(event) => setQuery(event.target.value)}/>
                    </div>
                    <Combobox.Options
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg">
                        {filteredCountries.length === 0 && query !== ""
                            ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    No se encuentra nada.
                                </div>
                            )
                            : (filteredCountries.map((person, index) => (
                                <Combobox.Option
                                    key={index}
                                    className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                                    ? "bg-gray-500 text-white"
                                    : "text-gray-900"}`}
                                    value={person}>
                                    <span>
                                        {person.name}
                                    </span>
                                </Combobox.Option>
                            )))}
                    </Combobox.Options>
                </div>
            </Combobox>

        </div>
    );
};

export default SemiOpenMount;