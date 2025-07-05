import { render, screen } from '@testing-library/react';
import App from './App';

test('renders service selection', () => {
  render(<App />);
  const heading = screen.getByText(/Escolha um serviço/i);
  expect(heading).toBeInTheDocument();
});
