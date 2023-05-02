import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test App component', () => {
  it('Should render all link navigation', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });
  it('Should redirect to initial page when clicking Home', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();

    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const title = screen.getByRole('heading', { name: /pokédex/i });

    expect(title).toBeInTheDocument();
  });
  it('Should redirect to Favorite Pokemon when clicking Favorite Pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoritePokemon).toBeInTheDocument();

    userEvent.click(favoritePokemon);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const title = screen.getByRole('heading', { name: /favorite pokémon/i });

    expect(title).toBeInTheDocument();
  });
  it('Should redirect to Not Found when the URL does not exist', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urldoesnotexist');

    const { pathname } = history.location;
    expect(pathname).toBe('/urldoesnotexist');

    const notFound = await screen.findByRole('heading', { name: /page requested not found/i });

    expect(notFound).toBeInTheDocument();
  });
});
