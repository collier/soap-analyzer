import React, { Component } from 'react';
import '../css/web-service-list.css';

export default class WebServiceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeServiceId: -1
    };
  }

  handleClick(service, index, event) {
    this.setState(prevState => ({
      activeServiceId: index
    }));
  }

  render() {
    const self = this;
    const serviceList = this.props.serviceList.map((service, index) => {
      const selected = this.state.activeServiceId === index ? 'selected' : '';
      const itemProps = {
        key: index,
        className: 'list-group-item ' + selected,
        onClick: self.handleClick.bind(self, service, index)
      };
      return <li {...itemProps}>{service.name}</li>;
    });
    return (
      <div className="WebServiceList">
        <ul className="list-group">
          {serviceList}
        </ul>
      </div>
    );
  }

}