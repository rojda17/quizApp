function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

// bu metodu sadece ilgili nesne üzerinde kullanacağımız için constructor ın içine yazmaya gerek yok.yani hangi sorunun cevabına bakıyorsak o nesne çalışacak aslında
Soru.prototype.cevabiKontrolEt = function (cevap) {
    return cevap === this.dogruCevap;
};





// İkinci sorunun cevap seçeneklerini for döngüsü ile yazdırma
// for (let secenek in soruListesi[3].cevapSecenekleri) {
//     console.log(secenek + ": " + soruListesi[3].cevapSecenekleri[secenek]);
// }

// console.log(soruListesi[1].cevabiKontrolEt("d"));
