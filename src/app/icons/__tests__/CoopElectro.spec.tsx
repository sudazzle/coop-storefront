import { render } from '@testing-library/react';
import { CoopElectro } from '../CoopElectro';

describe('CoopElectro', () => {
  it('should match snapshot', () => {
    const { container } = render(<CoopElectro />);
    expect(container).toMatchSnapshot();
  });
});