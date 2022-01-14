import React, { useState, useEffect} from "react";
import Main from "../Components/Main";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Modal from "../Components/Modal";

const Home = () => {
  const [page, setPage] = useState(1); //pagination
  const [data, setResults] = useState([]); //save for api data
  const [dataVideo, setMovie] = useState(undefined); //save video data
  const [isModalOpen, setIsModalOpen] = useState(false); //changing the state with setIsModal
  const [isQuery, setQuery] = useState(false);
  
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = (id) => {
    //parameter can be changed
    setIsModalOpen(true); //changing state if true
    playMovie(id); //executing function
  };

  const playMovie = async (id) => {
    //initializing function playMovie
    const api_key = "1f54bd990f1cdfb230adb312546d765d";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`
    );
    const data = await response.json();
    setMovie(data.results); //results object of the api results
  };

  useEffect(() => {
    getPopularMovies(); // call function
  }, []);

  const getPopularMovies = async () => {
    const api_key = "1f54bd990f1cdfb230adb312546d765d";
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${page}`
    );
    const users = await data.json();
    setResults(users.results);
  };

  const searchMovies = async(query) => {
    if (query === "" || query === undefined) {
      setQuery(false);
      //if it is empty, run and do not take it into account
      return getPopularMovies(); //get popular movies
    }
    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US&page=&query=${query}&page=${page}`
    );
    const searchData = await searchResponse.json();
    setResults(searchData.results);
    setQuery(true);
  };

  const next = () => {
    setPage( page + 1 )  //page + 1 adding 1 has to be attached to the name of the function
    return getPopularMovies();
  };

  const prev = () => { 
    if (page <= 1) { 
      return;
    }
    setPage((prevState) => prevState - 1);//subtract 1 previous page
    return getPopularMovies();
  };

  return (
    <>
      <Navbar />
      <Search searchMovies={searchMovies} />{}
      {isModalOpen && dataVideo && <Modal data={dataVideo} closeModal={closeModal}/>}{/*if open the modal*/}
      {data && (
        <Main data={data} prev={prev} next={next} isQuery={isQuery} openModal={openModal} />
      )}
    </>
  );
}

export default Home;
