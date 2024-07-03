import React from 'react';
import styles from '../app/header.module.css'; // Import CSS module

export default function Content() {
    return (
      <header>
        <nav className={`${styles.header} ${styles.dark}`}>
          <div className={styles.logoContainer}>
            <a href="/" className={styles.logo}>
              <span>LifePass</span>
            </a>
          </div>
          <div className={styles.navItems}>
            <a href="/partner" className={`${styles.navLink} ${styles.navLinkDark}`}>Trở thành đối tác</a>
          </div>
        </nav>
      </header>
    );
  }