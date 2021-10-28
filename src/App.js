import { useEffect, useState } from 'react';

import { parseDropdownData } from './parsers'
import { View } from './view'

import data from './data.json'
import styled from 'styled-components';

const Layout = styled.section`
  padding: 20px;
`;

const Loader = styled.section`
    background: black;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    color: white;
    font-size: 26px;

  > img {
    width: 50%;
  }
`;

function App() {
  const [names, setNames] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNames(parseDropdownData(data));
    }, 2000);
  }, [setNames]);

  // fetch('http://206.189.9.184:8080/api/get?job_name="golang"')
  //   .then(data => console.log(data));

  return !names ? (<Loader><img src="./recruthon_cover.gif" alt="Loading..." /></Loader>) : (
    <Layout className="App">
      <View names={names} />
    </Layout>
  );
}

export default App;
