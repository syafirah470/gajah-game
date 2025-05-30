let karakterAnda = ['gajah', 'manusia', 'semut'];
let karakterAI = ['gajah', 'manusia', 'semut'];

const pilihanEmot = {
    gajah: "🐘",
    manusia: "👤",
    semut: "🐜"
};

const finalPlayer = document.getElementById('final-player');
const finalAI = document.getElementById('final-ai');
const hasilDiv = document.getElementById('hasil');
const kontainerKarakterAI = document.getElementById('ai-characters');
const kontainerKarakterPlayer = document.getElementById('player-characters');

// Tracking pilihan pemain
const riwayatPilihanPemain = {
    gajah: 0,
    manusia: 0,
    semut: 0
};

function renderTombolAI() {
    kontainerKarakterAI.innerHTML = '';
    karakterAI.forEach(karakter => {
        const btn = document.createElement('button');
        btn.className = 'character-btn';
        btn.innerText = `${capitalize(karakter)} ${pilihanEmot[karakter]}`;
        btn.onclick = () => {
            eliminasiKarakterAI(karakter);
        };
        kontainerKarakterAI.appendChild(btn);
    });
}

function renderTombolPlayer() {
    kontainerKarakterPlayer.innerHTML = '';
    karakterAnda.forEach(karakter => {
        const btn = document.createElement('button');
        btn.className = 'character-btn player-disabled';
        btn.innerText = `${capitalize(karakter)} ${pilihanEmot[karakter]}`;
        kontainerKarakterPlayer.appendChild(btn);
    });
}


