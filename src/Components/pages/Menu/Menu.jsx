import React from "react";
import "./Menu.css";

const Menu = ({ menuItems, onOrder }) => {
  return (
    <div className="menu-container">
      <h1>View Menu</h1>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div className="menu-item" key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => onOrder(item)}>Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
