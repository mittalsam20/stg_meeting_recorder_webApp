const express = require("express")
const router = express.Router();
const bodyParser = require("body-parser")
const note = require("../models/notemodels")

router.use(bodyParser.urlencoded({ extended: true }));


router.get("/note/:id", (req, res) => {
    try {
        note.findById(req.params.id)
            .then(foundnote => res.json(foundnote))
            // .catch(res.json({ message: "No Notes Yet..!!" }))
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete("/notes/:id", async(req, res) => {
    try {
        const temp = req.params.id;
        if (temp !== null) {
            console.log("atleaast inside")
            console.log(temp)
            const result = await note.findByIdAndDelete(temp);
            console.log(result);
            res.status(200).json({ message: "Note Removed" });
        } else {
            res.status(404).json({ message: "Note not Found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


// ---------------------------------------------BELOW IS FOR ALL NOTES--------------------------------//

router.route("/notes")
    .get((req, res) => {
        try {
            note.find().then(foundnote => res.json(foundnote))
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .post(async(req, res) => {
        try {
            if (!req.body.title || !req.body.content || !req.body.recId) {
                return res.status(400).json({ error: "Title/Content Missing..!!" })
            }
            const newNote = new note({
                recId: req.body.recId,
                title: req.body.title,
                content: req.body.content
            })
            console.log(req.body.content)
            newNote.save().then(data => {
                res.status(200).json({
                    message: "Note saved successfully",
                    data
                });
                // console.log(json(data));
            }).catch(error => { res.status(500).json(error) })
        } catch (err) {
            res.status(500).json(err);
        }
    })



module.exports = router;