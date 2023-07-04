function Evaluations({ onClick, active }) {
    function handleEvaluationsButtonClick() {
      // Navigate to the Evaluations CRUD page
      onClick(); // Call the onClick prop passed from the parent component
    }
  
    return (
        <button className={`button ${active ? 'pressed-button' : ''} menu-button`} onClick={handleEvaluationsButtonClick}>
            Evaluaciones
        </button>
    );
  }
  
  export default Evaluations;
  