const express = require("express");
const app = express();
const cors = require ("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//Create mydata
app.post ("/allmydata",async(req,res)=>{
    try{
        const {user_id, name , age , phone} = req.body;
        const newData = await pool.query (
            `INSERT INTO user_table (user_id , name , age , phone) VALUES (1 , 'John' , 28 , NULL) RETURNING *`
        );
        res.send(newData.rows[0]);
    }catch (err){
        console.error(err.message);
    }
})

//Get all mydata
app.get("/allmydata",async(req,res)=>{
    try {
        const AllData = await pool.query(`SELECT * FROM user_table ORDER BY user_id `);
       res.json(AllData.rows);
    } catch (error) {
        console.error(err.message);
    }
})
app.listen(5000, ()=>
{
    console.log("Server has stared on port 5000");
});