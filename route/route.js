const route = require('express').Router()

const { addNewUser, findData, findcategory, deleteProductModel, addToCart, fetchCartData, removeProduct, orderAdd, fetchOrder, fetchAllOrder, deleteUserOrder, deleteAllOrder, getProductsFilter } = require('../controller/searchBar')
const {RegisterUser,LoginUser} = require('../controller/usercontroller')
const data = require('../dummydata/data')



route.post('/register', RegisterUser)
route.post('/login',LoginUser)

//data
route.get('/data' , (req, res) => {
    res.send(data)
})

//search product

route.post('/addnewuser' , addNewUser)
route.get('/finddata', findData)
route.get('/findcategory/:category' , findcategory)
route.delete('/deleteall' ,deleteProductModel)
route.post('/addtocart/:Productmodel_id' , addToCart)
// CartRoute.post("/addtocart/:product_id", addToCart)
route.get("/fetchcartdata/:user_id", fetchCartData)
route.delete('/delete/:Productmodel_id', removeProduct)

route.post('/addorder', orderAdd)
route.get('/orderuserdetail/:user_id', fetchOrder)
route.get("/ordersdetail", fetchAllOrder)
route.get("/orderdelete/:user_id", deleteUserOrder)
route.get("/orderalldelete", deleteAllOrder);
route.get('/searchfilter/:title', getProductsFilter)



module.exports = route

// mongodb+srv://pawarmahima23:*****@cluster0.qlc8m4p.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp