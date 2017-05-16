var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', function(req, res) {
  db.getUsers(req.app.get('connection'))
    .then(function(users) {
      res.render('index', {
        users: users
      })
    })
    .catch(function(err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})


router.get('/profile/:id', function(req, res) {
  db.getProfile(req.params.id, req.app.get('connection'))
    .then(function(profile) {
      console.log(profile[0])
      res.render('profile', {user: profile[0], posts: profile})
    })
    .catch(function(err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})



router.post('/addUser', function(req, res) {
  db.addUser(req.body.name, req.body.email, req.app.get('connection'))
    .then((user_id) => {
      var link_id = user_id
     db.addProfile(user_id[0],req.app.get('connection'))
       .then(() => res.redirect(`/profile/${link_id}`))
    })

    .catch(function(err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })

})

// router.post('/profile/:id/addPost', function(req, res) {
//   db.addUser(req.body.name, req.body.email, req.app.get('connection'))
//     .then((user_id) => {
//       var link_id = user_id
//      db.addProfile(user_id[0],req.app.get('connection'))
//        .then(() => res.redirect(`/profile/${link_id}`))
//     })
//
//     .catch(function(err) {
//       res.status(500).send('DATABASE ERROR: ' + err.message)
//     })
//
// })



module.exports = router
