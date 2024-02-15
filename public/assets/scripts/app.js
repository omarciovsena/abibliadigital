$(document).ready(function () {
  const initData = {
    book: {
      abbrev: {
        pt: "sl",
        en: "ps"
      },
      name: "Salmos",
      author: "David, Moisés, Salomão",
      group: "Poéticos",
      version: "nvi"
    },
    chapter: {
      number: 23,
      verses: 6
    },
    verses: [
      {
        number: 1,
        text: "O Senhor é o meu pastor; de nada terei falta."
      },
      {
        number: 2,
        text:
          "Em verdes pastagens me faz repousar e me conduz a águas tranqüilas;"
      },
      {
        number: 3,
        text:
          "restaura-me o vigor. Guia-me nas veredas da justiça por amor do seu nome."
      },
      {
        number: 4,
        text:
          "Mesmo quando eu andar por um vale de trevas e morte, não temerei perigo algum, pois tu estás comigo; a tua vara e o teu cajado me protegem."
      },
      {
        number: 5,
        text:
          "Preparas um banquete para mim à vista dos meus inimigos. Tu me honras, ungindo a minha cabeça com óleo e fazendo transbordar o meu cálice."
      },
      {
        number: 6,
        text:
          "Sei que a bondade e a fidelidade me acompanharão todos os dias da minha vida, e voltarei à casa do Senhor enquanto eu viver."
      }
    ]
  };
  $("#output").jsonViewer(initData);
  $("#form-1").submit(function (event) {
    event.preventDefault();
    const path = $("#path").val();
    $.ajax({
      url: "/api/" + path + "?isHowToUse=true",
      method: "GET",
      contentType: "application/json",
      success: function (data) {

        $("#output").jsonViewer(data);
      },
      error: function (e) {
        $("#output").jsonViewer(
          e.status === 429 ? { error: e.statusText } : e.responseJSON
        );
        console.error(e);
      }
    });
  });
});
