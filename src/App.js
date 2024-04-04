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
let itemtoidx = {};
plantData.forEach((item, index) => {
  itemtoidx[item.name] = index;
});

function App() {
  const [cartPrice, setCartPrice] = useState(0);
  const emptyCart = plantData.map(() => 0);
  const [cartContents, setCartContents] = useState(emptyCart);
  const [sort, setSort] = useState("Default");
  const [climateFilter, setClimateFilter] = useState("No Filter");
  const [difficultyFilter, setDifficultyFilter] = useState("No Filter");

  function displayCart() {
    return cartContents.map((amount, index) => {
      if (amount > 0) {
        return (
          <div className="cart-item">
            <p>{amount}x </p>
            <p>{idxtoitem[index]}</p>
          </div>
        );
      }
    });
  }

  function sortAlphabetical(plant1, plant2) {
    if (plant1.name < plant2.name) {
      return -1;
    } else {
      return 1;
    }
  }

  function sortPrice(plant1, plant2) {
    if (plant1.price < plant2.price) {
      return -1;
    } else {
      return 1;
    }
  }

  function displayPlants() {
    let myPlants = plantData;

    if (sort === "Alphabetical") {
      myPlants = myPlants.toSorted(sortAlphabetical);
    } else if (sort === "Price") {
      myPlants = myPlants.toSorted(sortPrice);
    }

    return myPlants.map((item) => (
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
        index={itemtoidx[item.name]}
        climateFilter={climateFilter}
        difficultyFilter={difficultyFilter}
      />
    ));
  }

  function reset() {
    setCartPrice(0);
    setCartContents(emptyCart);
    document.getElementById("climate-filter").value = "No Filter";
    setClimateFilter("No Filter");
    document.getElementById("difficulty-filter").value = "No Filter";
    setDifficultyFilter("No Filter");
    document.getElementById("sorting").value = "Default";
    setSort("Default");
  }

  function changeClimateFilter() {
    var climate = document.getElementById("climate-filter");
    setClimateFilter(climate.value);
  }

  function changeDifficultyFilter() {
    var difficulty = document.getElementById("difficulty-filter");
    setDifficultyFilter(difficulty.value);
  }

  function changeSort() {
    var sort = document.getElementById("sorting");
    setSort(sort.value);
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
            <select id="sorting" onChange={changeSort}>
              <option value="Default">Default</option>
              <option value="Alphabetical">Alphabetical</option>
              <option value="Price">Price</option>
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
          <div id="plants">{displayPlants()}</div>
        </div>
        <div id="cart">
          <p>
            <b>Items:</b>
          </p>
          {displayCart()}
          <p>
            <b>Total:</b> ${cartPrice}
          </p>
          <button onClick={reset}>Reset!</button>
        </div>
      </div>
    </div>
  );
}

export default App;
