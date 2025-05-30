from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

# Mapping angka ke karakter
pilihan = {
    1: "Gajah 🐘",
    2: "Manusia 👤",
    3: "Semut 🐜"
}

# Logika penentuan pemenang
def tentukan_pemenang(pemain, ai):
    if pemain == ai:
        return "seri"
    if (pemain == 1 and ai == 2) or (pemain == 2 and ai == 1):
        return "gajah"
    if (pemain == 2 and ai == 3) or (pemain == 3 and ai == 2):
        return "manusia"
    if (pemain == 3 and ai == 1) or (pemain == 1 and ai == 3):
        return "semut"

# Halaman utama
@app.route('/')
def index():
    return render_template('index.html')

# Endpoint permainan
@app.route('/mainkan', methods=['POST'])
def mainkan():
    data = request.get_json()
    pilihan_pemain = int(data['pilihan'])
    pilihan_ai = random.randint(1, 3)
    hasil = tentukan_pemenang(pilihan_pemain, pilihan_ai)

    response = {
        'pilihan_pemain': pilihan[pilihan_pemain],
        'pilihan_ai': pilihan[pilihan_ai],
        'hasil': hasil
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
