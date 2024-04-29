const express = require("express");
const jwt = require("jsonwebtoken");
const secretKey = "MyKey";
const router = new express.Router();
const Member = require("../models/members");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const memberData = await Member.findOne({ email: email });
    if (!memberData) {
      res.status(200).json({ token: null, memberData });
    } else {
      if (memberData.password === password) {
        jwt.sign(
          { email, password },
          secretKey,
          { expiresIn: "1d" },
          (e, token) => {
            res.status(200).json({ token, memberData });
            // res.status(200).json(token);
            // Save the token in localStorage
            localStorage.setItem("jwtToken", { token });
          }
        );
      } else {
        // res.status(200).json({ error: "wrong Password" });
        res.status(200).json({ token: null, memberData });
      }
    }
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
});
////////////UPDATE Members/////////////
router.patch("/member", (req, res) => {});
////////////Delete Member////////////////
router.delete("/member", (req, res) => {});
module.exports = router;
