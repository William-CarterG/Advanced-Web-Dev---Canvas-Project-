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

function startFetch(URL,METHOD,BODY,callback) {

    fetchData(URL,METHOD,BODY).then((data) => {
      callback(data);
    });

}

export default startFetch;
