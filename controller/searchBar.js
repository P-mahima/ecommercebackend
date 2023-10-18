// const ProductModel = require("../model/ProductModel");
const ProductModel = require("../model/ProductModel");
const Orders = require('../model/OrderModel')
const cart = require('../model/CartModel')

// const getProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error while getting all categories",
//       error,
//     });
//   }
// };

// const getSingleProductById = async (req, res) => {
//   try {
//     const product = await productModel.findOne({ id: req.params.id });
//     res.send(product);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error while getting a category",
//       error,
//     });
//   }
// };

async function addNewUser(req, res) {
    try {
        const deta = req.body;
        const newuser = await ProductModel.create(deta)
        res.status(200).send({ Client: newuser })
    }
    catch (e) {
        res.status(500).send({ err: e })
    }
}


const findData = async (req, res) => {
    const data = req.body;
    const result = await ProductModel.find();
    return res.send({ result: result })
}


const findcategory = async (req, res) => {
    const data = req.body;
    const { category } = req.params;
    const result = await ProductModel.find({ category: category });
    return res.send({ result: result })
}

const deleteProductModel = async (req, res) => {
    const data = req.body;
    const result = await ProductModel.deleteMany();
    return res.send({ msg: "data has been deleted", result: result });
};


///Addtocart function
const addToCart = async (req, res) => {
    const { user_id } = req.body;
    const _id = req.params.ProductModel_id;
    const data = await ProductModel.findOne({ _id: _id });
    console.log(data);

    const result = await cart.create({
        user_id,
        data,
    });
    return res.send({ msg: "product Added to Cart", result: result })
}


const fetchCartData = async (req, res) => {
    const user_id = req.params.user_id;

    const user = await cart.find({ user_id: user_id });
    return res.send(user);
};

const removeProduct = async (req, res) => {
    const { user_id } = req.body;
    const _id = req.params.ProductModel_id;
    const data = await ProductModel.findOne({ _id: _id })
    console.log(data);

    const result = await cart.deleteOne({ _id: _id })

    return res.send({
        msg: "Products removed from cart",
        result: result,
    })
}

////order function////////////////////////////////////////////////////////////////////////////////

const orderAdd = async (req, res) => {
    const data = req.body;
    const date = new Date();

    const { formattedDate, formattedTime } = formatDateTime(date);

    date.orderDate = formattedDate;
    date.orderTime = formattedTime;

    try {
        const result = await Orders.create(data);
        res.send(result);
    }
    catch (err) {
        console.error("Error inserting data: ", err);
        res.status(500).send({
            message: "Internal Server error",
            statusCode: 500,
        })
    }
};

const fetchOrder = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const result = await Orders.find({ user_id });
        res.send(result);
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send({
            message: "Internal server error",
            statusCode: 500,
        });
    }
}

const fetchAllOrder = async (req, res) => {
    const { cartItems, cartTotalAmount, cartTotalQuantity, user_id } = req.body;
    try {
        const result = await Orders.find();
        res.send(result);
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send({
            message: "Internal server error",
            statusCode: 500,
        });
    }
};

const deleteUserOrder = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const result = await Orders.deleteOne({ user_id });
        res.send(result);
    } catch (err) {
        console.error("Error in Deleting data: ", err);
        res.status(500).send({
            message: "Internal Server Error",
            statusCode: 500,
        })
    }
}

const deleteAllOrder = async (req, res) => {
    const { user_id } = req.body;

    try {
        const result = await Orders.deleteMany();
        res.send("deleted");
    } catch (err) {
        console.error("Error in Deleting all the Data: ", err);
        res.status(500).send({
            message: "Internal Server Error",
            statusCode: 500,
        })
    }
};


const getProductsFilter = async(req,res)=>{
    try{
      const title = req.params.title;
      const regex = new RegExp(title, 'i')
   const Product = await ProductModel.find({ title: regex });
      res.send(Product);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while getting a category",
        error,
      });
    }
  }






module.exports = {
    addNewUser,
    findData,
    findcategory,
    deleteProductModel,
    addToCart,
    fetchCartData,
    removeProduct,
    orderAdd,
    fetchOrder,
    fetchAllOrder,
    deleteUserOrder,
    deleteAllOrder,
    getProductsFilter

  
};