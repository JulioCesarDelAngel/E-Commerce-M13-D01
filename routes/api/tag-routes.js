const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include:[{model : Product}]
    });
    res.status(200).json(tags);
  }
  catch (error){
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include:[{model:Product}]
    });
    res.status(200).json(tags);
  }
  catch(error){
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create({tag_name : req.body.tag_name});
    res.status(200).json(tag);
  }
  catch (error){
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const result = await Tag.update({
      tag_name:req.body.tag_name
    },
    {where : {id : req.params.id} })
    res.status(200).json(result);
  }
  catch (error){
    res.status(500).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
