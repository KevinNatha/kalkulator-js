const readline = require("readline-sync");

let history = []; // Array untuk menyimpan riwayat kalkulasi

// Menampilkan header
function showHeader(title) {
    console.log("\n====================================");
    console.log(`\t${title}`);
    console.log("====================================\n");
}

// Menu utama
function mainMenu() {
    showHeader("MENU UTAMA");
    console.log("1. Kalkulasi");
    console.log("2. Lihat Riwayat");
    console.log("3. Keluar");
    console.log("====================================");

    const choice = readline.question("Pilih opsi (1/2/3): ");
    switch (choice) {
        case "1":
            calculationMenu();
            break;
        case "2":
            showHistory();
            mainMenu(); // Kembali ke menu utama setelah melihat riwayat
            break;
        case "3":
            const confirmExit = readline.question("Apakah yakin ingin keluar? (yes/no): ");
            if (confirmExit.toLowerCase() === "yes") {
                console.log("\nTerima kasih telah menggunakan kalkulator ini!");
                process.exit(); // Keluar dari program
            } else {
                mainMenu(); // Kembali ke menu utama
            }
            break;
        default:
            console.log("\nOpsi tidak valid. Silakan pilih kembali.");
            mainMenu(); // Kembali ke menu utama jika input tidak valid
    }
}

// Sub menu untuk kalkulasi
function calculationMenu() {
    showHeader("SUB MENU KALKULASI");
    console.log("1. Penjumlahan (+)");
    console.log("2. Pengurangan (-)");
    console.log("3. Perkalian (*)");
    console.log("4. Pembagian (/)");
    console.log("5. Modulus (%)");
    console.log("6. Akar (√)");
    console.log("7. Sin");
    console.log("8. Cos");
    console.log("9. Tan");
    console.log("10. Kembali ke Menu Utama");
    console.log("====================================");

    const operatorChoice = readline.question("Pilih jenis kalkulasi (1-10): ");
    if (operatorChoice === "10") {
        mainMenu(); // Kembali ke menu utama
        return;
    }

    let angkapertama = getPreviousResultOrNew(); // Dapatkan hasil sebelumnya atau input baru
    let angkakedua = null;
    let hasil;

    // Cek pilihan untuk operasi
    if (operatorChoice >= "1" && operatorChoice <= "5") {
        angkakedua = parseFloat(readline.question("Masukkan angka kedua: "));
        while (operatorChoice === "4" && angkakedua === 0) {
            console.log("\nTidak dapat memasukkan 0 untuk pembagian.");
            angkakedua = parseFloat(readline.question("Masukkan angka kedua yang valid: "));
        }
    }

    // Hitung berdasarkan pilihan operator
    switch (operatorChoice) {
        case "1":
            hasil = processhasil(angkapertama, angkakedua, "+");
            break;
        case "2":
            hasil = processhasil(angkapertama, angkakedua, "-");
            break;
        case "3":
            hasil = processhasil(angkapertama, angkakedua, "*");
            break;
        case "4":
            hasil = processhasil(angkapertama, angkakedua, "/");
            break;
        case "5":
            hasil = processhasil(angkapertama, angkakedua, "%");
            break;
        case "6":
            hasil = Math.sqrt(angkapertama);
            break;
        case "7":
            hasil = Math.sin(degreesToRadians(angkapertama));
            break;
        case "8":
            hasil = Math.cos(degreesToRadians(angkapertama));
            break;
        case "9":
            hasil = Math.tan(degreesToRadians(angkapertama));
            break;
        default:
            console.log("\nOpsi tidak valid.");
            calculationMenu(); // Kembali ke menu kalkulasi jika input tidak valid
            return;
    }

    if (hasil !== undefined) {
        console.log(`\nHasil: ${hasil}`);
        history.push(`${angkapertama} ${getOperatorSymbol(operatorChoice)} ${angkakedua || ''} = ${hasil}`.trim());
    }

    mainMenu(); // Kembali ke menu utama setelah perhitungan
}

// Fungsi untuk menampilkan riwayat kalkulasi
function showHistory() {
    showHeader("RIWAYAT KALKULASI");
    if (history.length === 0) {
        console.log("Belum ada riwayat.");
    } else {
        history.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }
    console.log("\n====================================");
}

// Fungsi untuk mendapatkan hasil sebelumnya atau input baru
function getPreviousResultOrNew() {
    if (history.length > 0) {
        const usePrevious = readline.question("\nGunakan hasil sebelumnya? (y/n): ");
        if (usePrevious.toLowerCase() === 'y') {
            const lastResult = history[history.length - 1].split('=')[1].trim();
            return parseFloat(lastResult);
        }
    }
    return parseFloat(readline.question("Masukkan angka pertama: "));
}

// Fungsi untuk mengkonversi derajat ke radian
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Fungsi untuk memilih simbol operator berdasarkan pilihan sub menu
function getOperatorSymbol(choice) {
    switch (choice) {
        case "1": return "+";
        case "2": return "-";
        case "3": return "*";
        case "4": return "/";
        case "5": return "%";
        case "6": return "√";
        case "7": return "sin";
        case "8": return "cos";
        case "9": return "tan";
        default: return "";
    }
}

// Fungsi untuk memproses hasil perhitungan dasar
function processhasil(inputanpertama, inputankedua, operator) {
    switch (operator) {
        case "+":
            return inputanpertama + inputankedua;
        case "-":
            return inputanpertama - inputankedua;
        case "*":
            return inputanpertama * inputankedua;
        case "/":
            return inputanpertama / inputankedua;
        case "%":
            return inputanpertama % inputankedua;
    }
}

// Memulai program dengan menampilkan menu utama
mainMenu();
