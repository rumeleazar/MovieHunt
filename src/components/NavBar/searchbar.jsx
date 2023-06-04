import React from 'react';
import searchicon from '../../assets/images/searchicon.png';
import { useNavigate } from 'react-router-dom';

function SearchBar(props) {
  const navigate = useNavigate();

  function ButtonRedirect() {
    if (props.search.search !== '') {
      setTimeout(function () {
        navigate(`/search/${props.search.search}`);
      }, 100);
    } else {
      navigate(window.location.pathname);
    }
  }

  return (
    <div className="searchbar">
      <form action="" onSubmit={props.handleSearch}>
        <input
          type="text"
          placeholder="Search.."
          name="search"
          onChange={props.handleChange}
        ></input>
        <button type="submit" onClick={ButtonRedirect}>
          <img src={searchicon} alt="search"></img>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
