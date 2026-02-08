const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sadSound = document.getElementById("sadSound");
const loveSound = document.getElementById("loveSound");

let yesClicked = false;
let noClickCount = 0;
let size = 22;
let padding = 18;
let growCount = 0;

// Messages Non
let noTexts = [
    "Non", "T’es sûre ? 😕", "Vraiment vraiment ? 😢", "Allez… 🥺",
    "Sofia stp 😭", "Réfléchis encore 🙏", "Je suis gentil pourtant 🧸",
    "Ça me rend triste 😔", "Ok… mais ça fait mal 💔", "Je commence à paniquer 😰",
    "Bon… j’insiste un peu 😶", "C’est un très bon oui pourtant 😌",
    "Tu vas regretter 😭", "J’abandonne presque…", "Non… enfin… si… 😵",
    "Je disparais 😶‍🌫️"
];

// Cœurs
function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = Math.random() * 30 + 20 + "px";
    heart.style.animation = "floatUp 3s linear";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}

// Clic sur Non
noBtn.addEventListener("click", () => {
    sadSound.currentTime = 0;
    sadSound.play();

    // Tremblement Oui
    yesBtn.style.animation = "shake 0.5s";
    setTimeout(() => yesBtn.style.animation = "", 500);

    growCount++;
    size += 6 + growCount * 0.8;
    padding += 6 + growCount * 0.8;
    yesBtn.style.fontSize = size + "px";
    yesBtn.style.padding = padding + "px " + (padding*2.2) + "px";
    yesBtn.style.minWidth = 200 + growCount*40 + "px";

    if(noClickCount < noTexts.length -1){
        noClickCount++;
        noBtn.textContent = noTexts[noClickCount];
        noBtn.style.fontSize = Math.max(8, 20 - noClickCount*1.2)+"px";
        noBtn.style.opacity = Math.max(0, 1 - noClickCount*0.07);
    }
    if(noClickCount >= noTexts.length-1) noBtn.style.display="none";
});

// Clic sur Oui
yesBtn.addEventListener("click", () => {
    if(yesClicked) return;
    yesClicked = true;

    // Jouer le son en entier
    loveSound.currentTime = 0;
    loveSound.play();

    // Explosion de cœurs
    for(let i=0;i<60;i++) createHeart();

    // Remplacer le contenu principal, mais conserver le <audio>
    const container = document.createElement("div");
    container.innerHTML = `
        <div style="text-align:center; margin-top:150px;">
            <h1>Yaaaay 💖</h1>
            <h2>Je t’aime Sofia 🥰</h2>
            <p style="font-size:22px; margin-top:20px;">Merci d’être ma Valentine ❤️</p>
        </div>
    `;
    document.body.appendChild(container);

    // Supprimer l’ancien contenu (boutons, ours, etc.) mais **pas l’audio**
    document.querySelector(".container").remove();
});
