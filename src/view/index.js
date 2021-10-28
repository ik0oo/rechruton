import { Dropdown } from '../dropdown';
import { initMap } from '../map';

import data2 from '../data2.json';

export const View = ({ names }) => {
  const addMarkers = initMap();

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
    <>
      <Dropdown names={names} onChange={onChangeName} />
    </>
  );
};