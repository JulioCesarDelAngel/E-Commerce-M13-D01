const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include:[{model : Product}
      ]
    });
    res.status(200).json(categories);
  }
  catch(error){
    res.status(500).json(error);
  }  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id,{
      include:[{model:Product}]
    });
    res.status(200).json(categories);
  }
  catch (error){
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create({ category_name : req.body.category_name});
    //OR const category = await Category.create(req.body);
    res.status(200).json(category);
  }

  catch (error){
    res.status(500).json(error);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const result = await Category.update({
      category_name:req.body.category_name
    },
    {where :{id: req.params.id}
  })
  res.status(200).json(result);

  }
  catch (error){
    res.status(500).json(error);
  }

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
