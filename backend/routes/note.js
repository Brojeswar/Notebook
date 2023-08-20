const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE1: Get all the notes using GET: "/api/notes/fetchallnotes" (login required)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// ROUTE2: Add a new note using POST: "/api/notes/addnote" (login required)
router.post(
  "/addnote",
  fetchuser,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Description must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are error return bad request with the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newNote = new Note({ title, description, tag, user: req.user.id });
      const createdNote = await newNote.save();
      res.json(createdNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE3: Update an existing note using PUT: "/api/notes/updatenote" (login required)
router.put(
  "/updatenote/:id",
  fetchuser,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Description must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are error return bad request with the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      const note = await Note.findById(req.params.id);
      if (!note) {
        res.status(404).send("Not found");
      }
      if (note.user.toString() !== req.user.id) {
        res.status(401).send("Not allowed");
      }
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ updatedNote });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE4: Delete an existing note using DELETE: "/api/notes/deletenote" (login required)
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not found");
    }
    // allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not allowed");
    }
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: deletedNote });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
