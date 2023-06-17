import React from 'react';
import styles from './Footer.module.css';
import github from '../../../assets/Logos/githubIcon.png';
import linkedin from '../../../assets/Logos/linkedin.png';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.aboutSection}>
        <div className={styles.aboutHeader}>About the creator</div>
        <div className={styles.aboutDescription}>
          I'm a software developer that is currently based in Hong Kong. My
          specialty is more towards the front end side, but I also have working
          knowledge with the back end side of things. Technologies that I use in
          my daily work consists of React, Preact, TypeScript, Sass, Webpack,
          and other front end technologies that are widely used anywhere in the
          world.
        </div>
        <h4>
          Created with love by:&nbsp;
          <a
            href="https://ryanulysseseleazar.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.name}
          >
            Ryan Eleazar
          </a>
        </h4>
      </div>
      <div className={styles.poweredBySection}>
        <p>This site is powered by:</p>
        <a
          href="https://developer.themoviedb.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg`}
            alt="themoviedb logo"
          ></img>
        </a>
      </div>
      <div className={styles.copyrightSection}>
        <p>MovieHunt &#169; 2020</p>
        <p>All Rights Reserved</p>
      </div>
      <div className={styles.contactSection}>
        <div className={styles.logos}>
          <a
            href="https://github.com/rumeleazar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="github"></img>
          </a>
          <a
            href="https://www.linkedin.com/in/ryaneleazar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="linkedin"></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
