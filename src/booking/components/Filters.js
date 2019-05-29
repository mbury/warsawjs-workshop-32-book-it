import React from 'react';
import { Header, Divider, Checkbox } from 'semantic-ui-react';
import { BEDS_TYPE } from '../../utils/const';

const Filters = ({ count = {}, onChange }) => (
  <>
    <Header as="h4">Filtruj według następujących kryteriów:</Header>
    <Divider />
    <Header as="h5">Rodzaj łóżka</Header>
    {BEDS_TYPE.map(b => (
      <div data-testid="checkbox-filter" key={b.value}>
        <Checkbox
          id={b.text}
          onChange={(e, { value, checked }) => onChange(value, checked)}
          value={b.value}
          label={b.text}
        />{' '}
        ({count[b.value] || 0})
      </div>
    ))}
  </>
);

export default Filters;
