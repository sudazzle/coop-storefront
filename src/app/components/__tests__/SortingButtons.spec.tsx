import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortingButtons } from '@/app/components/SortingButtons';
import { SortingOrder } from '@/app/types';

describe('Page', () => {
  it('renders both sorting buttons', () => {
    const onSort = jest.fn();
    const { container } = render(<SortingButtons onSort={onSort} />)
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByText('Sorter etter Nærmeste')).toBeInTheDocument();
    expect(screen.getByText('Sorter etter Fjerneste')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('Sort by nearest should trigger sort event', () => {
    const onSort = jest.fn();
    render(<SortingButtons onSort={onSort} />)
    fireEvent.click(screen.getByText('Sorter etter Nærmeste'));
    expect(onSort).toHaveBeenCalledWith(SortingOrder.ASC);
  });

  it('Sort by farthest should trigger sort event', () => {
    const onSort = jest.fn();
    render(<SortingButtons onSort={onSort} />)
    fireEvent.click(screen.getByText('Sorter etter Fjerneste'));
    expect(onSort).toHaveBeenCalledWith(SortingOrder.DESC);
  });
});