import React from 'react';
import {FaPizzaSlice, FaHamburger} from 'react-icons/fa';
import {GiNoodles, GiChopsticks} from 'react-icons/gi';
import styled from "styled-components";
import {NavLink} from 'react-router-dom'

const Category = () => {
    return (
        <List>
            <Slunk to={'/cuisine/Italian'}>
                <FaPizzaSlice/>
                <h4>Italian</h4>
            </Slunk>

            <Slunk to={'/cuisine/American'}>
                <FaHamburger/>
                <h4>American</h4>
            </Slunk>

            <Slunk to={'/cuisine/Thai'}>
                <GiNoodles/>
                <h4>Thai</h4>
            </Slunk>

            <Slunk to={'/cuisine/Japanese'}>
                <GiChopsticks/>
                <h4>Japanese</h4>
            </Slunk>

        </List>
    );
};

const List = styled.div`
display: flex;
  justify-content: center;
  margin: 2rem 0;
`
const Slunk = styled(NavLink)`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius:  50px ;
  margin-right: 2rem;
  text-decoration: none;
  background: linear-gradient(35deg,#494949,#313131);
  width: 5rem ;
  height: 5rem ;
  cursor: pointer;
  color: white;
  h4{
    color: white;
    font-size: 0.6rem;
    font-weight: bold;
  }
  svg{
    color: white;
    font-size: 1.5rem;
    
  }
  &.active{
    background:linear-gradient(to right, #f27121, #e94067) ;
    svg{
      color: white;
    }
    h4{
      color: white;
    }
    
  }
`

export default Category;