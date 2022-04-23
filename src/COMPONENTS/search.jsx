import React from 'react';
import {useState} from "react";
import {FaSearch} from "react-icons/fa";
import styled from "styled-components";
import {useNavigate}  from "react-router-dom"
const Search = () => {

    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        navigate('/searched/'+input)
        setInput('')
    }
    return (
        <div>
            <FormStyle onSubmit={submitHandler}>
                <div>
                    <FaSearch/>
                    <input
                        onChange={(event) => setInput(event.target.value)}
                        value={input} type="text"/>
                </div>

            </FormStyle>
        </div>
    );
};
const FormStyle = styled.form`
  margin: 0 20rem;

  div {
    position: relative;
    width: 100%;

  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    border-radius: 1rem;
    outline: none;
    width: 100%;
    color: white;
    padding: 1rem 3rem;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(100%, -50%);
    color: white;
  }
`

export default Search;