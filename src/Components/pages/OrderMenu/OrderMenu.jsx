import React, { useState } from "react";
import "./OrderMenu.css";
const OrderMenu = () => {
  const [message, setMessage] = useState("");

  const menuItems = [
    {
      id: 1,
      name: "Menu Item 1",
      description: "Description of Menu Item 1",
      price: 10,
    },
    {
      id: 2,
      name: "Menu Item 2",
      description: "Description of Menu Item 2",
      price: 15,
    },
    {
      id: 3,
      name: "Menu Item 3",
      description: "Description of Menu Item 3",
      price: 20,
    },
  ];

  const placeOrder = async (item) => {
    const orderData = {
      customerId: 1, // Assuming a static customer ID for this example
      items: [{ name: item.name, price: item.price }],
      totalPrice: item.price,
      orderType: "dine-in", // or "delivery"
      tableNumber: 1, // Assuming a static table number for dine-in
      deliveryAddress: null, // Not needed for dine-in
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.text();
      setMessage(data); // Show success message
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage(`Failed to create order: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>View Menu</h1>
      {message && <p>{message}</p>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              textAlign: "center",
            }}
          >
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => placeOrder(item)}>Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderMenu;
