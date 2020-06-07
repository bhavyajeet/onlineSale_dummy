const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');
let Order = require('./models/order');

app.use(cors());
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);


// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});


// Getting all the products
userRoutes.route('/showprod').post(function (req, res) {
    console.log(req.body.userName)
    Product.find({
        $and: [
            { Owner: req.body.userName },
            { Status: 'waiting' }
        ]
    }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    }).sort('Price');
});

// Getting ready to dispatch products
userRoutes.route('/dispatch').post(function (req, res) {
    console.log(req.body.userName)
    Product.find({
        $and: [
            { Owner: req.body.userName },
            { Status: 'placed' }
        ]
    }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    }).sort('Price');
});



// Getting all the orders
// userRoutes.route('/custorders').post(function(req, res) {
//     console.log(req.body.userName)
//     Order.find({username:req.body.userName},function(err, orders) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(orders);
//         }
//     }).sort('Price');
// });

userRoutes.route('/custorders').post(function (req, res) {
    console.log(req.body.userName)
    Order.aggregate([
        { $match: { username: req.body.userName } },
        {
            $project: {
                "productid": {
                    $toObjectId: "$productid"
                },
                "Price": "$Price",
                "vendorname": "$vendorname",
                "productname": "$productname",
                "username": "$username",
                "Quantity": "$Quantity",
                "status": "$status",
                "hasratedv": "$hasratedv"

            }
        },
        {
            $lookup: {
                // let: { "productid": { $toObjectId: "$productid" } },
                from: "products",
                localField: "productid",
                foreignField: "_id",
                as: "newmerge"
            }
        }], function (err, orders) {
            if (err) {
                console.log(err);
            } else {
                console.log(orders)
                res.json(orders);
            }
        }).sort('Price');
});





userRoutes.route('/ordupd').post(function (req, res) {
    console.log(req.body.userName)
    Order.find(
        {
            vendorname: req.body.vendorname,
            productname: req.body.productname
        }
        , function (err, orders) {
            if (err) {
                console.log(err);
            } else {
                orders.forEach(function (value) {
                    value.status = 'dispatched'
                    value.save()
                });
                console.log(orders)
                res.json(orders);
            }
        }).sort('Price');
});



//show all dispatched orders to vendor
userRoutes.route('/disp').post(function (req, res) {
    console.log(req.body.userName)
    Order.aggregate([
        { $match: { vendorname: req.body.userName, status: 'dispatched' } },
        {
            $project: {
                "productid": {
                    $toObjectId: "$productid"
                },
                "Price": "$Price",
                "vendorname": "$vendorname",
                "productname": "$productname",
                "username": "$username",
                "Quantity": "$Quantity",
                "status": "$status"

            }
        },
        {
            $lookup: {
                // let: { "productid": { $toObjectId: "$productid" } },
                from: "products",
                localField: "productid",
                foreignField: "_id",
                as: "newmerge"
            }
        }], function (err, orders) {
            if (err) {
                console.log(err);
            } else {
                console.log(orders)
                res.json(orders);
            }
        })//.sort('Price');
});




























userRoutes.route('/custorderswaiting').post(function (req, res) {
    console.log(req.body.userName)
    Order.aggregate([
        { $match: { username: req.body.userName, status: 'waiting' } },
        {
            $project: {
                "productid": {
                    $toObjectId: "$productid"
                },
                "Price": "$Price",
                "vendorname": "$vendorname",
                "productname": "$productname",
                "username": "$username",
                "Quantity": "$Quantity",
                "status": "$status"

            }
        },
        {
            $lookup: {
                // let: { "productid": { $toObjectId: "$productid" } },
                from: "products",
                localField: "productid",
                foreignField: "_id",
                as: "newmerge"
            }
        }], function (err, orders) {
            if (err) {
                console.log(err);
            } else {
                console.log(orders)
                res.json(orders);
            }
        }).sort('Price');
});



// Adding a new user
userRoutes.route('/add').post(function (req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ 'User': 'User added successfully' });
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Adding a new product
userRoutes.route('/addprod').post(function (req, res) {
    let product = new Product(req.body);
    console.log(req.body)
    product.save()
        .then(product => {
            res.status(200).json({ 'Product': 'Product added successfully' });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('Error');
        });
});







// Getting a user by id
userRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});


// update products
userRoutes.route('/updprod').post(function (req, res) {
    console.log(req.body.productname)
    // var id = mongoose.Types.ObjectId(req.body.productid);
    // var id = mongoose.mongo.BSONPure.ObjectID.fromHexString(req.body,productid)
    // console.log(id)
    Product.findOne({
        $and: [
            { name: req.body.productname },
            { Owner: req.body.vendorname },
            // {_id:id}
        ]
    }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            // console.log(req.body.vendorname)
            if (req.body.action == "remove") {
                users.Status = "cancelled";
                users.save()
                    .then(users => {
                        console.log("updated successfully")
                        res.status(200).json({ 'Product': 'Product added successfully' });
                    })
                    .catch(err => {
                        res.status(400).send('Error');
                    });
            }
            if (req.body.action == "increase") {
                console.log(req.body.productname)
                console.log(req.body.vendorname)
                console.log(users.Orders)
                users.Orders = users.Orders + req.body.quantity;
                console.log(users.Orders)
                console.log(users.Quantity)
                if (users.Orders > users.Quantity) {
                    users.Status = 'placed'

                }
                users.save()
                    .then(users => {
                        console.log("updated successfully")
                        res.status(200).json({ 'Product': 'Product added successfully' });
                    })
                    .catch(err => {
                        res.status(400).send('Error');
                    });
            }
            if (req.body.action == "dispatch") {
                users.Status = "dispatched";
                users.save()
                    .then(users => {
                        console.log("updated successfully")
                        res.status(200).json({ 'Product': 'Product dispatched successfully' });
                    })
                    .catch(err => {
                        res.status(400).send('Error');
                    });
            }

        }
    });
});








