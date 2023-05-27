import React, {useState,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../homepage/footer";
import Navigation from "../NavBar/navbar";
import ReactImageFallback from "react-image-fallback";
import noimage from "../../assets/images/noimage.png";
import { fetchMovieSearchData } from "../../Services/Api/SearchApi";
import { setLoadingIndicatorVisibility } from "../Loader/Loader";

const SearchResults = ({
  movies,
  search,
  ...props
}) => {


  const [searchResults, setSearchResults] = useState(search);
  const [moviesResults, setMoviesResults] = useState(movies);

  const navigate = useNavigate();

   const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (search?.search !== "") {
      fetchMovieSearchData(search?.search).then((data)=> {
        setLoadingIndicatorVisibility(false)
        setMoviesResults({searchedMovies: data.results});
        setSearchResults(search);
        setLoadingIndicatorVisibility(false)
      })
    }
  },[search]);



  return (
    <div>
      <Navigation
        handleSearch={handleSearch}
        handleChange={props.handleChange}
        search={search}
      />
      <div
        className="searchDescription"
 
      >
        <h1>SEARCH RESULTS FOR {searchResults?.search}</h1>
      </div>
      <div
        className="searchDivider"
      ></div>
      <div
        className="searchContainer"
      >
        {moviesResults?.searchedMovies?.map((movie, index) => {
   
          return(
          <div className="searchCardContainer" key={index}>
            <a
              href={`/details/${movie.title}/${movie.id}`}
              onClick={() => {
                navigate(
                  `/details/${movie.title}/${movie.id}`
                );
              }}
              style={{ cursor: "pointer" }}
            >
              <ReactImageFallback
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                fallbackImage={noimage}
                alt="cool image should be here"
              />

              <h1>{movie.title}</h1>
            </a>
          </div>
        )})}
      </div>
      <Footer />
    </div>
  );

}

export default SearchResults;
