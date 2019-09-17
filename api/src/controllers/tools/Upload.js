const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join("./", "public", "uploads"));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname.replace(" ", "_"));
    }
});

const upload = multer({ storage: storage });

module.exports = {
    file(req, res) {
        try {
            const uploaded = upload.single("image");

            uploaded(req, res, function(err) {
                if (err instanceof multer.MulterError) {
                    res.status(400).json({ status: false, message: err });
                } else if (err) {
                    res.status(400).json({ status: false, message: err });
                } else {
                    console.log(req.hostname, req.port);
                    res.json({
                        status: true,
                        message: "Imagem enviada com sucesso.",
                        image: String(req.file.path).replace(/\\/g, "/")
                    });
                }
            });
        } catch (e) {
            res.status(400).json({ status: false, message: e });
        }
    }
};
