import express from "express";
import morgan from "morgan";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 8000

let users = [];
app.use(cors())
app.use(express.json())
app.use(morgan("short"))

app.use((req, res, next) =>{
    console.log("A Request Came ", req.body)
})


app.get("/users", (req, res) => {
    res.send(users);
})

app.get("/user:id", (req, res)=>{
    if(users[req.params.id]){
        res.send(users[req.params.id])
    }

    else{
        res.send("User Not Found!")
    }
});

app.post("/users", (req, res) =>{
    if(!req.body.name || !req.body.email || req.body.address){
        res.status(400).send("Invalid Data");
    }

    else{
        users.push({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        })

        res.send("User Created");
    }
})
 
app.put("/users", (req, res) => {
    if(users[req.params.id]){
        if(req.body.name){
            users[req.params.id].name = req.body.name
        }

        if(req.body.email){
            users[req.params.id].email = req.body.email
        }

        if(req.body.address){
            users[req.params.id].address = req.body.address
        }

        res.send(users[req.params.id])
    }

    else{
        res.send("User Not Found!")
    }
});

app.delete("/users", (req, res) => {
    if(users[req.params.id]){
        users[req.params.id] = {}
        res.send("User Id Deleted Successfully!")
    }

    else{
        res.send("User Not Found!")
    }
})

app.get("/home", (req, res) => {
    res.send("Here is your Home Page")
})
app.get("/about", (req, res) => {
    res.send("Here is your about Page")
})
app.get("/profile", (req, res) => {
    res.send("Here is your profile Page")
})

app.listen(PORT, ()=>{
    console.log(`This Port is listing on Heroku at this Port No. ${PORT}`)
})