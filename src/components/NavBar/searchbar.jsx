import React from 'react';
import searchicon from '../../assets/images/searchicon.png';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ search, handleChange, handleSearch }) => {
  const navigate = useNavigate();

  function ButtonRedirect() {
    if (search.search !== '') {
      setTimeout(function () {
        navigate(`/search/${search.search}`);
      }, 100);
    } else {
      navigate(window.location.pathname);
    }
  }

  return (
    <div className="searchbar">
      <form action="" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search.."
          name="search"
          onChange={handleChange}
        ></input>
        <button type="submit" onClick={ButtonRedirect}>
          <img src={searchicon} alt="search"></img>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
