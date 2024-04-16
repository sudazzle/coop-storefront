import { render } from '@testing-library/react';
import { CoopMarked } from '../CoopMarked';

describe('CoopMarked', () => {
  it('should match snapshot', () => {
    const { container } = render(<CoopMarked />);
    expect(container).toMatchSnapshot();
  });
});