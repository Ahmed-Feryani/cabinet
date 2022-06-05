const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    res
      .status(200)
      .json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.log(err);
  }
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await cloudinary.uploader.destroy(user.cloudinary_id);
  } catch (err) {
    console.log(err);
  }
});

router.put("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.id);

    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
      res
        .status(200)
        .json({ url: result.secure_url, publicId: result.public_id });
    }
  } catch (err) {
    console.log(err);
  }
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

module.exports = router;
