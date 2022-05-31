const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Note, Notebook, Tag } = require('../../db/models');

const router = express.Router();


router.get("/", asyncHandler(async (req, res) => {
  // const allNotebooks = await Notebook.findAll({ include: { model: User } })
  // res.json(allNotebooks)
  // console.log("hi")
  
  // const userId = req.params.userId;
  const notebooks = await Notebook.findAll({
    include: Note,
    // where: {
    //   userId
    // }
  });
  
  return res.json(notebooks)
}))






















//-----------------------NOTE VALIDATOR-----------------------
const validateNote = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Title cannot be longer than 50 characters'),
  handleValidationErrors,
];
//-----------------------GET ALL NOTES-----------------------
// router.get("/", asyncHandler(async (req, res) => {

//   const userId = req.params.userId;
//   const notes = await Note.findAll({
//     where: {
//       userId: userId
//     },
//     order: [["updatedAt", "DESC"]],
//   })

//   return res.json(notes)
// }))
//-----------------------CREATE NOTE-----------------------
// router.post('/new', validateNote, requireAuth, asyncHandler(async (req, res) => {
  //   const { content, dueDate, listId } = req.body;
  //   const newnote = await note.create({
    //     content,
    //     dueDate,
    //     userId: req.session.auth.userId
    //   });
    //   await Listnote.create({
      //     noteId: newnote.id,
      //     listId
//   })
//   res.redirect('/notes')
// })
// );

module.exports = router;
