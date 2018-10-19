import styled from 'styled-components';
import theme from '../app/theme'

const UnstyledList = styled.ul`
  list-style: none;
  text-align: center;

  li {
    display: inline
  }
  li::after {
    color: white;
    content: "  —  ";
  }

  li:last-child {
    &::after {
      content: "";
    }
  }
  padding: 0;
  a {
  	color: #F1F1F1;
  	font-weight: 300;
    text-decoration: none;
  }
  a:hover {
  	color: white;
    text-decoration: none;
  }
`;

export default UnstyledList;
