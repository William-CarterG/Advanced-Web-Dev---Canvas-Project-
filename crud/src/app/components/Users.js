function Users({ onClick }) {
  function handleUsersButtonClick() {
    // Navigate to the Users CRUD page
    console.log("Users CRUD clicked.");
    onClick(); // Call the onClick prop passed from the parent component
  }

  return (
    <button className="button" onClick={handleUsersButtonClick}>
      Manage Users
    </button>
  );
}

export default Users;
