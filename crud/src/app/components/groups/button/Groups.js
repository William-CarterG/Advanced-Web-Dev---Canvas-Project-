function Groups({ onClick }) {
    function handleGroupsButtonClick() {
        // Navigate to the Groups CRUD page
        onClick();
    }
    return (
    <button className="button menu-button" onClick={handleGroupsButtonClick}>
        Grupos
    </button>
    );
  }
  
  export default Groups;
  