// customer search products
userRoutes.route('/searchpro').post(function (req, res) {
    console.log(req.body.userName)
    Product.aggregate([
        { $match: { name: req.body.userName } },
        {
            $lookup: {
                from: "users",
                localField: "Owner",
                foreignField: "username",
                as: "newmerge"
            }
        }], function (err, users) {
            if (err) {
                console.log(err);
            } else {
                console.log(users)
                res.json(users);
            }
        }) //.sort(req.body.sortby);
});














// customer search products
userRoutes.route('/searPchpro').post(function (req, res) {
    console.log(req.body.userName)
    Product.find({ name: req.body.userName }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log("returned")
            res.json(users);
        }
    }).sort(req.body.sortby);
});

// customer orders item
userRoutes.route('/orderitem').post(function (req, res) {
    let order = new Order(req.body);
    console.log(req.body)
    order.save()
        .then(order => {
            res.status(200).json({ 'Order': 'Order added successfully' });
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


// Verify a user
userRoutes.route('/verify').post(function (req, res) {
    console.log(req.body.password);
    let user = new User(req.body);
    User.find({
        $and: [
            { username: req.body.username },
            { email: req.body.password }
        ]
    }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            if (users.length == 0) {
                console.log("returned")
                res.json({ 'status': 'failed' });
            }
            else {
                console.log(users[0].usertype)
                res.json({
                    'status': 'success',
                    'type': users[0].usertype
                });
            }
        }
    });
});





// vendor rating
userRoutes.route('/ratevendor').post(function (req, res) {
    console.log(req.body.vendorname)
    // var id = mongoose.Types.ObjectId(req.body.productid);
    // var id = mongoose.mongo.BSONPure.ObjectID.fromHexString(req.body,productid)
    // console.log(id)
    Order.findById(req.body.orderid, function (err, orders) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body.orderid)
            orders.hasratedv = 1;
            orders.save()
                .then(orders => {
                    console.log(orders)
                    console.log("updated successfully")
                    // res.status(200).json({'Product': 'Product added successfully'});
                })
                .catch(err => {
                    res.status(400).send('Error');
                });
        }
    })
    User.findOne({
        username: req.body.vendorname
    }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            users.rating.push(req.body.ratingval);
            users.save()
                .then(users => {
                    console.log(users)
                    console.log("updated successfully")
                    res.status(200).json({ 'Product': 'Product added successfully' });
                })
                .catch(err => {
                    res.status(400).send('Error');
                });
        }
    })
});


// order rating
userRoutes.route('/rateorder').post(function (req, res) {
    console.log(req.body.vendorname)
    // var id = mongoose.Types.ObjectId(req.body.productid);
    // var id = mongoose.mongo.BSONPure.ObjectID.fromHexString(req.body,productid)
    // console.log(id)
    Product.findById(req.body.productid, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body.rating)
            let toadd = req.body.user + '/%*' + String(req.body.rating) + '/%*' + req.body.review
            product.Rating.push(toadd)
            console.log(product)
            product.save()
                .then(product => {
                    console.log(product)
                    console.log("updated successfully")
                    // res.status(200).json({'Product': 'Product added successfully'});
                })
                .catch(err => {
                    res.status(400).send('Error');
                });
        }
    })
    Order.findById(req.body.orderid, function (err, order) {
        if (err) {
            console.log(err);
        } else {
            console.log("popopopopo")
            order.israted = true
            order.save()
                .then(order => {
                    console.log(order)
                    console.log("order updated successfully")
                    res.status(200).json({ 'Product': 'Product added successfully' });
                })
                .catch(err => {
                    res.status(400).send('Error');
                });
        }
    })
});




// get reviews 
userRoutes.route('/showrev').post(function (req, res) {
    console.log(req.body.productid)
    // var id = mongoose.Types.ObjectId(req.body.productid);
    // var id = mongoose.mongo.BSONPure.ObjectID.fromHexString(req.body,productid)
    // console.log(id)
    Product.findById(req.body.productid, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            console.log(product.Rating)
            res.json(product.Rating)
        }
    })
});



// update order
userRoutes.route('/updquan').post(function (req, res) {
    console.log(req.body.orderid)
    // var id = mongoose.Types.ObjectId(req.body.productid);
    // var id = mongoose.mongo.BSONPure.ObjectID.fromHexString(req.body,productid)
    // console.log(id)
    Order.findById(req.body.orderid, function (err, orders) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body.orderid)
            orders.Quantity = Number(req.body.updquan);
            orders.save()
                .then(orders => {
                    console.log(orders)
                    console.log("updated successfully")
                    // res.status(200).json({'Product': 'Product added successfully'});
                })
                .catch(err => {
                    res.status(400).send('Error');
                });
        }
    })
    Product.findById(req.body.productid, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            product.Orders = Number(req.body.totalquan);
            product.save()
                .then(orders => {
                    console.log(orders)
                    console.log("updated successfully")
                    // res.status(200).json({'Product': 'Product added successfully'});
                })
                .catch(err => {
                    res.status(400).send('Error');
                });
        }

    })
});









app.use('/', userRoutes);

app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});
