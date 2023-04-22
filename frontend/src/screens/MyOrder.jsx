import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MyOrder() {
    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        // console.log(localStorage.getItem('userEmail'))
        await fetch("https://react-app-brvd.onrender.com/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            // console.log(response);
            await setorderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])


  return (
    <div>
      <div><Navbar /></div>
      <div>
      <div className='container'>
            <div className='row'>
                {orderData !== {} ? Array(orderData).map(data => {
                    return (
                        data.orderData ?
                            data.orderData.order_data.slice(0).reverse().map((item) => {
                                return (
                                    item.map((arrayData) => {
                                        // console.log(arrayData);
                                        return (
                                            <div  >
                                                {arrayData.Order_date ? <div className='m-auto mt-5'>
                                                    {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :
                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title text-black">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0 text-black' style={{ height: "38px" }}>
                                                                        <div className='m-1'>Quantity= {arrayData.qty}</div>
                                                                        <span className='m-1'>Size= {arrayData.size}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })

                                    )
                                }) : <div className="text-white text-center fs-1">No Order History found !</div>
                        )
                    }) : ""}
                </div>
            </div>
        </div>
      <div><Footer /></div>
    </div>
  );
}

export default MyOrder;
