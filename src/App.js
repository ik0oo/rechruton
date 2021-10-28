// libs
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// compoents
import { Dropdown } from './dropdown';

// sevices
import { initMap } from './map';

// data
import data2 from './__fixtures__/data2.json';
import data from './__fixtures__/data.json'

const Layout = styled.section`
  padding: 20px;
`;

const parseDropdownData = (data) => {
  return data.summary.names.filter((item) => item).map((label, id) => ({ label, id }));
};

function App() {
  const addMarkers = initMap();
  const names = parseDropdownData(data);

  const onChangeName = async (data) => {
    const map = document.getElementById('map');
    map.classList.add('loading');

    await new Promise((res) => {
      setTimeout(() => {

        console.log(data)
        map.classList.remove('loading');

        const data2Parsed = Object.entries(data2.cities).filter(([key, { coordinates }]) => {
          if (!key) return false;
          if (!coordinates.latitude || !coordinates.longitude) return false;
          return true;
        }).map(([city, { vacancies, resumes, coordinates }]) => ({
          city,
          vacancies,
          resumes,
          coordinates
        }));

        addMarkers(data2Parsed)

        res();
      }, 2200);
    });
  };

  return (
    <Layout className="App">
      <Dropdown names={names} onChange={onChangeName} />
    </Layout>
  );
}

export default App;
