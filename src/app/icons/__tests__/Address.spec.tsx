import { render } from '@testing-library/react';
import { Address } from '../Address';

describe('Address', () => {
  it('should match snapshot', () => {
    const { container } = render(<Address />);
    expect(container).toMatchSnapshot();
  });
});