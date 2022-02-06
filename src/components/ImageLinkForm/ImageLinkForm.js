import React from "react";
import './imgLink.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) =>{
    return(
        <div>
        <p className="f3">
            {'This will find a face in any picture'}
        </p>
        <div className="center">
        <div className="form pa4 br3 shadow-5">
        <input className="f4 pa2 w-70 center" type='text' onChange={onInputChange}/>
            <button className="pa4 w-30 groq f4 link ph3 pv2 dib white bg-light-green" onClick={onSubmit}>Find face</button>
        </div>
        </div>
        </div>
    );
}
export  default  ImageLinkForm;