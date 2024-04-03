export default function myPlantItem({ name, image, region, difficulty, price, totalPrice, setPrice, cart, setCart, index, climateFilter, difficultyFilter }) {


  
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

    function removeFromCart(){
        setPrice(totalPrice - (price * cart[index]))
        setCart(cart.map((value, idx) => {
            if (idx == index) {
                return 0;
            }else {
                return value;
            }
        }))
    }

    function inCart(){
        if (cart[index] > 0){
            return true
        }else{
            return false
        }
    }

    if((climateFilter == "No Filter" || climateFilter == region) && (difficultyFilter == "No Filter" || difficultyFilter == difficulty)){
        if(inCart()){
            return (
                <div className="PlantItem">
                    <img id="plant-image" src={image} alt={name} />
                    <h2>{name}</h2>
                    <p>Climate: {region}</p>
                    <p>Difficulty: {difficulty}</p>
                    <p>${price}</p>
                    <button className="add-button" onClick={addToCart}>Add to cart</button>
                    <button onClick={removeFromCart}>Remove from cart</button>
                </div>
            )
        }else{
            return (
                <div className="PlantItem">
                    <img id="plant-image" src={image} alt={name} />
                    <h2>{name}</h2>
                    <p>Climate: {region}</p>
                    <p>Difficulty: {difficulty}</p>
                    <p>${price}</p>
                    <button className="add-button" onClick={addToCart}>Add to cart</button>
                </div>
            )
        }
    }


}
