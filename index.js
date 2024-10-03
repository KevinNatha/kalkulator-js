const readline = require("readline-sync");

let history = []; // Array untuk menyimpan riwayat kalkulasi

// Loop untuk melanjutkan perhitungan
while (true) {
    const angkapertama = getPreviousResultOrNew(); // Dapatkan hasil sebelumnya atau input baru
    const operator = readline.question("pilih operator (+, -, *, /, %): ");

    let angkakedua = parseFloat(readline.question("masukkan angka kedua: "));
    const requireOperator = ["+", "-", "*", "/", "%"];

    // Validasi input untuk operator yang dipilih
    if (isNaN(angkapertama) || isNaN(angkakedua)) {
        console.log("Inputan anda tidak valid");
    } else if (!requireOperator.includes(operator)) {
        console.log("Pilih operator yang tersedia");
    } else {
        // Cek jika operator adalah pembagian dan angkakedua adalah 0
        while (operator === "/" && angkakedua === 0) {
            console.log("Tidak dapat memasukkan 0 untuk pembagian. Silakan masukkan angka kedua yang valid.");
            angkakedua = parseFloat(readline.question("Masukkan angka kedua yang bukan 0: ")); // Minta input baru
        }

        const hasil = processhasil(angkapertama, angkakedua, operator);
        if (hasil !== undefined) {
            console.log(`Hasil: ${hasil}`);
            history.push(`${angkapertama} ${operator} ${angkakedua} = ${hasil}`); // Simpan ke dalam riwayat
            showHistory(); // Menampilkan riwayat kalkulasi setiap kali ada hasil baru
        }
    }

    const lanjut = readline.question("Apakah ingin melanjutkan perhitungan? (y/n): ");
    if (lanjut.toLowerCase() !== 'y') break;
}

function processhasil(inputanpertama, inputankedua, operator) {
    switch (operator) {
        case "+":
            return inputanpertama + inputankedua;
        case "-":
            return inputanpertama - inputankedua;
        case "*":
            return inputanpertama * inputankedua;
        case "/":
            return inputanpertama / inputankedua; // Sudah dipastikan angkakedua bukan 0
        case "%":
            return inputanpertama % inputankedua;
    }
}

// Fungsi untuk menampilkan riwayat kalkulasi
function showHistory() {
    console.log("\nRiwayat Kalkulasi:");
    if (history.length === 0) {
        console.log("Belum ada riwayat.");
    } else {
        history.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }
    console.log(""); // Menambahkan spasi di akhir riwayat untuk tampilan rapi
}

// Fungsi untuk mendapatkan hasil sebelumnya atau input baru
function getPreviousResultOrNew() {
    if (history.length > 0) {
        const usePrevious = readline.question("Gunakan hasil sebelumnya? (y/n): ");
        if (usePrevious.toLowerCase() === 'y') {
            const lastResult = history[history.length - 1].split('=')[1].trim();
            return parseFloat(lastResult);
        }
    }
    return parseFloat(readline.question("Masukkan angka pertama: "));
}
