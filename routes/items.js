const router = require('express').Router();
let Item = require('../models/item.model');

// GET ALL ITEM
router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST AN ITEM
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
  
    const newItem = new Item({title, content});
  
    newItem.save()
      .then(() => res.json('Item is added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

// GET AN ITEM BY ID
router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE AN ITEM BY ID
router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
      .then(() => res.json('Item is deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE AN ITEM BY ID
router.route('/update/:id').post((req, res) => {
    Item.findById(req.params.id)
      .then(item => {
        item.title = req.body.title;
        item.content = req.body.content;
  
        item.save()
          .then(() => res.json('Item is updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;