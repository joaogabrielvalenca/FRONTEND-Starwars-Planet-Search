import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

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
    const rotationPeriod = screen.getByText('Rotation Period')
    const orbitalPeriod = screen.getByText('Orbital Period')
    const diameter = screen.getByText('Diameter')
    const climate = screen.getByText('Climate')
    const gravity = screen.getByText('Gravity')
    const terrain = screen.getByText('Terrain')
    const surfaceWater = screen.getByText('Surface Water')
    const population = screen.getByText('Population')
    const films = screen.getByText('Films')
    const created = screen.getByText('Created')
    const edited = screen.getByText('Edited')
    const url = screen.getByText('URL')
    expect(name).toBeInTheDocument()
    expect(rotationPeriod).toBeInTheDocument()
    expect(orbitalPeriod).toBeInTheDocument()
    expect(diameter).toBeInTheDocument()
    expect(climate).toBeInTheDocument()
    expect(gravity).toBeInTheDocument()
    expect(terrain).toBeInTheDocument()
    expect(surfaceWater).toBeInTheDocument()
    expect(population).toBeInTheDocument()
    expect(films).toBeInTheDocument()
    expect(created).toBeInTheDocument()
    expect(edited).toBeInTheDocument()
    expect(url).toBeInTheDocument()
  })
})
