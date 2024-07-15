import { render, screen } from "@testing-library/react";

describe('default framework test', () => { 
  test('should pass', () => {
    expect(true).toBe(true);
  });

  test('should handle rtl', () => {
    render(<div>Test</div>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
 })