const fs = require('fs');
const verses = require('./complete_verses.json');
function transformarParaFormato1(jsonLivro, versao = "nvi") {
  const resultado = [];

  jsonLivro.forEach(livro => {
    const abbrev = livro.abbrev;
    const chapters = livro.chapters;

    chapters.forEach((versiculos, capituloIndex) => {
      versiculos.forEach((texto, versiculoIndex) => {
        resultado.push({
          book: {
            abbrev: {
              pt: abbrev,
              // 'en' pode ser deixado vazio ou mapeado com base em tabela externa, se necessário
              en: ""
            }
          },
          chapter: capituloIndex + 1,
          number: versiculoIndex + 1,
          version: versao,
          text: texto
        });
      });
    });
  });

  return resultado;
}

const resultadoConvertido = transformarParaFormato1(verses);

fs.writeFileSync('./parsed_complete_books.json', JSON.stringify(resultadoConvertido, null, 2), 'utf8')

console.log(resultadoConvertido);