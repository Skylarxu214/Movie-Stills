import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import Movies from './components/Movies/Movies';
import Movie from './components/Movie/Movie';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import NavigationBar from './components/NavigationBar';
import UserFavorites from './components/UserFavorites';
import UserRatings from './components/UserRatings';
import UserAccountPage from './components/UserAccountPage';


function App() {
  const [user, setUser] = useState(null)
  const [mood, setMood] = useState("")
  const [movies, setMovies] = useState([])
  const[props,setProps]= useState([])
  let params = useParams();
 
 function getProps(props){
  setProps(props)
 }
 
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
 
    fetch("/movies")
    .then(res => res.json())
    .then(movies => setMovies(movies))
 
  }, []);


  return ( 
    <>
    <Router>
     <NavigationBar user={user} setUser={setUser} setMood={setMood}/> 
      {user ? (
        <Routes>
          <Route exact path='/' element={<Movies getProps={getProps} movies={movies} user= {user}/>} />
          <Route exact path={`/movies/${props.slug}`} element={<Movie props={props} movies={movies} user={user} />} />
          <Route path='/userfavorites' element={<UserFavorites user= {user} getProps={getProps} movies={movies}/>} />
          <Route path='/userRatings' element={<UserRatings user= {user} movies={movies} />} />
        </Routes>
      ): (
        <Routes>
          <Route path='/signup' element={<Signup setUser={setUser} />} />
          <Route path='/login' element={<Login setUser={setUser} setMood={setMood} mood={mood}/>} />
          <Route exact path='/' element={<LandingPage setUser= {setUser} />} />  
        </Routes>
      )}
      </Router>
    </>
  );
}

export default App;





