function Groups({ onClick, active }) {
    function handleGroupsButtonClick() {
        // Navigate to the Groups CRUD page
        onClick();
    }
    return (
    <button className={`button ${active ? 'pressed-button' : ''} menu-button`} onClick={handleGroupsButtonClick}>
        Grupos
    </button>
    );
  }
  
  export default Groups;
  