import React from "react";
import { useHistory } from "react-router-dom";
import "../css/Main.css"
import Pagination from "./Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Main = ({ data, next, prev, isQuery, openModal}) => {
  const history = useHistory();

  return (
    <>
      <div className="container">
        <div className="row text-center">
          {data.length > 0 &&
            data.map((item,index) => (
              <div className="col-sm-12 col-md-5 col-lg-3 mb-5 d-flex" key={index}>
                <div className="card">
                  <div className="play-button" onClick={() => openModal(item.id)}>
                    <div className="play-icon"></div>
                  </div>
                  <img
                    onClick={() => openModal(item.id)}
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt="card"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{item.original_title}</h4>
                    <FontAwesomeIcon id="redes" icon={faStar} />
                    <strong className="card-strong">{item.vote_average}</strong>
                    <p className="card-date">Release date: {item.release_date}</p>
                  </div>
                  <button
                    id="boton"
                    className="btn btn-success"
                    onClick={() => history.push(`/detail/${item.id}`)}
                  >
                    Information
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isQuery ? null : (<Pagination next={next} prev={prev}/>)}
    </>
  );
}

export default Main;