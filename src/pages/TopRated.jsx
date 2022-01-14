import React, {useState, useEffect} from "react";
import Main from "../Components/Main";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Modal from "../Components/Modal";

const TopRated = () => {
  const [page, setPage] = useState(1);
  const [data, setResults] = useState([]);
  const [dataVideo, setMovie] = useState(undefined);
  const [isQuery, setQuery] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = (id) => {
    setIsModalOpen(true);
    playMovie(id);
  };

  const playMovie = async (id) => {
    const api_key = "1f54bd990f1cdfb230adb312546d765d";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`
    );
    const data = await response.json();
    setMovie(data.results);
  };

  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  const getTopRatedMovies = async () => {
    const api_key = "1f54bd990f1cdfb230adb312546d765d";
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&page=${page}`
    );
    const users = await data.json();
    setResults(users.results);
  };

  const searchMovies = async(query) => {
    if (query === "") {
      setQuery(false);
      return getTopRatedMovies();
    }

    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US&page=&query=${query}&page=${page}`
    )
    const searchData = await searchResponse.json();
    setResults(searchData.results);
    setQuery(true);
  }

  const next = () => {
    setPage((prevState) => prevState + 1);
    getTopRatedMovies();
  };

  const prev = () => {
    if (page <= 1) {
      return;
    }

    setPage((prevState) => prevState - 1);
    getTopRatedMovies();
  };

  return (
    <>
      <Navbar />
      {isModalOpen && dataVideo && <Modal data={dataVideo} closeModal={closeModal}/>}
      <Search searchMovies={searchMovies} />
      {data && (
        <Main data={data} prev={prev} next={next} isQuery={isQuery} openModal={openModal} />
      )}
    </>
  );
}

export default TopRated;