import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { StoreList, StoreCard, StoreOpenStatus } from '../StoreList';
import { stores } from '@/app/test-data/store';

describe('StoreCard', () => {
  it('renders a store card', () => {
    const store = stores[0];
    const { container } = render(<StoreCard store={store} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByText(`${store.Chain}, ${store.City}`)).toBeInTheDocument();
    expect(screen.getByText(store.Address)).toBeInTheDocument();
    expect(screen.getByText(store.Phone)).toBeInTheDocument();
    expect(screen.getByText(store.OpeningHoursToday)).toBeInTheDocument();
  });
});

describe('StoreOpenStatus', () => {
  it('renders open status', () => {
    const { container } = render(<StoreOpenStatus open={true} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Åpent')).toBeInTheDocument();
  });

  it('renders closed status', () => {
    const { container } = render(<StoreOpenStatus open={false} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Stengt')).toBeInTheDocument();
  });
});

describe('StoreList', () => {
  it('renders a list of stores', () => {
    const { container } = render(<StoreList stores={stores} />);
    expect(container).toMatchSnapshot();
    expect(screen.getAllByRole('listitem').length).toBe(stores.length);
  });
});
