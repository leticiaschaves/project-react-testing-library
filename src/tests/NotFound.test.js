import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Test NotFound component', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  it('Should have a heading with Page requested not found text', () => {
    const nofFound = screen.getByRole('heading', { name: /page requested not found/i });
    expect(nofFound).toBeInTheDocument();
  });
  it('Should render the image', () => {
    const pikachuCrying = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(pikachuCrying).toBeInTheDocument();

    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(pikachuCrying.getAttribute('src')).toBe(src);
  });
});
