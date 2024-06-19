function ProfilePage({ selectedUser }) {
  return selectedUser ? (
    <div className="selected-user-container">
      <div>
        <h3>Profile</h3>
        <p>Username: {selectedUser.username}</p>
        <p>Name: {selectedUser.name}</p>
        <img
          className="profile-image"
          src={selectedUser.avatar_url}
          alt={`${selectedUser.username}'s avatar`}
        />
      </div>
    </div>
  ) : (
    <div className="selected-user-container">
      <div>
        <h3>Profile</h3>
        <p>Username: none</p>
        <p>Name: none</p>
        <img
          className="profile-image"
          src='default-profile-picture.svg.png'
            alt={`default avatar`}
            width='150px'
        />
      </div>
    </div>
  );
}
export default ProfilePage;
