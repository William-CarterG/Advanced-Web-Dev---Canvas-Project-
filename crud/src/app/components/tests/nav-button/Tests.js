function Tests({ onClick, active }) {
    function handleTestsButtonClick() {
      // Navigate to the Tests CRUD page
      onClick(); // Call the onClick prop passed from the parent component
    }
  
    return (
        <button className={`button ${active ? 'pressed-button' : ''} menu-button`} onClick={handleTestsButtonClick}>
            Tests
        </button>
    );
  }
  
  export default Tests;
  