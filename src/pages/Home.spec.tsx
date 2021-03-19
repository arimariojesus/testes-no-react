import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Home from './Home';

const mockedHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  }
});

describe("<Home />", () => {
  it("should go to List Page", () => {
    const { getByPlaceholderText, getByText } = render(<Home />);

    fireEvent.change(getByPlaceholderText("User"), {
      target: { value: "arimariojesus" },
    });
    fireEvent.click(getByText("Ver repos"));

    expect(getByPlaceholderText("User")).toHaveDisplayValue('arimariojesus');
    expect(mockedHistoryPush).toBeCalled();
  });
});