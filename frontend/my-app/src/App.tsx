import React from 'react';
import './App.css';
import Home from './components/HomePage/Home';
import About from './components/AboutPage/About';
import SideBar from './components/SideBar/SideBar';
import Online from './components/Game/Online';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Lessions from './components/LessionPage/Lessions';
import LessionDetails from './components/LessionPage/LessionDetails';
import Puzzle from './components/PuzzlePage/Puzzle';


function App() {
    return(
        <div className='App'>
            <Router>
            <div className='sidebar'>
                <SideBar/>
            </div>
            <div className='page'>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/about' element={<About/>}/>
                        <Route path='/online' element={<Online ai='false'></Online>}/>
                        <Route path='/ai' element={<Online ai='true'></Online>}/>
                        <Route path='/lessons' element={<Lessions/>}/>
                        <Route path="/lessons/:lessonId" element={<LessionDetails/>} />
                        <Route path='/puzzle' element={<Puzzle/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                
            </div>
            </Router>
        </div>
    );
}

export default App;
