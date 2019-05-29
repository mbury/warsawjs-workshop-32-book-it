import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { BEDS_TYPE } from '../../utils/const';

import Filters from './Filters';

afterEach(cleanup);

it('render all filters', () => {
  const onClick = jest.fn();
  const length = BEDS_TYPE.length;
  const { getAllByTestId } = render(<Filters onChange={onClick} />);
  const checkbox = getAllByTestId('checkbox-filter');
  expect(checkbox.length).toBe(length);
});

it('call onChange with new filter value', () => {
  const onClick = jest.fn();
  const filter = BEDS_TYPE[0];
  const { getByLabelText } = render(<Filters onChange={onClick} />);
  const checkbox = getByLabelText(filter.text);
  fireEvent.click(checkbox);
  expect(onClick).toHaveBeenCalledWith(filter.value, true);
});

it('render 0 if no unit in filter', () => {
  const { getAllByTestId } = render(<Filters />);
  const checkbox = getAllByTestId('checkbox-filter');
  expect(checkbox[0].textContent).toMatch(/\(0\)/i);
});

it('render unit number in filter', () => {
  const filterIndex = 0;
  const unitInFilter = 1;
  const filter = BEDS_TYPE[filterIndex];
  const count = { [filter.value]: unitInFilter };
  const { getAllByTestId } = render(<Filters count={count} />);
  const checkbox = getAllByTestId('checkbox-filter');
  expect(checkbox[0].textContent).toMatch(new RegExp('(' + unitInFilter + ')'));
});
