import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchcart } from "./ContextReducer";
// Here dispatch and cart is used for My Cart functionality
function Card(props) {
  const dispatch = useDispatchcart();
  const data = useCart();
  // console.log(data);

  // the below 2 lines are for displaying options according to the food. object.keys means that we want to display keys of the object "options" from our database
  const options = props.options; 
  const availableOptions = Object.keys(options);

  // qty and size are used so that we can display the finalPrice according to the amount of food selected by the user. For example, 2 Pizza, 5 Rice, etc.
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice = qty*parseInt(options[size]);

  async function handleAddToCart() {
    // The below code is for updating the price of items if user selected same item multiple times. Previously, it was adding the same items multiple times.
    let food = []
    // console.log("Yes");
    // console.log(props.foodData);
    for (const item of data) {
      if (item.id === props.foodData._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      // Below If condition means that we can increased the count of same item.
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodData._id, price: finalPrice, qty: qty })
        return
      }
      // Below means that count of same item is increased but size is changed.
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodData._id, name: props.foodData.name, price: finalPrice, qty: qty, size: size,img: props.foodData.img })
        // console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    await dispatch({type: "ADD", id: props.foodData._id, name: props.foodData.name, qty: qty, size: size, price: finalPrice, img: props.ImgSrc})
  }

  // Below lines is to display the initial price of the items when the page loads for the first time.
  const priceRef = useRef();
  useEffect(() => {
    setSize(priceRef.current.value);
  }, [])

  
  return (
    <div>
    <div
      className="card mt-3 bg-transparent rounded"
      style={{ width: "18rem", maxHeight: "360px", border: "1px solid" }}
    >
      <img src={props.foodData.img} className="card-img-top" alt="..." style={{height: "160px", objectFit: "fill"}}/>
      <div className="card-body">
        <h5 className="card-title">{props.foodData.name}</h5>
        {/* <p className="card-text">{props.desc}</p> */}
        <div className="container w-100">
          <select className="m-2 h-100 bg-danger" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
            {availableOptions.map((data)=>{
              return (
                <option key={data} value={data}>{data}</option>
              );
            })}
          </select>
          <select className="m-2 h-100 bg-danger" onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6), (element, index) => {
              return (
                <option key={index + 1} value={index + 1}>
                  {" "}
                  {index + 1}{" "}
                </option>
              );
            })}
          </select>
          <div className="d-inline fs-5 h-100 ">₹{finalPrice}/-</div>
        </div>
        <hr/>
        <button className={"btn btn-danger justify-center ms-2"} onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </div>
    </div>
  );
}

export default Card;
