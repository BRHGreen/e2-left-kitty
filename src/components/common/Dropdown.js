import React from "react";

const Dropdown = props => {
  const { isOpen, onClose, header, menuItems, onClick, displayValue } = props;
  return (
    <details className="accordion" open={isOpen}>
      <summary className="accordion-header">{header}</summary>
      <div className="accordion-body">
        <ul className="menu menu-nav">
          {menuItems &&
            menuItems.map((item, i) => {
              if (item) {
                return (
                  <li className="menu-item" key={i}>
                    <a onClick={() => onClick(item)}>
                      {displayValue ? item[displayValue] : item}
                    </a>
                  </li>
                );
              }
              return null;
            })}
          <li onClick={onClose}>close</li>
        </ul>
      </div>
    </details>
  );
};

export default Dropdown;
