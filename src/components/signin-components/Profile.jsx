function Profile({ selectedUser }) {
  return (
    <div className="selected-user-container">
      {selectedUser && (
        <div className="selected-user">
          <h3>Selected User</h3>
          <p>Username: {selectedUser.username}</p>
          <p>Name: {selectedUser.name}</p>
          <img
            className="user-image"
            src={selectedUser.avatar_url}
            alt={`${selectedUser.username}'s avatar`}
          />
        </div>
      )}
    </div>
  );
}
export default Profile;
