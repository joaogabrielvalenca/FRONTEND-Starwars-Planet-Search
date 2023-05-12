import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
  test('verifica se os dados do filtro são renderizados corretamente', () => {
  render(<App />);

  const subjectSelect = screen.getByTestId('column-filter');
  const comparisonSelect = screen.getByTestId('comparison-filter');
  const valueInput = screen.getByTestId('value-filter');
  const filterButton = screen.getByTestId('button-filter');

  // Verifica se os filtros estão vazios inicialmente
  expect(subjectSelect).toHaveValue('population');
  expect(comparisonSelect).toHaveValue('maior que');
  expect(valueInput).toHaveValue(0);

  // Preenche os filtros
  fireEvent.change(subjectSelect, { target: { value: 'population' } });
  fireEvent.change(comparisonSelect, { target: { value: 'igual a' } });
  fireEvent.change(valueInput, { target: { value: 5000 } });

  // Clica no botão de filtrar
  fireEvent.click(filterButton);

  // Verifica se os filtros foram preenchidos corretamente
  expect(subjectSelect).toHaveValue('population');
  expect(comparisonSelect).toHaveValue('igual a');
  expect(valueInput).toHaveValue(5000);
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
//   test('sort planets by orbital period', async () => {
//   render(<App />);
//     const orbitalPeriodOption = await screen.getByTestId('column-sort');
//     fireEvent.change(orbitalPeriodOption, { target: {value: 'orbital_period'}})
//   const descRadioButton = screen.getByTestId('column-sort-input-desc');
//   fireEvent.click(descRadioButton);
//   const sortButton = screen.getByTestId('column-sort-button');
//     fireEvent.click(sortButton);
//   await waitFor(() => {
//     const planets = screen.getAllByText(/Orbital Period/);
//     expect (planets[0].orbital_period).toBe('5110')
//   });
// });

test('testa o filtro ascendente e descendente', async () => {
  // renderiza a aplicação
  render(<App />);

  // aguarda o fetch dos dados da API
  // await screen.findByText(/loading/i, {}, { timeout: 4000 });

  // encontra o select de coluna para ordenar
  const selectEl = screen.getByTestId('column-sort');

  // seleciona "rotation_period"
  userEvent.selectOptions(selectEl, 'rotation_period');

  // encontra o input radio "ASC"
  const radioAscEl = screen.getByTestId('column-sort-input-asc');

  // clica no input radio "ASC"
  userEvent.click(radioAscEl);

  // encontra o botão de ordenar e clica
  const sortButtonEl = screen.getByTestId('column-sort-button');
  userEvent.click(sortButtonEl);

  // encontra os elementos da tabela que deveriam estar ordenados em ASC
  const sortedElementsAsc = screen.getAllByTestId('table-row-planet');
  const sortedValuesAsc = sortedElementsAsc.map((el) => el.querySelector('[data-testid="rotation_period"]').textContent.trim());

  // verifica se os valores estão de fato ordenados em ASC
  expect(sortedValuesAsc).toEqual(sortedValuesAsc.sort((a, b) => a - b));

  // encontra o input radio "DESC"
  const radioDescEl = screen.getByTestId('column-sort-input-desc');

  // clica no input radio "DESC"
  userEvent.click(radioDescEl);

  // clica no botão de ordenar novamente
  userEvent.click(sortButtonEl);

  // encontra os elementos da tabela que deveriam estar ordenados em DESC
  const sortedElementsDesc = screen.getAllByTestId('table-row-planet');
  const sortedValuesDesc = sortedElementsDesc.map((el) => el.querySelector('[data-testid="rotation_period"]').textContent.trim());

  // verifica se os valores estão de fato ordenados em DESC
  expect(sortedValuesDesc).toEqual(sortedValuesDesc.sort((a, b) => b - a));
});

})
