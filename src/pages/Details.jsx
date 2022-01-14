import React, {useState, useEffect} from 'react'
import {useParams, withRouter} from "react-router-dom";
import {Spinner} from "react-bootstrap"
import "../css/Detail.css"

const Details = (props) => {

  const {history} = props
  const [detail, setDetail] = useState({})
  const [isReady, setDataReady] = useState(false);
  let {id} = useParams();

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const api_key = '1f54bd990f1cdfb230adb312546d765d'
    const data = await fetch (`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
    const users = await data.json()
    setDetail(users)
    setDataReady(true)
}

  return (
    <div className="container-details">
      {isReady ? (
      <><div className="cards">
          <h1 className="cards__title">{detail.title}</h1>
          <div className="detail-info">
            {isReady ? (
              <img className="cards__img" src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`} alt="poster" />
            ) : null }
            <div className="overview">
              <h2>Overview: </h2>
              <strong>{detail.tagline}</strong>
              <p className="overview-text">{detail.overview}</p>
              <p className="overview-text">
                <b>Genres: </b>
                {detail.genres.map(item => item.name).join(', ')}
              </p>
              <p className="overview-text">
                <b>Languages: </b>
                {detail.spoken_languages.map(item => item.name).join(', ')}
              </p>
              <p className="overview-text">
                <b>Release year: </b>
                {detail.release_date.split('-')[0]}
              </p>
              <p className="overview-text">
                <b>Countries: </b>
                {detail.production_countries.map(item => item.name).join(', ')}
              </p>
              {detail.adult &&
                <p className="overview-text">
                  <b>Age: </b>
                  18+
                </p>}
              <p className="overview-text">
                <b>Status: </b>
                {detail.status}
              </p>
            </div>
          </div>
        </div><div className="button">
            <button onClick={() => history.goBack()}>Back</button>
          </div></> ) : ( 
        <div className="spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>)}
    </div>
  )
}

export default withRouter(Details)