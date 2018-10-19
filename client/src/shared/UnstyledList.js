import styled from 'styled-components';
import theme from '../app/theme'

const UnstyledList = styled.ul`
  list-style: none;
  margin-top:24px;
  text-align: center;
  li {
  }
  padding: 0;
  a {
  	color: #283593;
  	font-weight: 300;
    text-decoration: none;
  }
  a:hover {
  	color: #283593;
    text-decoration: none;
  }
`;

export default UnstyledList;
