import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test PokemonDetails component', () => {
  beforeEach(async () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
  });
  it('Should show all informations of the chosen Pokémon detailed', async () => {
    const pikachu = await screen.findByText(/pikachu details/i);
    expect(pikachu).toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();

    const resume = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(resume).toBeInTheDocument();
  });
  it('Should show a section of pokemons location map', () => {
    const src0 = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png';
    const src1 = 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png';

    const locationOfPikachu = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(locationOfPikachu).toBeInTheDocument();

    const gameLocation = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(gameLocation).toBeInTheDocument();

    const nameLocation = screen.getByText(/kanto viridian forest/i);
    expect(nameLocation).toBeInTheDocument();

    const imgLocation = screen.getAllByAltText(/pikachu location/i);

    expect(imgLocation).toHaveLength(2);
    expect(imgLocation[0].getAttribute('src')).toBe(src0);
    expect(imgLocation[1].getAttribute('src')).toBe(src1);

    const nameLocation2 = screen.getByText(/kanto power plant/i);
    expect(nameLocation2).toBeInTheDocument();
  });
  it('Should add to Favorite Pokemon on details page', () => {
    const isItFavorite = screen.getByText(/pokémon favoritado\?/i);
    expect(isItFavorite).toBeInTheDocument();

    userEvent.click(isItFavorite);

    const checkboxFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkboxFavorite).toBeInTheDocument();
    expect(checkboxFavorite).toBeChecked();
  });
});
