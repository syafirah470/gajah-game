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

function eliminasiKarakterAI(karakterDipilih) {
    if (!karakterAI.includes(karakterDipilih) || karakterAnda.length === 0) return;

    // 1. Hapus karakter AI yang dipilih oleh pemain
    karakterAI = karakterAI.filter(k => k !== karakterDipilih);

    // 2. Update riwayat pilihan pemain
    riwayatPilihanPemain[karakterDipilih]++;

    // 3. AI memilih karakter berdasarkan reasoning
    const karakterAIpilih = pilihKarakterAIberdasarReasoning();
    karakterAnda = karakterAnda.filter(k => k !== karakterAIpilih);

    // 4. Tampilkan pertarungan
    tampilkanPertarungan(karakterAIpilih, karakterDipilih);

    // 5. Perbarui tampilan karakter
    updateUI();
}

function pilihKarakterAIberdasarReasoning() {
    // Tentukan karakter pemain yang paling sering dipilih
    let mostFrequent = 'gajah';
    let maxCount = -1;
    for (const k in riwayatPilihanPemain) {
        if (riwayatPilihanPemain[k] > maxCount) {
            mostFrequent = k;
            maxCount = riwayatPilihanPemain[k];
        }
    }

    // AI memilih karakter yang mengalahkan mostFrequent
    let pilihanCounter = {
        gajah: 'semut',
        manusia: 'gajah',
        semut: 'manusia'
    };
    const pilihanAI = pilihanCounter[mostFrequent];

    // Pastikan karakter masih tersedia
    return karakterAnda.includes(pilihanAI) ? pilihanAI : karakterAnda[Math.floor(Math.random() * karakterAnda.length)];
}
