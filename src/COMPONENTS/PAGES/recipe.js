import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styled from "styled-components";
import loading from '../../asets/img/giphy.gif'
import {motion} from "framer-motion";


const Recipe = () => {

    let params = useParams()
    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState('instructions')
    const localeFetchDetails = async (name) => {
        const check = localStorage.getItem(name)
        if (check) {
            let func = () => {
                setDetails(JSON.parse(check))
            }
            setTimeout(func, 2000)
        } else {
            const data = await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
            const detailData = await data.json()
            localStorage.setItem(name, JSON.stringify(detailData))
            setDetails(detailData)
        }
    }
    useEffect(() => {
        localeFetchDetails(params.name)
    }, [params.name])
    console.log(details)
    return (
        <div>
            {details.image
                ?
                <DetailWrapper
                    animate={{opacity: 1}}
                    initial={{opacity: 0}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.5}}
                >

                    <div className={'imageRes'}>
                        <h2>{details.title}</h2>

                        <img src={details.image} alt=""/>


                    </div>

                    <Info>
                        <Button className={activeTab === 'instructions' ? 'active' : ""} onClick={() => {
                            setActiveTab(`instructions`)
                        }}>Instructions</Button>
                        <Button className={activeTab === 'ingredients' ? 'active' : ""} onClick={() => {
                            setActiveTab(`ingredients`)
                        }}>Ingredients</Button>
                        {activeTab === 'instructions'
                            ? <div className={'text'}>
                                <h2>About recipe</h2>
                                <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                                <h2>How to make</h2>
                                <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>

                            </div>
                            : <div className='ingredients'>
                                <h2>Ingredients</h2>
                                <ul>
                                    {details.extendedIngredients.map(ingredient => {
                                        return (
                                            <li key={ingredient.id}>
                                                {ingredient.original}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
                    </Info>


                </DetailWrapper>
                :
                <Loader src={loading} alt=""/>
            }
        </div>
    );
};
const DetailWrapper = styled(motion.div)`
  .imageRes {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    
  }

  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  @media (max-width: 1300px) {
    margin-top: 2rem;
    flex-wrap: wrap;
   .imageRes{
     img{
       width: 100%;
       
     }
   }
  }

  .active {
    background: #000;
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-bottom: 2rem;
  }
`
const Loader = styled.img`
  transition: 1s;
  display: block;
  margin: 0 auto;
`
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  min-width: 100px;
  margin-bottom: 10px;


`
const Info = styled.div`
  margin-left: 5rem;
  
  @media (max-width: 768px) {
    .ingredients {
      margin-top: 2rem;
    }

    margin-left: 0;
    display: flex;
    flex-direction: column;
    .text {
      margin-top: 2rem;
      h3 {
        font-size: 16px;
        line-height: 22px;
      }
    }

  }
`

export default Recipe;