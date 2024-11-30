// nesneleri ürettiğimiz kısım
const soruListesi = [
    new Soru("1-Hangisi Javascript paket yönetim uygulamasıdır?", { a: "Node.js", b: "Typescript", c: "Nuget", d: "Npm" }, "d"),
    new Soru("2-Hangisi frontend kapsamında değerlendirilmez?", { a: "css", b: "html", c: "javascipt", d: "sql" }, "d"),
    new Soru("3-Hangisi backend kapsamında değerlendirilir?", { a: "node.js", b: "typescript", c: "angular", d: "react" }, "a"),
    new Soru("4-Hangisi javascript programlama dilini kullanmaz?", { a: "react", b: "angular", c: "vuejs", d: "asp.net" }, "d")
];

// quiz: Quiz yapıcı fonksiyonundan bir nesne oluşturuyor ve soruListesi dizisini bu nesneye veriyoruz. 
// Artık quiz nesnemiz, soruları ve hangi soruda olduğumuzu biliyor.
const quiz = new Quiz(soruListesi);
const ui = new UI();

ui.btnStart.addEventListener("click", function () {
    startTimer(10);
    startTimerLine();
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");
    // start butonuna tıkladığımızda soru ve soruSayısı gösterilmeli
    ui.soruGöster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btnNext.classList.remove("show");
});

ui.btnNext.addEventListener("click", function () {
    if (quiz.sorular.length != quiz.soruIndex) {
        startTimer(10);
        startTimerLine();
        ui.soruGöster(quiz.soruGetir());
        // soruIndex sıfırdan balşıyor +1 dersek soru sırası gösterilir.
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        ui.btnNext.classList.remove("show");
        console.log(quiz);
    } else {
        //quiz bittiği an
        ui.scoreBox.classList.add("active");
        ui.quizBox.classList.remove("active");


        ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
    }

});


function optionSelected(e) {
    //kullanıcı seçim yaptığı an saniye dursun.
    clearInterval(counter);
    clearInterval(counterLine);

    // kullanıcı seçim yaparken text i seçerse span etiketi olduğu için çarpı iconu orada gözüküyor.bu hatayı düzeltmek için yaptık.
    let selectedElement = e.target;

    // nodeName = seçilen elementin div mi span mı olduğunu gösterir.
    if (selectedElement.nodeName == "SPAN") {
        selectedElement = selectedElement.parentElement; // eğer seçilen element span ise parent elementini al yani div(option)
    }

    const cevap = e.target.textContent[0]; // textContentin 0. elemanı bize a,b,c,d seçeneklerini verir.(SEÇMİŞ OLDUĞUMUZ CEVAP)
    const soru = quiz.soruGetir();

    // soru.cevabiKontrolEt(cevap) = sorunun doğru cevabı ile seçmiş olduğumuz cevabı karşılaştırır.
    if (soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi += 1;
        selectedElement.classList.add("correct");
        selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        selectedElement.classList.add("incorrect");
        selectedElement.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    quiz.soruIndex += 1;
    ui.disableAllOption(); //kullanıcı seçim yaptıktan sonra bütün opsiyonları disable et yani başka seçenek seçme imkanı olmasın.
    ui.btnNext.classList.add("show"); // kullanıcı seçim yaptıktan sonra next butonu gözüksün

}

ui.btnQuit.addEventListener("click", function () {
    //sayfa yenilenir.
    window.location.reload();

})

ui.btnReplay.addEventListener("click", function () {
    //oyunu sıfırlar.
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    // start butonu
    ui.btnStart.click();
    ui.scoreBox.classList.remove("active");
})

// Bu fonksiyon bir geri sayım (timer) oluşturur.
// Kullanıcıya kalan süreyi ekranda gösterir ve süre dolduğunda belirli işlemleri gerçekleştirir 
// (örneğin: süreyi durdurmak, cevap seçimini engellemek, bir sonraki soruya geçmek gibi).
let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000); //setInterval 1 sn de 1 timer fonksiyonunu çağıracak.

    function timer() {
        ui.timeSecond.textContent = time;
        time--; // her seferinde time ı azaltır.

        if (time < 0) {
            clearInterval(counter); // eğer süre 0 ise counter ı temizler.
            ui.timeText.textContent = "Süre Bitti";
            ui.disableAllOption();
            quiz.soruIndex += 1;
            ui.btnNext.classList.add("show");
        }
    }
}

let counterLine;
function startTimerLine() {
    let line_width = 0; //line_width değişkeni, zaman çizelgesinin (progress bar) genişliğini takip eder.

    counterLine = setInterval(timer, 20); //Bu değer, animasyonun hızını belirler. Daha küçük bir sayı daha hızlı animasyon yapar.

    function timer() {
        line_width += 1;

        ui.timeLine.style.width = line_width + "px";

        if (line_width > 549) {
            clearInterval(counterLine);
        }
    }
}