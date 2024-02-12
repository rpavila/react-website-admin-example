import '@mantine/core/styles.css';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from './Home';
import Login from './components/login/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={'/'}>
                    <Route index element={<Home/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
