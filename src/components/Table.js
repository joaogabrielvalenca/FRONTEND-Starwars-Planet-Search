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
  const [subjectOrder, setSubjectOrder] = useState([]);
  const [typeOfOrder, setTypeOfOrder] = useState('ASC');
  const [newPlanetsData, setNewPlanetsData] = useState([]);

  const fetchMyApi = useCallback(async () => {
    const response = await fetchData;
    setPlanetsData(response.results);
    setNewPlanetsData(response.results);
  }, []);
  useEffect(() => {
    fetchMyApi();
  }, [fetchMyApi]);
  useEffect(() => {
    setSubject(subjectList[0]);
    setSubjectOrder(subjectList[0]);
  }, [subjectList, filtered]);

  const nameFilter = planetsData.filter(
    (planet) => planet.name.includes(name),
  );
  const buttonSubmit = () => {
    const filteredData = planetsData.filter((planet) => {
      const findSubject = subjectList.find((item) => item === subject);
      setSubjectList(subjectList.filter((item) => item !== findSubject));
      if (comparision === 'maior que') {
        return Number(planet[subject]) > valueFilter;
      } if (comparision === 'menor que') {
        return Number(planet[subject]) < valueFilter;
      } if (comparision === 'igual a' && planet[subject] === valueFilter) {
        return planet;
      }
      return console.log(planet);
    });
    setPlanetsData(filteredData);

    setFiltered((previousFilters) => [
      ...previousFilters,
      { subject, comparision, valueFilter },
    ]);
  };
  const planetsDatCopy = [...planetsData];

  const sortedDesc = planetsDatCopy.sort((a, b) => {
    if (a[subjectOrder] === 'unknown') return Number('1');
    if (b[subjectOrder] === 'unknown') return Number('-1');
    if (a[subjectOrder] === b[subjectOrder]) return Number('0');
    return b[subjectOrder] - a[subjectOrder];
  });

  const onDeleteFilter = (index) => {
    const elementToSplice = filtered;
    const abc = elementToSplice.splice(index, 1);
    setFiltered(elementToSplice);
    const deletedSubject = abc[0].subject;
    filtered.forEach((fil) => {
      const filteredData = newPlanetsData.filter((planet) => {
        if (fil.comparision === 'maior que') {
          return Number(planet[fil.subject]) > fil.valueFilter;
        } if (fil.comparision === 'menor que') {
          return Number(planet[fil.subject]) < fil.valueFilter;
        } if (fil.comparision === 'igual a'
          && planet[fil.subject] === fil.valueFilter) {
          return planet;
        }
        return console.log(fil);
      });
      setPlanetsData(filteredData);
    });
    setSubjectList((prevSubject) => [
      ...prevSubject, deletedSubject,
    ]);
    if (filtered.length === 0) return setPlanetsData(newPlanetsData);
  };

  const removeAllFilters = () => {
    setFiltered([]);
    setPlanetsData(newPlanetsData);
    setSubjectList(['population', 'orbital_period', 'diameter', 'rotation_period',
      'surface_water']);
  };
  const sortSubmit = () => {
    if (typeOfOrder === 'ASC') {
      const sortedAsc = planetsDatCopy.sort((a, b) => {
        if (a[subjectOrder] === 'unknown') return Number('1');
        if (b[subjectOrder] === 'unknown') return Number('-1');
        if (a[subjectOrder] === b[subjectOrder]) return Number('0');
        return a[subjectOrder] - b[subjectOrder];
      });
      setPlanetsData(sortedAsc);
    } if (typeOfOrder === 'DESC') {
      setPlanetsData(sortedDesc);
    }
  };
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
          ) => (<option key={ subjects } value={ subjects }>{ subjects }</option>))}
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
        <h4>Ordenação de coluna</h4>
        <select
          value={ subjectOrder }
          onChange={ (e) => setSubjectOrder(e.target.value) }
          data-testid="column-sort"
        >
          {subjectList.map((
            subjects,
          ) => (<option key={ subjects } value={ subjects }>{ subjects }</option>))}
        </select>
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="ASC"
          value="ASC"
          id="ASC"
          onChange={ (e) => setTypeOfOrder(e.target.value) }
        />
        <label htmlFor="ASC">ASC</label>
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          name="ASC"
          value="DESC"
          id="DESC"
          onChange={ (e) => setTypeOfOrder(e.target.value) }
        />
        <label htmlFor="DESC">DESC</label>
        <button
          data-testid="column-sort-button"
          onClick={ sortSubmit }
        >
          ORDENAR
        </button>
        {filtered.map((filter, index) => (
          <span
            key={ filter.subject }
            data-testid="filter"
            id={ `buttonDelete ${index}` }
          >
            {`${filter.subject} | ${filter.comparision} | ${filter.valueFilter}  `}
            <button
              onClick={ () => onDeleteFilter(index) }
            >
              deletar
            </button>
          </span>
        ))}

        <button
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          REMOVER FILTROS
        </button>
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
              <td data-testid="planet-name">{data.name}</td>
              <td>{data.rotation_period}</td>
              <td data-testid="orbital-period">{data.orbital_period}</td>
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
