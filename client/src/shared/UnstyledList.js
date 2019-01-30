import styled from 'styled-components';
// import theme from '../app/theme'

const UnstyledList = styled.ul`
  padding-bottom: 100px;
  list-style: none;
  text-align: center;
  color: #212121;
  font-size: 12px;

  li {
    display: inline
    margin-bottom: 100px;
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
    color: #212121;
  	font-weight: 300;
    text-decoration: none;
  }
  a:hover {
    color: #212121;
  }
`;

export default UnstyledList;
