import styles from './ProfilePage.module.css';

function ProfilePage({ selectedUser }) {
  if (selectedUser) {
    return (
      <div className={styles.profile}>
        <div>
          <h3>Profile</h3>
          <p>
            <span>Username:</span> {selectedUser.username}
          </p>
          <p>
            <span>Name:</span> {selectedUser.name}
          </p>
          <img
            className={styles.profileImage}
            src={selectedUser.avatar_url}
            alt={`${selectedUser.username}'s avatar`}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.profile}>
        <div>
          <h3>Profile</h3>
          <p>Username: none</p>
          <p>Name: none</p>
          <img
            className={styles.image}
            src="default-profile-picture.svg.png"
            alt="default avatar"
            width="150px"
          />
        </div>
      </div>
    );
  }
}
export default ProfilePage;
