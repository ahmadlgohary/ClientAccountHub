const cors = require("cors");                   // Import Cross Origin Resource Sharing.
const express = require("express");             // Import Express
const mongoose = require("mongoose");           // Import Mongoose
const body_parser = require("body-parser");     // Import Body Parser
require('dotenv').config();                     // Import environment variables

const app = express();

app.use(body_parser.json());

// access-control-allow-credentials:true
const cors_options = {origin: "*", credentials: true, optionSuccessStatus: 200};
app.use(cors(cors_options));

// Connect to mongo db
const mongo_db_api = process.env.MONGO_DB_API
mongoose.connect(mongo_db_api);
const { transaction_schema, activity_schema, user_schema, user } = require('./database_model'); // Import database_model.js

const port_name = process.env.PORT || 4545

//create host
app.get("/", (request, response) => {response.send("This is our main end point")});

//open express server
app.listen(port_name, () => {console.log("Connected")});


const user_model = mongoose.model('user', user_schema);


// CREATE ENDPOINT

// Adding a new user 
app.post("/add_user", async(request,response)=>{
    try{
        // create a new user with the given email and role
        const user_data = await user_model.create({
            "email": request["body"]["email"],
             "role":request["body"]["role"],
             "points_balance":0,
             "transaction_history":{},
             "activity_log":[],
        })

        // update the database 
        await user_data.save()

        // respond with the new user email
        response.status(200).json({message:"User created successfully",user:user_data.email});
    
    }catch(err){
        console.error(err);
        response.status(500).json({message:"Error occurred while creating user", error:err.message})
    }
})


// READ ENDPOINT


// Get All Users
app.get("/get_all_users", async (request, response)=>{
    try{
        user_data = await user_model.find()
        response.status(200).json({message: "Successfully Found all User Data", user: user_data});
    }
    catch(err){
        console.error("Error fetching users:", err);
        response.status(500).json({error: "Failed to fetch users" });
    }
})


// Get user by email
app.get("/get_user_by_email/:email", async (request, response) => {
    try{
        // find the user by email in the database
        const user_data = await user_model.findOne({"email": request.params.email})

        // check if the user exists or not, and if not return and error message
        if (!user_data) {
            return response.status(400).json({error: "User not found"})
        }

        // if the user does exist, respond with the user data
        response.status(200).json({message: "Successfully Found User Data", user: user_data});

    } catch (err) {
        console.error("Error fetching user:", err);
        response.status(500).json({error: "Failed to fetch user" });
    }
});

// DELETE ENDPOINT

// Delete user data
app.delete("/delete_user_by_email/:email", async (request,response)=>{
    try{
        // find the user data by using the email as the key
        const user_data  = await user_model.findOneAndDelete({"email": request.params.email})

        // check if the user exists or not, and if not return and error message
        if(!user_data){
            return response.status(404).json({message:"User not found"});
        }
        
        // Respond with the deleted user
        response.status(200).json({message: "User Data Successfully Removed", user: user_data});

    }catch(err){
        console.error("Error deleting user data", err);
        response.status(500).json({ error: "Failed to delete user data" });
    }
})

// UPDATE ENDPOINTS

//changing the role
app.put("/change_role", async(request,response)=>{
    try{
        // get user by email
        const user_data = await user_model.findOne({"email": request["body"]["email"]})
        
        // check if the user exists or not, and if not return and error message
        if(!user_data){
            return response.status(404).json({message:"User not found"});
        }

        // change the role and update the database
        user_data.role=request["body"]["role"]
        await user_data.save()

        // respond with the new user data
        response.status(200).json({message:"User's role changed successfully", user: user_data});
    }catch(err){
        console.error(err);
    response.status(500).json({message:"could not change role", error:err.message});
    }
})


//changing the email
app.put("/change_email", async(request,response)=>{
    try{

        // get user by email
        const user_data = await user_model.findOne({"email": request["body"]["email"]})

        // check if the user exists or not, and if not return and error message
        if(!user_data){
            return response.status(404).json({message:"User not found"});
        }

        // change the email and update the database
        user_data.email=request["body"]["new_email"]
        await user_data.save()

        // respond with the new user data
        response.status(200).json({message:"User's email changed successfully",user:user_data});

    }catch(err){
        console.error(err);
        response.status(500).json({message:"could not change role", error:err.message});
    }
})

app.put("/update_activity_log", async(request, response)=>{
    try{

        // get user by email
        let user_data = await user_model.findOne({"email": request['body']['email']})

        // check if the user exists or not, and if not return and error message
        if(!user_data){
            return response.status(404).json({message:"User not found"});
        }
        
        // create a hashmap for the activity data
        const new_activity = {
                "activity_type":    request['body']['activity_type'],
                "activity_field":   request['body']['activity_field'],
                "activity_date":    request['body']['activity_date']
            }
        
        // push to the activity_log list and update the database
        user_data['activity_log'].push(new_activity)
        await user_data.save()

        // respond with the new user data
        response.status(200).json({message:"Activity log successfully updated", user_data:user_data})

    }catch(err){
        console.error(err);
        response.status(500).json({message:"Error occurred while updating user's activity log", error: err.message})
    }
})


// Update a user's transactions
app.put("/update_transactions", async (request, response) => {
    try {
        // get user through email
        const user_data = await user_model.findOne({ "email": request.body.email });

        if (!user_data) {
            return response.status(404).json({ message: "User not found" });
        }

        // get transaction id
        const transaction_id = request.body.transaction_id;

        // map all data related to the transaction
        const transaction_data = {
            transaction_type: request.body.transaction_type,
            transaction_date: request.body.transaction_date,
            transaction_cost: request.body.transaction_cost,
            productName: request.body.productName,
            points_change: request.body.points_change,
            description: request.body.description || "",
        };

        if(transaction_id in user_data.transaction_history.toJSON()){
            response.status(500).json({message: "Error occurred while updating transaction history",error: `A transaction with this ID ${transaction_id} Already exists`});
            return
        }
        
        // update or add the transaction in the user's transaction history
        user_data.transaction_history.set(transaction_id, transaction_data);

        user_data.points_balance += request.body.points_change

        // save the changes to the user document
        await user_data.save();

        response.status(200).json({message: "Transaction history updated successfully",transaction_history: user_data.transaction_history,});
    } catch (err) {
        console.error("Error updating transaction history:", err);
        response.status(500).json({message: "Error occurred while updating transaction history",error: err.message,});
    }
});


// READ ME ENDPOINT
app.get("/readme",(request, response)=>{response.sendFile(__dirname+"/readme.html")})   