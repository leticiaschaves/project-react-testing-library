import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test NotFound component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Should have a heading with Encountered Pokémon text', () => {
    const heading = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(heading).toBeInTheDocument();
  });
  it('Should show next Pokemon when clicking on Próximo Pokémon', () => {
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });
  it('Should show only a pokemon each time', () => {
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  it('Pokédex should have filter buttons', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const electricButton = screen.getByRole('button', { name: /electric/i });
    const fireButton = screen.getByRole('button', { name: /fire/i });
    const bugButton = screen.getByRole('button', { name: /bug/i });
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    const normalButton = screen.getByRole('button', { name: /normal/i });
    const dragonButton = screen.getByRole('button', { name: /dragon/i });

    expect(filterButtons).toHaveLength(7);
    expect(electricButton).toBeInTheDocument();
    expect(fireButton).toBeInTheDocument();
    expect(bugButton).toBeInTheDocument();
    expect(poisonButton).toBeInTheDocument();
    expect(psychicButton).toBeInTheDocument();
    expect(normalButton).toBeInTheDocument();
    expect(dragonButton).toBeInTheDocument();
  });
  it('Pokédex should have a button to reset filters', () => {
    const next = screen.getByRole('button', { name: 'Próximo Pokémon' });
    const poison = screen.getByRole('button', { name: 'Poison' });
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    userEvent.click(next);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(poison);

    const ekans = screen.getByText('Ekans');
    expect(ekans).toBeVisible();
    expect(next).toBeDisabled();

    userEvent.click(allButton);
    expect(pikachu).toBeInTheDocument();

    expect(next).not.toBeDisabled();
  });
});
