function Evaluations({ onClick }) {
    function handleEvaluationsButtonClick() {
      // Navigate to the Evaluations CRUD page
      console.log("Evaluations CRUD clicked.");
      onClick(); // Call the onClick prop passed from the parent component
    }
  
    return (
        <button className="button menu-button" onClick={handleEvaluationsButtonClick}>
            Manage Evaluations
        </button>
    );
  }
  
  export default Evaluations;
  