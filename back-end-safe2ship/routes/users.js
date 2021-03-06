const express = require('express');
const router = express.Router();

// ----------------## Routes userGET-----------------------------------------------

module.exports = ({
    getUserByEmail,
    getPackagesById,
    getOrdersById,
    getSystem_ids,
    getUserBySystem_id
}) => {
   
// ----------------------------## Routes userGET----------------------------------
    router.get('/user', (req, res) => {
        getUserByEmail(req.body.email)
            .then((user) => {
                if (user.rows.length != 0 && user.rows[0].satus != 'deleted' && bcrypt.compareSync(req.body.password, user[0]['password'])) {
                    req.session.user_id = user[0]['system_id'];
                    
                    let userInfo = {"user": user.rows}

                // ---------------------------------------------------------------------
                    Promise.all([
                        getPackagesById(user.rows[0].id),
                        getOrdersById(user.rows[0].id)
                    ]).then((all) => {
                        userInfo["packages"] = all[0].rows;
                        userInfo["orders"] = all[1].rows;
                        res.json(userInfo)
                    })

                // ---------------------------------------------------------------------
                    // getPackagesById(user[0].id)
                    //     .then((pkgs) => {
                    //         userInfo["packages"] = pkgs;
                    //     })
                    //     .catch((err) => res.json({
                    //         error: err.message
                    //     }))
    
                    // getOrdersById(user[0].id)
                    //     .then((orders) => {
                    //         userInfo["orders"] = orders;
                    //         res.json(userInfo)
                    //     })
                    //     .catch((err) => res.json({
                    //         error: err.message
                    //     }))

                } else if (user.length === 0 || user[0].satus != 'deleted'){
                    res.json({error: "The requested account does not exist. Please go to Sign-Up!", code: "xac"})
                } else {
                    res.json({error: "incorrect passward", code: "xpw"})
                }
                
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

// ----------------------------## Routes userPOST-----------------------------

    router.post('/user', (req, res) => {

        const { email } = req.body;

        getUserByEmail(email)
            .then(user => {
                if (user.length != 0) {
                    res.json({
                        msg: 'Sorry, a user account with this email already exists. Try another'
                    });
                } else {
                    return postUser(req.body)
                }
            })
            .then(newUser => res.json(newUser))
            .catch(err => res.json({
                error: err.message
            }));

    })

// ----------------------------## Routes userPATCH-----------------------------
    router.patch('/user/update', (req, res) => {
        const { email } = req.body;
            updateUser(req.body)
                .then(newUser => res.json(newUser))
                .catch(err => {
                    res.json({error: err.message})
                })     
    });

    
// ----------------------------## Routes userPUT-----------------------------
    router.put('/user/upgrade', (req, res) => {
        upgradeUser(req.body)
            .then(newUser => {
                req.body['status'] === 'shipper' ? req.body['status'] = 'customer' : req.body['status'] = 'shipper';
                deleteUserByStatus(req.body); // soft delete
                res.json(newUser);
            })
            .catch(err => {
                res.json({error: err.message})
            })

        const { email } = req.body;
        // getUserByEmail(email)
        //     .then(user => 
        //         {return user.rows;}
        //     ) 
        //     .catch(err => {
        //         res.json({error: err.message})
        //     }) 
    });


// ----------------------------## Routes userDELETE-----------------------------
    router.delete('/user/delete', (req, res) => {
        deleteUserByStatus(req.body) // soft delete
            .catch(err => {
                res.json({error: err.message})
            }) 
    });




// ----------------------------## Routes getOtherUser-----------------------------
    router.get('/user/other', (req, res) => {
        getUserBySystem_id(req.body)
            .then(otherUser => {
                const { 
                    name,
                    phone,
                    email,
                    photo,
                    address,
                    number_of_orders,
                    number_of_packages,
                    rating_sum,
                    bio,
                    status,
                    system_id,
                    web_link,
                    work_schedule 
                } = otherUser.rows[0];
                if (status != 'deleted') {
                    res.json({ 
                        name,
                        phone,
                        email,
                        photo,
                        address,
                        number_of_orders,
                        number_of_packages,
                        rating_sum,
                        bio,
                        status,
                        system_id,
                        web_link,
                        work_schedule 
                    })
                } else {
                    res.json({msg: 'Oops! Sorry, the requested user deleted the profile!'}) 
                }
            })
            .catch(err => {
                res.json({error: err.message})
            }) 
    });

    return router;
};

// const express = require('express');
// const router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
