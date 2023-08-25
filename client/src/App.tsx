import { BrowserRouter } from 'react-router-dom';
import Header from './components/Layout/Header';
import PublicRoutes from './routes';
import { useState } from 'react';

import './App.css';

export default function App() {
    const [successAlert, setSuccessAlert] = useState(false)

    return (
        <BrowserRouter>
            <Header successAlert={successAlert}/>
            <PublicRoutes setSuccessAlert={setSuccessAlert}/>
        </BrowserRouter>
    );
}
