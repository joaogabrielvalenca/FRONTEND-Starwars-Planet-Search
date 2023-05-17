import React from 'react';
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved  } from '@testing-library/react';
import App from '../App';
import { fetchData } from '../services/fetch';
import testData  from '../../cypress/mocks/testData'

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

  test('verifica se os itens da API foram renderizados após um intervalo de 10 segundos', async () => {
    // jest.setTimeout(15000);

    render(<App />);
    await waitFor(() => {
      return fetchData.then(() => {
      return expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });
  }, { timeout: 10000 });
});

});

test('filtro de nome', async () => {
  render(<App />);
  jest.setTimeout(30000);
  const nameFilterInput = screen.getByTestId('name-filter');

  const name = 'Tat';
  fireEvent.change(nameFilterInput, { target: { value: name } });

  await waitFor(() => {
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

//TESTES NO PAU!
//TESTES NO PAU!!
//TESTES NO PAU!!!
//TESTES NO PAU!!!!
//TESTES NO PAU!!!!!

 test('Testa o botão de deletar filtro', async () => {
    render(<App />);
    // jest.setTimeout(15000);


   expect(await screen.findByText('Hoth')).toBeInTheDocument();

    const columnFilter1 = screen.getByTestId('column-filter');
    fireEvent.change(columnFilter1, { target: { value: 'population' } });


    const comparisonFilter1 = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilter1, { target: { value: 'maior que' } });


    const valueFilter1 = screen.getByTestId('value-filter');
    fireEvent.change(valueFilter1, { target: { value: '0' } });

    const buttonFilter1 = screen.getByTestId('button-filter');
   fireEvent.click(buttonFilter1);


    const columnFilter2 = screen.getByTestId('column-filter');
    fireEvent.change(columnFilter2, { target: { value: 'orbital_period' } });


    const comparisonFilter2 = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilter2, { target: { value: 'maior que' } });


    const valueFilter2 = screen.getByTestId('value-filter');
    fireEvent.change(valueFilter2, { target: { value: '444' } });

    const buttonFilter2 = screen.getByTestId('button-filter');
   fireEvent.click(buttonFilter2);

  //  screen.debug();
  //  await waitForElementToBeRemoved(await screen.queryByText('Hoth'))

   await waitFor(() => {

      expect(screen.getByText('Yavin IV')).toBeInTheDocument();
      expect(screen.getAllByTestId('planet-name').length).toBe(3)
  });

   const buttonToDelete = screen.getAllByText('deletar');
   fireEvent.click(buttonToDelete[0])
   console.log('aiehiuaheiuhaiujkfb giuyhgbfWYGYWFUOYEGfy', buttonToDelete)

   await waitFor(() => {

    expect(screen.getByText('Yavin IV')).toBeInTheDocument();
   });
   expect(await screen.findByText('Hoth')).toBeInTheDocument();
 });

 test('Testa o botão de deletar filtro', async () => {
    render(<App />);
    // jest.setTimeout(15000);


    const columnFilter1 = screen.getByTestId('column-filter');
    fireEvent.change(columnFilter1, { target: { value: 'population' } });


    const comparisonFilter1 = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilter1, { target: { value: 'igual a' } });


    const valueFilter1 = screen.getByTestId('value-filter');
    fireEvent.change(valueFilter1, { target: { value: '0' } });

    const buttonFilter1 = screen.getByTestId('button-filter');
   fireEvent.click(buttonFilter1);


    const columnFilter2 = screen.getByTestId('column-filter');
    fireEvent.change(columnFilter2, { target: { value: 'orbital_period' } });


    const comparisonFilter2 = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilter2, { target: { value: 'maior que' } });


    const valueFilter2 = screen.getByTestId('value-filter');
    fireEvent.change(valueFilter2, { target: { value: '444' } });

    const buttonFilter2 = screen.getByTestId('button-filter');
   fireEvent.click(buttonFilter2);

   const buttonToDelete = screen.getAllByTestId('filter')
   fireEvent.click(buttonToDelete[0])

    waitFor(() => {

      expect(screen.queryByText('Tatooine')).not.toBeInTheDocument();
      expect(screen.queryByText('Yavin IV')).toBeInTheDocument();
  });
 });

 test('filtra os planetas com maior que', async () => {
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


  await waitFor(() => {


    expect(columnFilter).not.toHave('orbital_period');
  });
    expect(await screen.queryByText('Alderaan')).not.toBeInTheDocument();
    expect(await screen.queryByText('Yavin IV')).toBeInTheDocument();
    expect(await screen.queryByText('Bespin')).toBeInTheDocument();
});
test('filtra os planetas com menor que', async () => {
  jest.spyOn(global,'fetch').mockImplementation(testData)
  render(<App />);

     const abc = await screen.findAllByTestId('planet-name')


    const columnFilter = screen.getByTestId('column-filter');
    fireEvent.change(columnFilter, { target: { value: 'diameter' } });


    const comparisonFilter = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilter, { target: { value: 'menor que' } });


    const valueFilter = screen.getByTestId('value-filter');
    fireEvent.change(valueFilter, { target: { value: '10465' } });

    const buttonFilter = screen.getByTestId('button-filter');
   fireEvent.click(buttonFilter);

    // await waitFor(() => {


    // });

  expect(await screen.queryByText('Tatooine')).not.toBeInTheDocument();
  expect(await screen.queryByText('Yavin IV')).toBeInTheDocument();
});

