// import express from "express";


// const app = express();
// const PORT = 8000


// app.use(express.json())

// app.get("/",(req,res)=>{
//     res.send("Hello world");
// })


// app.listen(PORT, ()=>{
//     console.log(`This Port is listing on Heroku at this Port No. ${PORT}`)
// })




import express from "express";
import morgan from "morgan";
import cors from "cors";


const app = express();
const PORT = 8000

let users = []

app.use(cors())
app.use(express.json())
app.use(morgan("short"))


app.get("/users", (req, res) => {
    res.send(`This is all user` +users);
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
    if(!req.body.name || !req.body.email || !req.body.address){
        res.status(400).send("Invalid Data");
    }

    else{

        
        users.push({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        })
    
        res.send("User Created");
    }
})
 
app.put("/user/:id", (req, res) => {
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

app.delete("/user/:id", (req, res) => {
    if(users[req.params.id]){
        users[req.params.id] = {}
        res.send("User Id Deleted Successfully!")
    }

    else{
        res.send("User Not Found!")
    }
})

app.get("/", (req, res) => {
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

// console.log(users)