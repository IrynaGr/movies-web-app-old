import React, { useState } from "react";
import "../css/Search.css"

const Search  = ({searchMovies}) => { 
  const [query, setQuery] = useState("");
  
  const onChange = (e) => {
    setQuery(e.target.value);//save input validation
    searchMovies(e.target.value) //it is passed through props and it is passed to save the validation in the input
  };

  return (
    <div className="input-wrapper">
      <input className="input-text"
        type="text"
        placeholder="Search for a movie"
        value={query}
        onChange={onChange} //it is executed when I am going to write in the input that is to say in the search button
      />
    </div>
  );
};
export default Search;
