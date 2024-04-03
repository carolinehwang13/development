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
  const [sort, setSort] = useState("Default");
  const [climateFilter, setClimateFilter] = useState("No Filter");
  const [difficultyFilter, setDifficultyFilter] = useState("No Filter");

  // function addToCart(price, index) {
  //   console.log("added");
  //   setCartPrice(cartPrice + price);
  //   setCartContents(
  //     cartContents.map((value, idx) => {
  //       if (idx == index) {
  //         return value + 1;
  //       } else {
  //         return value;
  //       }
  //     })
  //   );
  // }

  function displayCart() {
    return cartContents
      .map((amount, index) => {
        if (amount > 0){
          return (
            <div className="cart-item">
              <p>{amount}x </p>
              <p>{idxtoitem[index]}</p>
            </div>
          )
        }
      })
  }

  function resetCart() {
    setCartPrice(0);
    setCartContents(emptyCart);
  }

  function changeClimateFilter() {
    var climate = document.getElementById("climate-filter");
    setClimateFilter(climate.value);
  }

  function changeDifficultyFilter() {
    var difficulty = document.getElementById("difficulty-filter")
    setDifficultyFilter(difficulty.value)
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
          <div id="actions">
            <h3>Sort:</h3>
            <select id="sort">
              <option>Default</option>
              <option>Alphabetical (A to Z)</option>
              <option>Price (low to high)</option>
              <option>Price (high to low)</option>
              <option>Difficulty</option>
            </select>
            <h3>Filters:</h3>
            <div id="filter-option">
              <p>Climate</p>
              <select id="climate-filter" onChange={changeClimateFilter}>
                <option value="No Filter">No Filter</option>
                <option value="Desert">Desert</option>
                <option value="Temperate">Temperate</option>
                <option value="Cool">Cool</option>
                <option value="Tropical">Tropical</option>
              </select>
            </div>
            <div id="filter-option">
              <p>Difficulty</p>
              <select id="difficulty-filter" onChange={changeDifficultyFilter}>
                <option value="No Filter">No Filter</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div id="plants">
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
                climateFilter={climateFilter}
                difficultyFilter={difficultyFilter}
              />
            ))}
          </div>
        </div>
        <div id="cart">
          <p>
            <b>Items:</b>
          </p>
          {displayCart()}
          <p>
            <b>Total:</b> ${cartPrice}
          </p>
          <button onClick={resetCart}>Clear cart</button>
        </div>
      </div>
    </div>
  );
}

// function addToCart(addToCart, cart){
//   setPrice(totalPrice + price);
//   setCart(
//     cart.map((value, idx) => {
//       if (idx == index) {
//         return value + 1;
//       } else {
//         return value;
//       }
//     })
//   );
// }

// function displayCart(addToCart, cart) {
//   const filteredCart = cart.filter((amount) => amount > 0);

//   return filteredCart.map((amount, index) => (
//     <div className="cart-item">
//       <button className="cart-button" onClick={addToCart(2, index)}>
//         +
//       </button>
//       <p> {amount} </p>
//       <button className="cart-button">-</button>
//       <p>{idxtoitem[index]}</p>
//     </div>
//   ));
// }

export default App;
