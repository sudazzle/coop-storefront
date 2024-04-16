import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Page', () => {
  it('renders a button', () => {
    const { container } = render(<Button>Test</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('active state of button is visible', () => {
    render(<Button active={true}>Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-900 text-white');
  });

  it('inactive state of button is visible', () => {
    render(<Button active={false}>Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-white text-blue-900');
  });

  it('clicking the button calls the onClick handler', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Test</Button>);
    screen.getByRole('button').click();
    expect(onClick).toHaveBeenCalled();
  });
});