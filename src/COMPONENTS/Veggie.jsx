import React from 'react';
import {Splide, SplideSlide} from "@splidejs/react-splide";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';


const Veggie = () => {

    const [veggie, setVeggie] = useState([])
    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {

        const check = localStorage.getItem('veggie');
        if (check) {
            setVeggie(JSON.parse(check));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
            const data = await api.json();

            localStorage.setItem("veggie", JSON.stringify(data.recipes));
            console.log(data.recipes);
            setVeggie(data.recipes);
        }

    }

    return (
        <Wrapper>
            <h3>Our Vegetarian Picks</h3>
            <Splide options={{
                perPage: 2,
                drag: 'free',
                arrows: true,
                gap: "2rem",
                pagination: true,

            }}>
                {veggie.map((recipe) => {
                    return (

                        <SplideSlide key={recipe.id}>
                            <Card>
                                <Link
                                    style={{textDecoration:'none'}}
                                    to={'/recipe/'+recipe.id}>
                                    <p>{recipe.title}</p>
                                    <LazyLoadImage
                                         effect='blur'
                                         src={recipe.image} alt="image"
                                    />
                                    <Gradient/>
                                </Link>
                            </Card>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  margin: 10px 10px;
`
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

`

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));


`

export default Veggie;