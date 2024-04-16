import { render } from '@testing-library/react';
import { Byggprix } from '../Byggprix';

describe('Byggprix', () => {
  it('should match snapshot', () => {
    const { container } = render(<Byggprix />);
    expect(container).toMatchSnapshot();
  });
});