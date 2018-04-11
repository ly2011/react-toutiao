import React, { PureComponent } from 'react';

class IconSvg extends PureComponent {
  render() {
    const { name, className } = this.props;
    const iconName = `#icon-${name}`;
    return (
      <svg className={`icon ${className}`} aria-hidden="true">
        <use xlinkHref={iconName} />
      </svg>
    );
  }
}

export default IconSvg;
