import React from "react";
import "./Difficulty.css"
import { useNavigate } from "react-router-dom";

function Difficulty(props : any){
    const navigate = useNavigate();
    return(props.trigger)? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}><span>Close</span></button>
                <button className="Easy" onClick={() => {navigate('/ai')}}><span>Easy</span><i></i></button>
                <button className="Normal" onClick={() => {navigate('/ai')}}><span>Normal</span><i></i></button>
                <button className="Hard" onClick={() => {navigate('/ai')}}><span>Hard</span><i></i></button>
                {props.children}
            </div>
        </div>
    ) : (<div></div>);
}

export default Difficulty;