import React, { useState } from 'react';
import styles from './Dropdown.module.css';
import clsx from 'clsx';

const Dropdown = ({ genresData, onClick, activeGenres, onClickProps }) => {
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
        <div>Genre</div>
        <div className={styles.dropdownArrowContainer}>
          <div
            className={clsx(styles.dropdownArrow, {
              [styles.arrowUp]: showDropDown,
              [styles.arrowDown]: !showDropDown,
            })}
          />
        </div>
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
              onClick={() => onClick({ ...onClickProps, genreId: data.id })}
            >
              <input
                type="checkbox"
                checked={isGenreActive}
                className={styles.checkBox}
                onChange={(e) => {}}
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
