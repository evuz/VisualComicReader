import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  test('should render component', () => {
    const { getByText } = render(<Button onClick={() => {}}>Click me!</Button>);
    const element = getByText(/Click me!/i);
    expect(element).toBeInTheDocument();
  });

  test('should render default component', () => {
    const { getByText } = render(<Button onClick={() => {}}>Click me!</Button>);
    const element = getByText(/Click me!/i);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('is-primary');
    expect(element).toHaveClass('Button');
    expect(element).not.toBeDisabled();
    expect(element).toHaveAttribute('type', 'button');
  });

  test('should fire click event', (done) => {
    const click = () => {
      done();
    };
    const { getByText } = render(<Button onClick={click}>Click me!</Button>);
    const element = getByText(/Click me!/i);

    expect(element).toBeInTheDocument();

    fireEvent.click(element);
  });

  ['primary', 'ghost'].forEach((state: any) => {
    test(`should render ${state} colors`, () => {
      const { getByText } = render(
        <Button color={state} onClick={() => {}}>
          Click me!
        </Button>,
      );
      const element = getByText(/Click me!/i);
      expect(element).toHaveClass(`is-${state}`);
    });
  });

  test('should render submit type', () => {
    const { getByText } = render(
      <Button type="submit" onClick={() => {}}>
        Click me!
      </Button>,
    );
    const element = getByText(/Click me!/i);
    expect(element).toHaveAttribute('type', 'submit');
  });

  test('should render disabled', () => {
    const { getByText } = render(
      <Button disabled onClick={() => {}}>
        Click me!
      </Button>,
    );
    const element = getByText(/Click me!/i);
    expect(element).toBeDisabled();
  });
});
