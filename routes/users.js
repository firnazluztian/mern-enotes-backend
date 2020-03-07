const router = require('express').Router();
let User = require('../models/user.model');

// GET ALL USER
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST A USER
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password

  const newUser = new User({username, email, password});

  newUser.save()
    .then(() => res.json('User is added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET A USER BY ID
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE A USER BY ID
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('user is deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE A USER BY ID
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(item => {
        item.username = req.body.username;
        item.email = req.body.email;
        item.password = req.body.password;
  
        item.save()
          .then(() => res.json('user is updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;