// This page is used to create a mongodb connection and sending it so that it can be used wherever it is imported. Used mongoose 6.10.0 because latest version of mongoose does not support call back function and it was giving error.

const mongoose = require("mongoose");
mongoose.set('strictQuery', false); // Due to deprecation warning
const mongoURI = "mongodb://ashutosh-eat24:RbduBAN3TVsAd8v3@ac-ngjk0tu-shard-00-00.crulvkz.mongodb.net:27017,ac-ngjk0tu-shard-00-01.crulvkz.mongodb.net:27017,ac-ngjk0tu-shard-00-02.crulvkz.mongodb.net:27017/eat24data?ssl=true&replicaSet=atlas-kybj9k-shard-0&authSource=admin&retryWrites=true&w=majority";
const myDBConnection = async()=>{
    await mongoose.connect(mongoURI, async(req, res)=>{  // This can be replaced with arrow function.
        // console.log("Connected");
        const fetched_data = await mongoose.connection.db.collection("fooddetails");
        fetched_data.find({}).toArray(async function(err, data) { /* Getting all data from database
        and then converting it into array from object */
            const foodCategories = await mongoose.connection.db.collection("foodCategory");
            foodCategories.find({}).toArray(function(err, newData) {
                if(err) console.log(err);
                else {
                    // console.log(newData);
                    global.food_categories = newData;
                }
            })
            if(err) console.log(err);
            else {
                global.food_items = data; // Now this variable food_items can be used anywhere inside our application as it is global now.
                // console.log(global.food_items);
            }            
        })
    })
}

module.exports = myDBConnection;