import Pages from "./COMPONENTS/PAGES/Pages";
import Category from "./COMPONENTS/Category";
import React from "react";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Category/>
                <Pages/>
            </BrowserRouter>

        </div>
    );
}

export default App;
