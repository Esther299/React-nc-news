import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <img
            src="/northcoders-logo.jpg"
            alt="Company Logo"
            className={styles.logo}
          />
        </div>

        <div className={styles.footerSection}>
          <h2>Contact Information</h2>
          <p>Manchester Technology Centre</p>
          <p> 103 Oxford Road, Manchester M1 7ED</p>
          <br />
          <p>Email: hello@northcoders.com</p>
          <p>Phone: 0333 050 4368</p>
        </div>

        <div className={styles.footerSection}>
          <h2>Quick Links</h2>
          <ul className={styles.links}>
            <li>
              <a
                href="https://policies.google.com/privacy?hl=en-US"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Follow Us</h2>
          <a
            href="https://facebook.com"
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; 2024 Esther Gines Northcoders. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
