import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Test About component', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  it('Should have a heading with About Pokemon text', () => {
    const title = screen.getByRole('heading', { name: /about pokédex/i });
    expect(title).toBeInTheDocument();
  });
  it('Should have two paragraphs about Pokédex', () => {
    const title = screen.getByRole('heading', { name: /about pokédex/i });
    expect(title).toBeInTheDocument();
  });
  it('Should render the image', () => {
    const pokedexImg = screen.getByRole('img', { name: /pokédex/i });
    expect(pokedexImg).toBeInTheDocument();

    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImg.getAttribute('src')).toBe(src);
  });
});
