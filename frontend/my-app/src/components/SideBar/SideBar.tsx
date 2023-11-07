import React from "react"
import './SideBar.css'
import {useNavigate} from 'react-router-dom';

function SideBar(){
    const navigate = useNavigate();

    return(
        <div className="sidebarWhole">
            <aside id="sidebar" className="nano">
            <div className="nano-content">
                <div className="logo-container" onClick={() => {navigate("/")}}><span className="logo"> <img src="/assets/imi_logo.png" style={{ width: 40, height: 40 }} alt="ImiLogo"/></span>Menu</div><a className="compose-button" onClick={() => {navigate("/online")}}>IMIChess</a>
                <menu className="menu-segment">
                <ul>
                    <li className="active"><img src="/assets/home.png" style={{ width: 25, height: 25 }} alt="homeicon" /><a onClick={() => {navigate("/")}}>Home</a></li>
                    <li><img src="/assets/chatbot.png" style={{ width: 25, height: 25 }} alt="aiicon" /> <a onClick={() => {navigate("/ai")}}>Computer</a></li>
                    <li><img src="/assets/puzzle.png" style={{ width: 25, height: 25 }} alt="puzzleicon" /><a onClick={() => {navigate("/puzzle")}}>Puzzle</a></li>
                    <li><img src="/assets/lesson.png" style={{ width: 25, height: 25 }} alt="lessonIcon" /><a onClick={() => {navigate("/lessons")}}>Lessions</a></li>
                    <li><img src="/assets/info.png" style={{ width: 25, height: 25 }} alt="infoIcon" /><a onClick={() => {navigate("/about")}}>About Us</a></li>
                </ul>
                </menu>
                <div className="separator"></div>
                <div className="menu-segment">
                <ul className="labels">
                    <li className="title">More <span className="icon">+</span></li>
                    <li><a href="#" className="italic-link">More features will be implemented soon</a></li>
                    {/*<li><a href="#">Dribbble <span className="ball pink"></span></a></li>
                    <li><a href="#">Roommates <span className="ball green"></span></a></li>
                    <li><a href="#">Bills <span className="ball blue"></span></a></li>*/}
                </ul>
                </div>
                <div className="separator"></div>
                <div className="menu-segment">
                <ul className="chat">
                    <li className="title">Chat <span className="icon">+</span></li>
                    {/*<li><a href="#"><span className="ball green"></span>comming</a></li>
                    <li><a href="#"><span className="ball green"></span>Kevin Jones</a></li>
                    <li><a href="#"><span className="ball blue"></span>John King</a></li>
                    <li><a href="#"><span className="ball blue"></span>Jenny Parker</a></li>
                    <li><a href="#"><span className="ball blue"></span>Paul Green</a></li>-->*/}
                    <li><a href="#" className="italic-link">Chat feature will be implemented soon</a></li>
                </ul>
                </div>
                <div className="bottom-padding"></div>
            </div>
        </aside>
    </div>
    );
}

export default SideBar;