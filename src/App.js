import Pages from "./COMPONENTS/PAGES/Pages";
import Category from "./COMPONENTS/Category";
import React from "react";
import styled from "styled-components";
import Search from "./COMPONENTS/search";
import {BrowserRouter, Link} from "react-router-dom";
import {GiKnifeFork} from "react-icons/gi";

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Nav>
                    <Logo to={'/'}>  Delicious
                        <GiKnifeFork/>
                    </Logo>
                </Nav>
                <Search/>
                <Category/>
                <Pages/>
            </BrowserRouter>

        </div>
    );
}
const Logo = styled(Link)`
    text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
  
`

const Nav = styled.div`
padding: 4rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg{
    font-size: 2rem;
  }
`
export default App;
