const experss = require('express');
const router = experss.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");
const { profileSchema } = require("../validations");
const { zodErrorHandle } = require("../helpers/errorHandle");

router.get('/profile', getUserProfile);
router.put('/profile', zodErrorHandle(profileSchema), updateUserProfile);

module.exports = router;