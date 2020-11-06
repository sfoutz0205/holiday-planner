const router = require('express').Router();
const {
    User,
    ToDo
} = require('../../models');
const { post } = require('../home-routes');

//Get all ToDos
router.get('/', (req, res) => {
    ToDo.findAll({
        attributes: ['id', 'title', 'contents'],
    })
    .then ((dbPostData) => res.json(dbPostData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
});

//Create a ToDos
router.post('/', (req,res) => {
    console.log("Elfs at work");
    ToDo.create({
        title: req.body.title,
        // content: req.body.++++,
        user_id: req.session.user_id
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

//Update a ToDo
router.put('/:id', (req, res) => {
    ToDo.update({
        title: req.body.title,
        // content: req.body.+++
    }, {
        where: {
            id: req.params.id,
        },
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({
                message: "No post found with this id"
            });
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

//Delete a post
router.delete("/:id", (req, res) => {
    ToDo.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "The Elfs were unable to locate this post."
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;