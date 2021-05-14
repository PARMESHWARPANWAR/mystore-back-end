const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Category = require('../models/category');


categoryTree = (parentId = "", docs) => {
    const category = docs.filter(doc=> parentId == doc.parent);

    var categories = [];
    for (var cat of category){
        categories.push({ 
            _id:cat._id,
            name:cat.name,
            slug:cat.slug,
            children:categoryTree(cat._id,docs)
        })
    }

    return categories;
}

router.get('/', (req, res) => {
    Category.find({})
    .exec()
    .then(docs =>{
        const category = categoryTree('', docs);

        res.status(201).json({ 
            message:categories
        });
    })
    .catch(err =>{
        res.status(500).json({
            error:er
        })   
    });
});

router.post('/', (req, res) => {

    const category = new Category({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        slug:req.body.slug,
        parent:req.body.parent,
        createdAt: new Date(),
        createdBy: req.body.createdBy,
    });

    category.save()
    .then(doc => {
        res.status(201).json({
            message: doc
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        })
    });
});

module.exports = router;