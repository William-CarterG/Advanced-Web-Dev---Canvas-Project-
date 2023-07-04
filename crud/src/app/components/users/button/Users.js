function Users({ onClick, active }) {
  function handleUsersButtonClick() {
    // Navigate to the Users CRUD page
    onClick(); // Call the onClick prop passed from the parent component
  }

  return (
    <button className={`button ${active ? 'pressed-button' : ''} menu-button`} onClick={handleUsersButtonClick}>
      Usuarios
    </button>
  );
}
export default Users;
