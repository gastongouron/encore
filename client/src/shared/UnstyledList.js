import styled from 'styled-components';
// import theme from '../app/theme'

const UnstyledList = styled.ul`
  list-style: none;
  text-align: center;
  color: #F1F1F1;
  font-size: 10px;
  letter-spacing: 1px;

  li {
    display: inline
  }
  li::after {
    content: "  —  ";
  }

  li:last-child {
    &::after {
      content: "";
    }
  }
  padding: 0;
  a {
    text-transform: uppercase;
    color: #F1F1F1;
  	font-weight: 300;
    text-decoration: none;
  }
  a:hover {
    color: #ffffff;
  }
`;

export default UnstyledList;
