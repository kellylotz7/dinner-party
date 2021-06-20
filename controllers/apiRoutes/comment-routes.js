const router = require('express').Router();
const { Post, User} = require('../../models');





//Get all comments
router.get('/', (req,res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['post_name']
            }

        ]

    })
    .then(dbCommentData => res.json(dbCommentData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }));
});

//Get a single comment
router.get('/:id', (req,res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Party,
                attributes: ['post_name']
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }));
});

//Create a comment
router.post('/', (req,res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Update a comment
router.put('/:id', (req,res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id'});
            return;
        }
        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Delete a comment
router.delete('/:id', (req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json;
            return;
        }
        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});    

module.exports = router;