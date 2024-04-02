export default function myPlantItem({ name, image, region, difficulty, price, totalPrice, setPrice, cart, setCart, index }) {


  
    function addToCart() {
        setPrice(totalPrice + price)
        setCart(
          cart.map((value, idx) => {
            if (idx == index) {
              return value + 1;
            } else {
              return value;
            }
          })
        )
    }
  
  
    return (
    <div className="PlantItem">
      <img id="plant-image" src={image} alt={name} />
      <h2>{name}</h2>
      <p>Climate: {region}</p>
      <p>Difficulty: {difficulty}</p>
      <p>${price}</p>
      <button className="add-button" onClick={addToCart}>Add to cart</button>
    </div>
  );
}
