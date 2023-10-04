import {useContext} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthContext} from "./context/AuthContext.tsx";
import {LoginView} from "./views/LoginView.tsx";
import MyPages from "./views/MyPages.tsx";

function App() {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginView/>}/>
                <Route path="/my-pages" element={isAuthenticated ? <MyPages/> : <LoginView/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
