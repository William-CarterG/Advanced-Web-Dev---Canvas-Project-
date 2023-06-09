function Users({ onClick }) {
  function handleUsersButtonClick() {
    // Navigate to the Users CRUD page
    onClick(); // Call the onClick prop passed from the parent component
  }

  return (
    <button className="button pressed-button menu-button" onClick={handleUsersButtonClick}>
      Manage Users
    </button>
  );
}

export default Users;
