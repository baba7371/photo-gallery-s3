# ☁️ Cloud Photo Gallery (AWS S3)

A modern cloud-based photo gallery web application where users can upload, view, and delete images using **AWS S3** as storage.

---

## 🚀 Features

* 📤 Upload images to AWS S3
* 🖼️ Display images in gallery
* ❌ Delete images from S3
* ⚡ Instant UI update (no refresh needed)
* 🎨 Modern UI with hover effects
* 🔐 Secure credentials using `.env`

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript (Vanilla)

### Backend

* Node.js
* Express.js
* Multer (file upload)
* AWS SDK

### Cloud

* AWS S3 (Storage)

---

## 📁 Project Structure

```
photo-gallery/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env   (NOT pushed to GitHub)
│
└── README.md
```

---

## ⚙️ Setup Instructions

---

### 🔹 1. Clone Repository

```
git clone https://github.com/your-username/photo-gallery-s3.git
cd photo-gallery-s3
```

---

### 🔹 2. Backend Setup

```
cd backend
npm install
```

---

### 🔹 3. Create `.env` file

Create a `.env` file inside backend folder:

```
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET=your_bucket_name
PORT=5000
```

---

## ☁️ AWS S3 Setup (IMPORTANT)

---

### 🔹 Step 1: Create S3 Bucket

* Go to AWS Console → S3
* Click **Create Bucket**
* Give unique name (e.g. `my-photo-gallery`)
* Region: `ap-south-1`

---

### 🔹 Step 2: Disable Block Public Access

* Go to bucket → Permissions
* Turn OFF "Block all public access"

---

### 🔹 Step 3: Add Bucket Policy

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

---

### 🔹 Step 4: Enable CORS

Go to Permissions → CORS → Paste:

```
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

---

### 🔹 Step 5: Create IAM User

* Go to IAM → Users → Create User
* Enable **Programmatic Access**
* Attach policy: `AmazonS3FullAccess`

👉 Copy:

* Access Key
* Secret Key

---

## ▶️ Run Backend

```
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

## 🌐 Run Frontend

Just open:

```
index.html
```

---

## 🔄 API Endpoints

### 📤 Upload Image

```
POST /upload
```

---

### 📥 Get Images

```
GET /images
```

---

### ❌ Delete Image

```
POST /delete
```

---

## ⚠️ Important Notes

* Do NOT upload `.env` file to GitHub
* Keep AWS keys secure
* Use `.gitignore`:

```
node_modules
.env
```

---

## 🎯 Future Improvements

* Image preview modal
* Drag & drop upload
* User authentication
* Image categories
* CloudFront CDN integration

---

## 🙌 Author

Made with ❤️ by Abhishek for learning Cloud Computing

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
