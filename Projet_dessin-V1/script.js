const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let brushColor = '#000000';
let brushSize = 5;
let isErasing = false;




// Démarre le dessin
canvas.addEventListener('mousedown', () => {
    drawing = true;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

// Fonction de dessin
function draw(event) {
    if (!drawing) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isErasing ? '#ffffff' : brushColor;

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Sélectionne une couleur
document.querySelectorAll('.color').forEach(color => {
    color.style.backgroundColor = color.getAttribute('data-color');
    color.addEventListener('click', () => {
        brushColor = color.getAttribute('data-color');
        isErasing = false;
    });
});

// Ajuste la taille du trait
document.getElementById('brush-size').addEventListener('input', (event) => {
    brushSize = event.target.value;
});

// Active le mode gomme
document.getElementById('eraser').addEventListener('click', () => {
    isErasing = true;
});

// Ajoute une image de fond
document.getElementById('upload-bg').addEventListener('click', () => {
    document.getElementById('bg-input').click();
});

document.getElementById('bg-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = reader.result;
        
    };
    reader.readAsDataURL(file);
});

// Enregistre le dessin
document.getElementById('save').addEventListener('click', () => {
    // Crée une copie temporaire du contexte pour ajouter le fond blanc
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Remplit le fond en blanc
    tempCtx.fillStyle = '#ffffff';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Dessine l'image du canevas par-dessus le fond blanc
    tempCtx.drawImage(canvas, 0, 0);

    // Enregistre le dessin avec fond blanc
    const link = document.createElement('a');
    link.download = 'dessin.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
});



// Fonction pour générer un chemin SVG depuis les données du canevas
function generateSvgPathFromCanvas(imageData) {
    let path = '';
    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            const index = (y * imageData.width + x) * 4;
            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];
            const a = imageData.data[index + 3];
            
            if (a !== 0) { // Si le pixel n'est pas transparent
                if (path === '') {
                    path += `M ${x} ${y} `;
                } else {
                    path += `L ${x} ${y} `;
                }
            }
        }
    }
    return path;
}

