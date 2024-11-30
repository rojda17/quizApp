// user interface (elementlerle etkileşimde bulunduğumuz dosya)

function UI() {
    this.quizBox = document.querySelector("#quiz-box");
    this.buttonBox = document.querySelector("#button-box");
    this.scoreBox = document.querySelector("#score-box");
    this.body = document.querySelector("#quiz-box #body");
    this.correctIcon = '<i class="bi bi-check-circle"></i>';      // doğru cevap iconu
    this.incorrectIcon = '<i class="bi bi-x-circle"></i>';        // yanlış cevap iconu
    this.btnStart = document.querySelector(".btn-start");
    this.btnNext = document.querySelector(".btn-next");
    this.btnReplay = document.querySelector(".btn-replay");
    this.btnQuit = document.querySelector(".btn-quit");
    this.timeText = document.querySelector(".time-text");
    this.timeSecond = document.querySelector(".time-second");
    this.timeLine = document.querySelector(".time-line");

}


UI.prototype.soruGöster = function (soru) {
    this.body.innerHTML = ""; // // Önceki soruları temizliyoruz.

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("question-title");
    title.textContent = soru.soruMetni;

    const optionList = document.createElement("div");
    optionList.classList.add("option-list");

    // Object.entries() yöntemi, bir obje (burada soru.cevapSecenekleri) içindeki her bir anahtar-değer çiftini [anahtar, değer] şeklinde bir diziye çevirir.
    // Örneğin, soru.cevapSecenekleri objesi { a: "Node.js", b: "Typescript", c: "Nuget", d: "Npm" } şeklinde ise, Object.entries() bunu şöyle bir diziye çevirir:
    // [
    //     ["a", "Node.js"],
    //     ["b", "Typescript"],
    //     ["c", "Nuget"],
    //     ["d", "Npm"]
    // ]
    // for (let [key, value] of Object.entries(soru.cevapSecenekleri)) satırı, bu dizideki her bir [anahtar, değer] çiftini key ve value değişkenlerine sırayla atar.
    // Yani, ilk döngüde key = "a", value = "Node.js", ikinci döngüde key = "b", value = "Typescript" şeklinde ilerler.
    for (let [key, value] of Object.entries(soru.cevapSecenekleri)) {
        const option = document.createElement("div");
        option.classList.add("option");
        option.addEventListener("click", optionSelected);

        // span.textContent = key + ") " + value; satırı her bir seçenek için bir metin oluşturur. Bu, ekranda "a) Node.js", "b) Typescript" vb. şeklinde görünecek.
        const span = document.createElement("span");
        span.textContent = key + ") " + value

        option.appendChild(span);
        optionList.appendChild(option);
    }

    cardBody.appendChild(title);
    cardBody.appendChild(optionList);

    this.body.appendChild(cardBody);


}

UI.prototype.disableAllOption = function () {
    const options = document.querySelectorAll(".option"); // sayfada option classına sahip olan bütün elementleri seç.
    for (let option of options) {
        option.classList.add("disabled");
    }

}

UI.prototype.soruSayisiniGoster = function (soruSirasi, toplamSoru) {
    const etiket = `<span class="badge text-bg-danger"> ${soruSirasi} / ${toplamSoru}</span>`;
    document.querySelector(".question-index").innerHTML = etiket;
}

UI.prototype.skoruGoster = function (dogruCevap, toplamSoru) {
    const etiket = `Toplam ${toplamSoru} soruda ${dogruCevap} doğru cevap verdiniz.`
    //etiket bilgisini ekleyeceğimiz konumu yazıyoruz.
    document.querySelector(".score-text").innerHTML = etiket;;
}

// Kodlarla bu elementleri oluşturduk
{/* <h5 class="question-title">1-Hangisi Javascript paket yönetim uygulamasıdır?</h5>
<div class="option-list">
    <div class="option">
        <span>a: Node.js</span>
    </div>
    <div class="option">
        <span>b: Node.js</span>
    </div>
    <div class="option">
        <span>c: Node.js</span>
    </div>
    <div class="option">
        <span>d: Node.js</span>
    </div>

</div> */}