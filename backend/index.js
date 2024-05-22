const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://aprusty:Tanya%40123@cluster0.yx6hu8c.mongodb.net/project0")

//API Creation

app.get("/", (request, response)=> {
    response.send("Express App is Running")
})

//Image storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creating upload endpoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'),(req,res)=> {
    res.json({
        success:1,
        Image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


// schema for creating products
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        require: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    }, 
})

app.post('/addproduct', async(req,res)=> {
    let products = await Product.find({});
    let id;
    if(products.length>0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id=1;
    }
    const product = new Product({

        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log("product",product);
    await product.save();
    console.log("Saved")
    res.json({
        success:true,
        name:req.body.name,
    })
})

//creating api to delete products from the database
app.post('/removeproduct', async(req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//creating api for getting all products from database and display in frontend
app.get('/product/all', async (req, res) => {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);

})

//schema creation for user model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//api to create user - creaing endpoint for registering the user
app.post('/signup', async (req, res)=>{
    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false, errors:"Existing user found with same email id"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;     
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    //using jwt authentication
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true, token})
})

//creating endpoint for user login
app.post('/login', async (req, res)=>{
    let user = await Users.findOne({email:req.body.email})
    if (user) {

        const passcompare = req.body.password === user.password;
        if (passcompare) {
            const data = {
                user:{
                    id : user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token})
        }
        else {
            return res.json({success:false, errors:"Wrong Password"})
        }
    }
    else {
         res.json({success:false, errors:"User not found"})
    }
})

//creating endpoint for new collection data
app.get('/newcollections', async (req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    res.send(newcollection);
})

//Creating endpoint for popular in women section
app.get('/popularwoman', async (req, res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4)
    res.send(popular_in_women);
})

//Creating endpoint for related product
app.post('/relatedproduct', async (req, res)=>{
    let products = await Product.find({category:req.body.category});
    let relatedProducts = products.slice(0,4)
    res.send(relatedProducts);

})



//creating middleware to fetch user
const fetchUser = async (req,res,next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}

//creating endpoint for adding products from cart data
app.post('/addtocart', fetchUser, async (req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    console.log("Added", req.body.itemId)
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
    res.send("Added") 

})

//creating endpoint to remove product from cart data
app.post('/removefromcart', fetchUser, async (req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    console.log("removed", req.body.itemId)
    if(userData.cartData[req.body.itemId]>0) {
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
        res.send("Removed") 
    }
    
})

//creating endpoint to get cart data of user when logged in
app.post('/getcart',fetchUser,async(req, res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})


app.listen(port,(error)=>{
    if(!error) {
        console.log("Server running on port "+port)
    }
    else {
        console.log("Error : "+error)
    }
});
