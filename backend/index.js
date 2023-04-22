const express = require("express");
// const router = require("./Routes/CreateUser");
const app = express();
const path = require("path");
const myDb = require("./db");
myDb();

// Since, two origins are used here that is localhost 3000 and 5000. Therefore cross-origin error came. To get rid of that error, below code snippet is used to allow cross-origin.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://eat24food.netlify.app");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json()); // This is used to so that we can use json type data in our express app.
app.use("/", require("./Routes/CreateUser")); // This will set the endpoint as /createuser and will run the details that are present in createuser.js file
app.use("/", require("./Routes/LoginUser"));
app.use("/", require("./Routes/DisplayData"));
app.use("/", require("./Routes/OrderData"));

// Static files
// app.use(express.static(path.join(__dirname, "./build")));
// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "./build/index.html"));
// })


app.get("/", function(req, res) {
    res.send("Working fine");
})

const port = process.env.PORT || 5000;

app.listen(port, function(req, res) {
    console.log("Server started on port 5000");
})