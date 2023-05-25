import React from "react";
import { withRouter } from "react-router-dom";
import searchicon from "../../assets/images/searchicon.png";

function SearchBar(props) {

  function ButtonRedirect() {

    if (props.search.search !== "") {

      setTimeout(function () {
        props.history.push(`/search/${props.search.search}`);  
      }, 100);
    } else {
      props.history.replace(window.location.pathname);
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

export default withRouter(SearchBar);
