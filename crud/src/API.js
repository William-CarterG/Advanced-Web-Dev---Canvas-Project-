async function fetchData(URL,METHOD,BODY) {
  try {
    const response = await fetch(`http://localhost:8000/${URL}`, {
      method: METHOD,
      headers: {
        'Content-Type': 'application/json',
      },
      body: BODY,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function deleteData(URL, METHOD) {
  try {
    const response = await fetch(`http://localhost:8000/${URL}`, {
      method: METHOD,
    });

    if (response.ok) {
      // Verificar si la respuesta tiene un cuerpo vacío
      if (response.status === 204) {
        // Respuesta vacía, devolver un valor predeterminado
        return ;{} // Puedes cambiar esto según tus necesidades
      }

      const data = await response.json();
      return data;
    } else {
      throw new Error('Error en la solicitud DELETE');
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}

function startFetch(URL,METHOD,BODY,callback) {

    if (METHOD == "DELETE"){
      deleteData(URL,METHOD).then((data) => {
        callback(data);
      });
    } else {
      fetchData(URL,METHOD,BODY).then((data) => {
        callback(data);
      });
    }
    

}

export default startFetch;
