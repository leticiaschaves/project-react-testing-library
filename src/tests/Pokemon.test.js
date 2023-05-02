import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test FavoritePokemon component', () => {
  it('Should render the information card correctly', () => {
    renderWithRouter(<App />);
    const src = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const averageWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(averageWeight).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');

    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImg).toBeInTheDocument();

    expect(pikachuImg.getAttribute('src')).toBe(src);
    expect(screen.getByAltText(/pikachu sprite/i)).toBeInTheDocument();
  });
  it('Should change url to pokemon id when clicking on more details', async () => {
    const src = '/star-icon.svg';
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const isItFavorite = await screen.findByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(isItFavorite).toBeInTheDocument();

    userEvent.click(isItFavorite);
    expect(isItFavorite).toBeChecked();

    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemon);

    const star = await screen.findByAltText(/pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star.getAttribute('src')).toBe(src);
  });
});
