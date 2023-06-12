import React, { useState, useEffect } from 'react';
import logo from './logo.svg';



const App = () => {
  
  const [text, setText] = useState("");

  useEffect(() => {
    let textJs = ""
    const intervalId = setInterval(() => {
      if(textJs === ""){
        textJs = "."
        setText(".");
      } else{
        if(textJs === "."){
          textJs = ".."
          setText("..");
        } else{
          textJs = ""
          setText("...");
        }
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='w-[96vw] h-[92vh] bg-gray-700'>
      <div className='pt-[40vh]'>
        <img src={logo} alt="logo" className="App-logo w-52 mx-auto" />
        <div className='text-4xl font-bold text-white'>
          Cargando{text}
        </div>
      </div>
    </div>
  );
};

export default App;
