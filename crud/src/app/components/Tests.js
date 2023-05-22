function Tests({ onClick }) {
    function handleTestsButtonClick() {
      // Navigate to the Tests CRUD page
      console.log("Tests CRUD clicked.");
      onClick(); // Call the onClick prop passed from the parent component
    }
  
    return (
        <button className="button" onClick={handleTestsButtonClick}>
            Manage Tests
        </button>
    );
  }
  
  export default Tests;
  