const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

// init mongodb
mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

// first endpoint
const Product = mongoose.model("products", new mongoose.Schema({
	_id: { type: String, default: shortid.generate },
	title: String,
	description: String,
	image: String,
	price: Number,
	availableSizes: [String],
}));

app.get("/api/products", async (req, res) => {
	const products = await Product.find({});
	res.send(products);
});

app.post("/api/products", async (req, res) =>{
	const newProduct = new Product(req.body);
	const savedProduct = await newProduct.save();
	try {
		const returnJSON = {
			"success": true,
			"statusCode": "DATA-FETCHED",
			"response": "Data fetched successfully",
			"product": savedProduct
		}
		res.send(returnJSON);
	} catch (error) {
		const returnJSON = {
			"success": false,
			"statusCode": "ERROR-OCCURRED",
			"error": error,
			"response": "Data falied to submit",
			"product": savedProduct
		}
		res.send(returnJSON);
	}
});

app.delete("/api/products/:id", async(req, res) => {
	const deletedProduct = await Product.findByIdAndDelete(req.params.id);
	res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http:://localhost:5000"));