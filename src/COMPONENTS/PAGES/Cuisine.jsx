import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";
import LazyLoad from 'react-lazyload';

const Cuisine = () => {


    const [cuisine, setCuisine] = useState([])
    let params = useParams()
    debugger
    const getCuisineLocal = async (name) => {

        const check = localStorage.getItem(name);
        if (check) {
            let func = () => {
                setCuisine(JSON.parse(check))
            }
            setTimeout(func, 0)
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
            const data = await api.json();
            localStorage.setItem(name, JSON.stringify(data.results));
            debugger
            setCuisine(data.results);
        }

    }
    useEffect(() => {
        getCuisineLocal(params.type)

    }, [params.type])

    return <Grid
        animate={{opacity: 1}}
        initial={{opacity: 0}}
        exit={{opacity: 0}}
        transition={{duration: 0.5}}
    >
        {cuisine.map((item) => {
            return (
                <Link
                    style={{textDecoration: 'none'}}
                    to={'/recipe/' + item.id}>
                    <Card key={item.id}>
                        <LazyLoad height={100}>
                            <img src={item.image} alt=""/>
                        </LazyLoad>

                        <h4>{item.title}</h4>
                    </Card>

                </Link>
            )
        })}
    </Grid>


};

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;

`

const Card = styled.div`
  img {
    min-height: 250px;
    width: 100%;
    border-radius: 2rem;

  }

  .imageLd {
    height: 100%;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }

`
const Loader = styled.img`
  transition: 1s;
  display: block;
  margin: 0 auto;
`

export default Cuisine;