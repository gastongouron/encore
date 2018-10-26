import styled from 'styled-components';
// import theme from '../app/theme'

const UnstyledList = styled.ul`
  list-style: none;
  text-align: center;

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
  	font-weight: 300;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
`;

export default UnstyledList;
