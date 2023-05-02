import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test FavoritePokemon component', () => {
  beforeEach(async () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const pikachu = await screen.findByRole('heading', { name: /pikachu details/i });
    expect(pikachu).toBeInTheDocument();
  });
  it('Should show the message No favorite pokemon found, if there is not', async () => {
    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemon);

    const noFound = await screen.findByText(/no favorite pokémon found/i);
    expect(noFound).toBeInTheDocument();
  });
  it('Should show all favorite pokemon, if there is', async () => {
    const isItFavorite = await screen.findByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(isItFavorite).toBeInTheDocument();

    userEvent.click(isItFavorite);
    expect(isItFavorite).toBeChecked();

    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemon);

    const star = await screen.findByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toBeInTheDocument();
  });
});
