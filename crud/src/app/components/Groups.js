function Groups({ onClick }) {
    function handleGroupsButtonClick() {
        // Navigate to the Groups CRUD page
        //console.log("Groups CRUD clicked.");
        onClick();
    }
    return (
    <button className="button menu-button" onClick={handleGroupsButtonClick}>
        Manage Groups
    </button>
    );
  }
  
  export default Groups;
  