test('filtra os planetas com igual a', async () => {
   jest.spyOn(global,'fetch').mockImplementation(testData)
    render(<App />);
    // jest.setTimeout(15000);

    const abc = await screen.findAllByTestId('planet-name')

    const columnFilter = screen.getByTestId('column-filter');
    fireEvent.change(columnFilter, { target: { value: 'population' } });


    const comparisonFilter = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilter, { target: { value: 'igual a' } });


    const valueFilter = screen.getByTestId('value-filter');
    fireEvent.change(valueFilter, { target: { value: '200000' } });

    const buttonFilter = screen.getByTestId('button-filter');
   fireEvent.click(buttonFilter);


   const test = screen.queryByText('Tatooine');
   expect(test).toBeInTheDocument();
   console.log(test);

 });

  test('Testa o botão de deletar todos os filtros', async () => {
    render(<App />);
    // jest.setTimeout(15000);


    const columnFilter1 = screen.getByTestId('column-filter');
    fireEvent.change(columnFilter1, { target: { value: 'population' } });


    const comparisonFilter1 = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilter1, { target: { value: 'igual a' } });


    const valueFilter1 = screen.getByTestId('value-filter');
    fireEvent.change(valueFilter1, { target: { value: '0' } });

    const buttonFilter1 = screen.getByTestId('button-filter');
   fireEvent.click(buttonFilter1);


    const columnFilter2 = screen.getByTestId('column-filter');
    fireEvent.change(columnFilter2, { target: { value: 'orbital_period' } });


    const comparisonFilter2 = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilter2, { target: { value: 'maior que' } });


    const valueFilter2 = screen.getByTestId('value-filter');
    fireEvent.change(valueFilter2, { target: { value: '444' } });

    const buttonFilter2 = screen.getByTestId('button-filter');
   fireEvent.click(buttonFilter2);


    const columnFilter3= screen.getByTestId('column-filter');
    fireEvent.change(columnFilter3, { target: { value: 'orbital_period' } });


    const comparisonFilter3 = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilter3, { target: { value: 'maior que' } });


    const valueFilter3 = screen.getByTestId('value-filter');
    fireEvent.change(valueFilter3, { target: { value: '444' } });

    const buttonFilter3 = screen.getByTestId('button-filter');
   fireEvent.click(buttonFilter3);

   const buttonToDelete = screen.getByTestId("button-remove-filters")
   fireEvent.click(buttonToDelete)

   await waitFor(() => {

      expect(screen.queryByText('Tatooine')).toBeInTheDocument();
      expect(screen.queryByText('Alderaan')).toBeInTheDocument();
      expect(screen.queryByText('Yavin IV')).toBeInTheDocument()
      expect(screen.queryByText('Hoth')).toBeInTheDocument()
      expect(screen.queryByText('Dagobah')).toBeInTheDocument()
      expect(screen.queryByText('Bespin')).toBeInTheDocument()
      expect(screen.queryByText('Endor')).toBeInTheDocument()
      expect(screen.queryByText('Naboo')).toBeInTheDocument()
      expect(screen.queryByText('Coruscant')).toBeInTheDocument()
      expect(screen.queryByText('Kamino')).toBeInTheDocument()
  });
 });

 test('Verifica se o botão de apagar todos os filtros está presente no documento', async () => {
    render(<App />);
    // jest.setTimeout(15000);

   const buttonToDelete = screen.getByTestId("button-remove-filters")

   expect(buttonToDelete).toBeInTheDocument();

 })
