import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../HomePage/Footer";
import Navigation from "../NavBar/navbar";
import { useNavigate } from "react-router-dom";
import { setLoadingIndicatorVisibility } from "../Loader/Loader";


const PersonInfo = () => {
  const [person, setPerson] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [search, setSearch] =useState('');
  const [load, setLoad] = useState(false);
  const {peopleid} = useParams();
  const navigate = useNavigate();


  useEffect(()=> {
    fetch(
      `https://api.themoviedb.org/3/person/${peopleid}?api_key=${process.env.REACT_APP_API}&language=en-US`
    )
      .then((data) => data.json())
      .then((data) => {
        setPerson(data);
        const gender = data.gender === 2 ? "Male" : "Female";
        setGender(gender)
        if (data.birthday) {
          const age = new Date().getFullYear() - data.birthday.slice(0, 4);
          setAge(age);
        }

        setLoad(true);
        setLoadingIndicatorVisibility(false);
      });

    fetch(
      `https://api.themoviedb.org/3/person/${peopleid}/movie_credits?api_key=${process.env.REACT_APP_API}&language=en-US`
    )
      .then((data) => data.json())
      .then((data) => {
    
        const x = data.cast.filter(function (movies) {
          return movies.popularity > 13;
        });
        setPopularMovies(x.splice(0,6))
    
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleChange1 = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
   
  };

  const handleSearch1 = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div
      className="personInformation"
      style={
        load
          ? {
              opacity: 1,
            }
          : { opacity: 0 }
      }
    >
      <Navigation
        handleSearch={handleSearch1}
        handleChange={handleChange1}
        search={search}
      />
      <div className="personBio">
        <img
          src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
          alt="this is the card pic"
        ></img>
        <div className="personInfoblock">
          <h1>{person.name}</h1>
          <h2>Born in {person.place_of_birth}</h2>
          <h2> Age: {age}</h2>
          <h2>{gender}</h2>
          <br></br>
          <h1>Biography</h1>
          <p>{person.biography}</p>
        </div>
      </div>
      <div className="popularMovies">
        <h1>Popular Movies</h1>
        {popularMovies.map((movie, index) => (
          <div className="popMoviesCard" key={index}>
            <a
              href={`/details/${movie.title}/${movie.id}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(
                  `/details/${movie.title}/${movie.id}`
                );
              }}
            >
              <div className="popMoviesCardImage">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="this is the card pic"
                ></img>
              </div>
              <div className="popMoviesDescription">
                <h1>{movie.original_title}</h1>
                <p>{movie.overview}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );

}

export default PersonInfo;