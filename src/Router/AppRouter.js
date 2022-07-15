import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Favoritos from '../Components/Favoritos/Favoritos';


export function AppRouter() {

    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Favoritos' element={<Favoritos/>} />
        </Routes>
        </BrowserRouter>
    )



}