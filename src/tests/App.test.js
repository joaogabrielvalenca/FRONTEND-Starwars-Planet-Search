import React from 'react';
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, fireEvent  } from '@testing-library/react';
import App from '../App';
import { fetchData } from '../services/fetch';
import Table from '../components/Table';

describe('Testa os filtros da aplicação', () => {
  test('verifica se há o título star wars', () => {
    render(<App />);
    const title = screen.getByText(/Star Wars/i);
    expect(title).toBeInTheDocument();
  });
  test('verifica se há o filtro simples de nome', () => {
    render(<App />);
    const nameFilterTitle = screen.getByText(/Filtro Simples/i);
    const nameFilter = screen.getByTestId("name-filter");
    expect(nameFilter).toBeInTheDocument();
    expect(nameFilterTitle).toBeInTheDocument();
  });
  test('verifica se os filtros múltiplos estão no documento', () => {
    render(<App />);
    const subjectFilter = screen.getByTestId("column-filter");
    const comparisionFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const multipleFilterTitle = screen.getByText(/Filtros multiplos/i);
    expect(subjectFilter).toBeInTheDocument();
    expect(comparisionFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(multipleFilterTitle).toBeInTheDocument();
  });
  test('verifica se o filtro de ordem está no documento', () => {
    render(<App />);
    const sortFilter = screen.getByText(/Ordenação de coluna/i);
    const subjectFilter = screen.getByTestId("column-sort");
    const ascRadioButton = screen.getByTestId("column-sort-input-asc");
    const descRadioButton = screen.getByTestId("column-sort-input-desc");
    const filterButton = screen.getByTestId("column-sort-button");
    expect(sortFilter).toBeInTheDocument();
    expect(subjectFilter).toBeInTheDocument();
    expect(ascRadioButton).toBeInTheDocument();
    expect(descRadioButton).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
  })
  test('verifica se há uma linha com as informações a serem renderizadas', () => {
    render(<App />);
    const name = screen.getByText('Name');
    const rotationPeriod = screen.getByText('Rotation Period');
    const orbitalPeriod = screen.getByText('Orbital Period');
    const diameter = screen.getByText('Diameter');
    const climate = screen.getByText('Climate');
    const gravity = screen.getByText('Gravity');
    const terrain = screen.getByText('Terrain');
    const surfaceWater = screen.getByText('Surface Water');
    const population = screen.getByText('Population');
    const films = screen.getByText('Films');
    const created = screen.getByText('Created');
    const edited = screen.getByText('Edited');
    const url = screen.getByText('URL');
    expect(name).toBeInTheDocument();
    expect(rotationPeriod).toBeInTheDocument();
    expect(orbitalPeriod).toBeInTheDocument();
    expect(diameter).toBeInTheDocument();
    expect(climate).toBeInTheDocument();
    expect(gravity).toBeInTheDocument();
    expect(terrain).toBeInTheDocument();
    expect(surfaceWater).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(films).toBeInTheDocument();
    expect(created).toBeInTheDocument();
    expect(edited).toBeInTheDocument();
    expect(url).toBeInTheDocument();
  });
  // test('verifica se os itens da API foram renderizados', async () => {
  //   jest.setTimeout(15000);
  //   render(<App />);
  //   await waitFor(() => expect(screen.getByText('Tatooine')).toBeInTheDocument());
  // });
  test('verifica se os itens da API foram renderizados após um intervalo de 10 segundos', async () => {
    jest.setTimeout(15000);

    render(<App />);
    await waitFor(() => {
      return fetchData.then(() => {
      return expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });
  }, { timeout: 10000 });
});
  test('Verifica se o filtro de column adiciona o filtro maior que...', async () => {
    render(<App />);
    // const planet1El = await screen.findByRole('cell', {  name: /tatooine/i});
    // expect(planet1El).toBeInTheDocument();

    const columnEl = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnEl, ['diameter'])

    const comparisonEl = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonEl, ['maior que']);

    const valueEl = screen.getByTestId('value-filter');
    userEvent.type(valueEl, '100000');

    const btnFilter = screen.getByTestId('button-filter');
    userEvent.click(btnFilter);

    expect(screen.getByRole('cell', {  name: /bespin/i})).toBeInTheDocument();
    expect(screen.queryByRole('cell', {  name: /tatooine/i})).not.toBeInTheDocument();
  });

});
test('filtra os planetas corretamente', async () => {
  render(<App />);
  jest.setTimeout(15000);


  const columnFilter = screen.getByTestId('column-filter');
  fireEvent.change(columnFilter, { target: { value: 'orbital_period' } });


  const comparisonFilter = screen.getByTestId('comparison-filter');
  fireEvent.change(comparisonFilter, { target: { value: 'maior que' } });


  const valueFilter = screen.getByTestId('value-filter');
  fireEvent.change(valueFilter, { target: { value: 500 } });

  const buttonFilter = screen.getByTestId('button-filter');
  fireEvent.click(buttonFilter);

  waitFor(() => {

    expect(screen.queryByText('Alderaan')).not.toBeInTheDocument();
    expect(screen.queryByText('Yavin IV')).toBeInTheDocument();
    expect(screen.queryByText('Bespin')).toBeInTheDocument();
  });


  // expect(screen.queryByText('orbital_period')).not.toBeInTheDocument();
});
test('filtro de nome', async () => {
  render(<App />);
  jest.setTimeout(30000);
  const nameFilterInput = screen.getByTestId('name-filter');

  const name = 'Tat';
  fireEvent.change(nameFilterInput, { target: { value: name } });

  waitFor(() => {
  screen.findByRole('table');
  const filteredPlanet = screen.getByText('Tatooine');
  expect(filteredPlanet).toBeInTheDocument();
  })

});
test('testando filtro de ordenar descendente', async () => {
  render(<App />);
  const orbitalPeriodOption = await screen.getByTestId('column-sort');
  fireEvent.change(orbitalPeriodOption, { target: {value: 'orbital_period'}})
  const descRadioButton = screen.getByTestId('column-sort-input-desc');
  fireEvent.click(descRadioButton);
  const sortButton = screen.getByTestId('column-sort-button');
  fireEvent.click(sortButton);
  await waitFor(() => {
    const orbitalPeriods = screen.queryAllByTestId('orbital-period');
    expect(orbitalPeriods.length).toBeGreaterThan(0);
    expect(orbitalPeriods[0]).toHaveTextContent('5110');
  });
});
  test('testando filtro de ordenar ascendente', async () => {
  render(<App />);
  const orbitalPeriodOption = await screen.getByTestId('column-sort');
  fireEvent.change(orbitalPeriodOption, { target: {value: 'orbital_period'}})
  const descRadioButton = screen.getByTestId('column-sort-input-asc');
  fireEvent.click(descRadioButton);
  const sortButton = screen.getByTestId('column-sort-button');
  fireEvent.click(sortButton);
  await waitFor(() => {
    const orbitalPeriods = screen.queryAllByTestId('orbital-period');
    expect(orbitalPeriods.length).toBeGreaterThan(0);
    expect(orbitalPeriods[0]).toHaveTextContent('304');
  });
});

