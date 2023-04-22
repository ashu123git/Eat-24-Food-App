import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  const [search, setSearch] = useState(""); // This is for implementing search functionality in Carousal.
  const [foodItem, setFoodItem] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  
  // This below line is used to fetch the data from below url(our backend) from where we are sending the two arrays of fooditems and foodcategory.
  let loadData = async()=>{
    let getData = await fetch("https://react-app-brvd.onrender.com/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    getData = await getData.json();
    setFoodItem(getData[0]);
    setFoodCategory(getData[1]);
    // console.log(getData[0], getData[1]);
  }

  // This is used so that whenever our page loads for the first time, the loaddata functionruns automatically. Any function that we will write inside useEffect will run automatically when the page loads if the array provided as the second argument is empty.
  useEffect(()=>{
    loadData();
  }, []);

  function handleChange(event) {
    setSearch(event.target.value);
  }


  return (
    <div>
      <div>
        <Navbar />
      </div>
       <div> {/* have written Carousal Component here in the home page because I have to implement that search functionality and it will depend on the data which is not present at components folder so I have moved Carousal component from that folder to here. */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex">
                <input
                  className="form-control me-2 bg-dark text-white"
                  type="search"
                  placeholder="Search for your food"
                  aria-label="Search"
                  value={search}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                className="d-block"
                width="100%"
                height="100%"
                src="https://source.unsplash.com/random/960x560/?pastry"
                style={{ objectFit: "cover", filter: "brightness(30%)" }}
                alt="Pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://source.unsplash.com/random/960x560/?burger"
                style={{ objectFit: "cover", filter: "brightness(30%)" }}
                alt="Burger"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block"
                width="100%"
                height="100%"
                src="https://source.unsplash.com/random/960x460/?pizza"
                style={{ objectFit: "cover", filter: "brightness(30%)" }}
                alt="Pastry"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            data-bs-target="#carouselExampleIndicators"
            type="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>
          <button
            className="carousel-control-next"
            data-bs-target="#carouselExampleIndicators"
            type="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>
      <div>
        {/*Below code till line 140 is for running the logic so that all the pizza data should come under pizza category, starters under starter, etc */}
        {
          foodCategory !== ""
          ? foodCategory.map((data)=>{
            return (
              <div className="row mb-3">
              <div className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {
                foodItem !== ""
                ? foodItem.filter((itemData)=> itemData.CategoryName === data.CategoryName && itemData.name.toLowerCase().includes(search.toLocaleLowerCase())).map((newData)=>{
                  return (
                    <div key={newData._id} className="col-12 col-md-6 col-lg-3">
                      <Card 
                      foodData = {newData}
                      options={newData.options[0]}
                      />
                    </div>
                  );
                }): <div>No Such Data Found</div>
              }
              </div>
            );
          })
          : ""
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
