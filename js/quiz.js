//Quiz fonksiyonu dışarıdan soruları alsın
function Quiz(sorular) {
    this.soruIndex = 0;
    this.sorular = sorular;
    this.dogruCevapSayisi = 0;
}

// soruların sırayla kullanıcının karşısına getirilmesini sağlar.
Quiz.prototype.soruGetir = function () {
    // this.soruIndex, hangi soruda olduğumuzu temsil eder. this.sorular[this.soruIndex] ile sıradaki soruyu döner.
    return this.sorular[this.soruIndex];
}