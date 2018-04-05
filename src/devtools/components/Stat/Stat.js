import React from 'react';
import './Stat.css';

const Stat = ({ label, value }) => (
  <span className="Stat">
    <span className="Stat__label">{label}: </span>
    <span className="Stat__value">{value}</span>
    <br/>
  </span>
);

export default Stat;
