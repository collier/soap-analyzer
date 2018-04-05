import React from 'react';

const Tabs = ({ children }) => {
  const links = children.map((child, index) => {
    const { name, id, isActive } = child.props;
    const activeClass = isActive ? 'active' : '';
    return (
      <li className={activeClass} key={index}>
        <a data-toggle="tab" href={`#${id}`}>{name}</a>
      </li>
    );
  });
  return (
    <div className="Tabs">
      <ul className="nav nav-tabs" role="tablist">
        {links}
      </ul>
      <div className="tab-content">
        {children}
      </div>
    </div>
  );
}

export default Tabs;
