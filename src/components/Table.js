import React, { useCallback, useEffect, useState } from 'react';
import { fetchData } from '../services/fetch';

function Table() {
  const [planetsData, setPlanetsData] = useState([]);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('population');
  const [subjectList, setSubjectList] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [comparision, setComparision] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filtered, setFiltered] = useState([]);

  // FUNÇÃO PARA FETCH API COM USEEFFECT
  const fetchMyApi = useCallback(async () => {
    const response = await fetchData;
    setPlanetsData(response.results);
  }, []);

  useEffect(() => {
    fetchMyApi();
  }, [fetchMyApi]);

  useEffect(() => {
    setSubject(subjectList[0]);
  }, [subjectList]);

  // FILTRO PARA NOME
  const nameFilter = planetsData.filter(
    (planet) => planet.name.includes(name),
  );

  // FILTRO PARA FILTROS MULTIPLOS NO SUBMIT
  const buttonSubmit = () => {
    const filteredData = planetsData.filter((planet) => {
      const findSubject = subjectList.find((item) => item === subject);
      setSubjectList(subjectList.filter((item) => item !== findSubject));
      console.log(findSubject);
      if (comparision === 'maior que') {
        return Number(planet[subject]) > valueFilter;
      } if (comparision === 'menor que') {
        return Number(planet[subject]) < valueFilter;
      } if (comparision === 'igual a' && planet[subject] === valueFilter) {
        return planet;
      }
    });
    setPlanetsData(filteredData);

    setFiltered((previousFilters) => [
      ...previousFilters,
      { subject, comparision, valueFilter },
    ]);
  };
  console.log(filtered);

  console.log(subject);
  return (
    <>
      <section>
        <h4>Filtro Simples</h4>
        <input
          type="text"
          data-testid="name-filter"
          value={ name }
          placeholder="filtro de nome"
          onChange={ (event) => setName(event.target.value) }
        />
        <h4>Filtros multiplos</h4>
        <select
          value={ subject }
          onChange={ (e) => setSubject(e.target.value) }
          data-testid="column-filter"
        >
          {subjectList.map((
            subjects,
          ) => (<option value={ subjects }>{ subjects }</option>))}
        </select>

        <select
          value={ comparision }
          onChange={ (e) => setComparision(e.target.value) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
          data-testid="value-filter"
        />
        <button
          data-testid="button-filter"
          onClick={ buttonSubmit }
        >
          FILTRAR
        </button>
        {/*
        {filtered.map((filter) => (
          <h4>
            {`$
            {filter.subject}
            $
            {filter.comparision}
            $
            {filter.valueFilter}
            `}
          </h4>
        ))} */}
      </section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {nameFilter.map((data) => (
            <tr key={ data.name }>
              <td>{data.name}</td>
              <td>{data.rotation_period}</td>
              <td>{data.orbital_period}</td>
              <td>{data.diameter}</td>
              <td>{data.climate}</td>
              <td>{data.gravity}</td>
              <td>{data.terrain}</td>
              <td>{data.surface_water}</td>
              <td>{data.population}</td>
              <td>{data.films}</td>
              <td>{data.created}</td>
              <td>{data.edited}</td>
              <td>{data.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
