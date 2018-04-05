import React from 'react';

const TabPanel = ({ name, id, isActive, children }) => {
  const className = isActive ? 'tab-pane active' : 'tab-pane';
  return (
    <div role="tabpanel" className={className} id={id}>
      {children}
    </div>
  );
}

export default TabPanel;
