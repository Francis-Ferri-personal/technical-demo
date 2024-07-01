import {act} from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

test('renders the main header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Technical demo/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders the search options section', () => {
  render(<App />);
  const searchOptionsSection = screen.getByText(/Search options/i);
  expect(searchOptionsSection).toBeInTheDocument();
});

test('renders the form component', () => {
  render(<App />);
  const formComponent = screen.getByTestId('form-component');
  expect(formComponent).toBeInTheDocument();
});

test('renders the results section', () => {
  render(<App />);
  const resultsSection = screen.getByText(/Results/i);
  expect(resultsSection).toBeInTheDocument();
});

// Reference: https://www.youtube.com/watch?v=4FIrK8fSp80
test('displays the first 10 pets', async () => {

  mockFetch.mockResolvedValue({
    json: () => Promise.resolve({
      pets: Array.from({ length: 15 }, (_, index) => ({
        owner: 'Owner 1',
        name: `Pet ${index + 1}`,
        breed: `Breed ${index + 1}`,
      })),
    }),
  } as any)

  render(<App />);

  // Simulate a form submission to update pets
  const inputOwner = screen.getByTestId('searchOwner');
  const submitButton = screen.getByRole('button', { name: /search/i });

  // Fill the form and submit it
  await act(async () => {
    userEvent.type(inputOwner, 'Owner 1');
    userEvent.click(submitButton);
  });
  // Wait for pets to be rendered
  await waitFor(() => {
    expect(screen.getAllByText(/Owner 1/i)).toHaveLength(10);
  });
});