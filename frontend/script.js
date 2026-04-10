const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");

// file name + preview
fileInput.addEventListener("change", function () {
    const file = this.files[0];
    fileName.textContent = file ? file.name : "No file chosen";

    if (file) {
        const oldPreview = document.getElementById("preview");
        if (oldPreview) oldPreview.remove();

        const preview = document.createElement("img");
        preview.id = "preview";
        preview.src = URL.createObjectURL(file);
        preview.style.width = "200px";
        preview.style.height = "200px";
        preview.style.objectFit = "cover";

        document.querySelector(".upload-section").appendChild(preview);
    }
});

// upload image
async function uploadImage() {
    const file = fileInput.files[0];

    if (!file) {
        showToast("Select a file ❌");
        return;
    }

    loader.style.display = "block";

    try {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("https://photo-gallery-s3.onrender.com/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        addImageToGallery(data.url);

        fileInput.value = "";
        fileName.textContent = "No file chosen";
        document.getElementById("preview")?.remove();

        showToast("Uploaded ✅");

    } catch (err) {
        showToast("Upload failed ❌");
    }

    loader.style.display = "none";
}

// add image
function addImageToGallery(url) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = url;

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.className = "delete-btn";

    btn.onclick = async () => {
        await fetch("https://photo-gallery-s3.onrender.com/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        card.remove();
    };

    card.appendChild(img);
    card.appendChild(btn);
    gallery.appendChild(card);
}

// toast
function showToast(msg) {
    const t = document.createElement("div");
    t.innerText = msg;
    t.style.position = "fixed";
    t.style.bottom = "20px";
    t.style.right = "20px";
    t.style.background = "#000";
    t.style.color = "#fff";
    t.style.padding = "10px";
    t.style.borderRadius = "8px";

    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
}

async function loadImages() {
    try {
        const res = await fetch("https://photo-gallery-s3.onrender.com/images");
        const images = await res.json();

        gallery.innerHTML = "";

        images.forEach(url => {
            addImageToGallery(url);
        });

    } catch (err) {
        console.error("Error loading images", err);
    }
}

loadImages();