import React from 'react';
import {Route, Routes} from "react-router";
import HomePage from "./pages/Home";
import FavoritesPage from "./pages/FavoritsPage";
import Navigation from "./components/Navigation";

function App() {
    return (
        <>
        <Navigation/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/favorites' element={<FavoritesPage/>}/>
        </Routes>
        </>
      );
}

export default App;
