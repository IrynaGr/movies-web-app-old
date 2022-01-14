import React from 'react'
import "../css/Modal.css"
import ReactPlayer from 'react-player'
import {Button} from "react-bootstrap"

const Modal = ({ data, closeModal}) => {
  
  const urlYoutube = `https://www.youtube.com/watch?v=${data[0].key}` // YouTube url of the props plus the key (video) of the api
    
    return (
        <div className="video"> 
        <ReactPlayer
          url={urlYoutube}
          className='react-player'
          playing
          controls="1"
          width='100%'
          height='100%'
        /> 
        <Button variant="secondary" onClick={closeModal}>
            Close
        </Button>
        </div>
        
    )
}

export default Modal;
