function ProfilePage({ selectedUser }) {
  return (
    <div className="selected-user-container">
        <div>
          <h3>Selected User</h3>
          <p>Username: {selectedUser.username}</p>
          <p>Name: {selectedUser.name}</p>
          <img
            className="profile-image"
            src={selectedUser.avatar_url}
            alt={`${selectedUser.username}'s avatar`}
          />
        </div>
    </div>
  );
}
export default ProfilePage;
