import React, { useState } from 'react';
import styles from './Dropdown.module.css';
import clsx from 'clsx';

const Dropdown = ({ genresData, onClick, activeGenres }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className={styles.dropdownContainer}>
      <div
        className={clsx(styles.dropdownButton, {
          [styles.activeButton]: showDropDown,
        })}
        onClick={() => {
          setShowDropDown((current) => !current);
        }}
      >
        Genre
      </div>
      <div
        className={clsx(styles.dropdownItemContainer, {
          [styles.showDropdown]: showDropDown,
        })}
      >
        {genresData.map((data, index) => {
          const isGenreActive = activeGenres.includes(data?.id);

          return (
            <div
              className={clsx(styles.dropdownItem, {
                [styles.genreActive]: isGenreActive,
              })}
              key={index}
              onClick={() => onClick(data.id)}
            >
              <input
                type="checkbox"
                checked={isGenreActive}
                className={styles.checkBox}
              />
              {data.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
