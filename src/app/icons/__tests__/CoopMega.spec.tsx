import { render } from '@testing-library/react';
import { CoopMega } from '../CoopMega';

describe('CoopMega', () => {
  it('should match snapshot', () => {
    const { container } = render(<CoopMega />);
    expect(container).toMatchSnapshot();
  });
});