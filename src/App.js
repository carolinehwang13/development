import "./App.css";
import { useState } from "react";
import plantData from "./assets/plant-data.json";
import PlantItem from "./components/PlantItem.js";

plantData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

let idxtoitem = {};
plantData.forEach((item, index) => {
  idxtoitem[index] = item.name;
});

function App() {
  const [cartPrice, setCartPrice] = useState(0);
  const emptyCart = plantData.map(() => 0);
  const [cartContents, setCartContents] = useState(emptyCart);

  function addToCart (price, index){
    setPrice(totalPrice + price);
    setCart(
      cart.map((value, idx) => {
        if (idx == index) {
          return value + 1;
        } else {
          return value;
        }
      })
    );
  }

  return (
    <div className="App">
      <div id="header">
        <img id="icon" src="\images\menu-icon.png" alt="Option menu icon" />
        <h1>Plant Paradise 🌱</h1>
        <img id="icon" src="\images\cart-icon.png" alt="Shopping cart icon" />
      </div>
      <div id="body">
        <div id="inventory">
          {plantData.map((item, index) => (
            <PlantItem
              name={item.name}
              image={item.image}
              region={item.region}
              difficulty={item.difficulty}
              price={item.price}
              totalPrice={cartPrice}
              setPrice={setCartPrice}
              cart={cartContents}
              setCart={setCartContents}
              index={index}
            />
          ))}
        </div>
        <div id="cart">
          <p>
            <b>Items:</b>
          </p>
          {displayCart(cartContents)}
          <p>
            <b>Total:</b> ${cartPrice}
          </p>
        </div>
      </div>
    </div>
  );
}

function addToCart(totalPrice, price, setPrice, cart, setCart){
  setPrice(totalPrice + price);
  setCart(
    cart.map((value, idx) => {
      if (idx == index) {
        return value + 1;
      } else {
        return value;
      }
    })
  );
}

function displayCart(totalPrice, price, setPrice, cart, setCart) {
  const filteredCart = cart.filter((amount) => amount > 0);

  return filteredCart.map((amount, index) => (
    <div className="cart-item">
      <button className="cart-button">+</button>
      <p> {amount} </p>
      <button className="cart-button">-</button>
      <p>{idxtoitem[index]}</p>
    </div>
  ));
}

export default App;
