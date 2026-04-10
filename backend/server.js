require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
const multer = require("multer");


const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

app.post("/upload", upload.single("image"), async (req, res) => {
    const file = req.file;

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: Date.now() + "-" + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    const result = await s3.upload(params).promise();
    res.json({ url: result.Location });
});


app.get("/images", async (req, res) => {
    const params = {
        Bucket: "uploadbucket-abhi73"
    };

    const data = await s3.listObjectsV2(params).promise();

    const imageUrls = data.Contents.map(item =>
        `https://${params.Bucket}.s3.ap-south-1.amazonaws.com/${item.Key}`
    );

    res.json(imageUrls);
});

app.post("/delete", async (req, res) => {
    const { url } = req.body;

    const key = url.split("/").pop();

    await s3.deleteObject({
        Bucket: "uploadbucket-abhi73",
        Key: key
    }).promise();

    res.send("Deleted");
});

app.listen(5000);