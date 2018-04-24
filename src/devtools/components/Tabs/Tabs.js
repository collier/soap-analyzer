import React from 'react';

class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab : props.activeTab
    };
  }

  handleClick(child, event) {
    this.setState(prevState => ({
      activeTab: child.props.name
    }));
    if(this.props.onTabClick) {
      this.props.onTabClick(child.props.name);
    }
  }

  renderLinks() {
    return this.props.children.map((child, index) => {
      const { name } = child.props;
      const isTabActive = name === this.state.activeTab;
      const className = isTabActive ? 'active' : '';
      return (
        <li className={className} key={index} onClick={this.handleClick.bind(this, child)}>
          <a href="#">{name}</a>
        </li>
      );
    });
  }

  renderContents() {
    return this.props.children.map((child, index) => {
      const isTabActive = child.props.name === this.state.activeTab;
      const className = isTabActive ? 'tab-pane active' : 'tab-pane';
      return (
        <div role="tabpanel" className={className} key={index}>
          {child}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="Tabs">
        <ul className="nav nav-tabs" role="tablist">
          {this.renderLinks()}
        </ul>
        <div className="tab-content">
          {this.renderContents()}
        </div>
      </div>
    );
  }

}

export default Tabs;
