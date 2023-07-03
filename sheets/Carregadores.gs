/**
 * Carrega a base de dados de alunos.
 * 
 * Return {array} lista de objetos aluno
 */
function getStudents()
{
  const data = sheet.getSheetByName(STUDENTS_SHEET_NAME).getDataRange().getValues().slice(1).filter(linha => linha[0])
  return data.map(linha => ({number: linha[0], name: linha[1], nickname: linha[2], email: linha[3]}))
}


/**
 * Carrega o comandante responsável pela avaliação vertical.
 * 
 * Return {object} objeto comandante
 */
function getCommander()
{
  const data = sheet.getSheetByName(COMMANDER_SHEET_NAME).getDataRange().getValues().slice(1)
  return data.map(linha => ({name: linha[1], nickname: linha[2], email: linha[3]}))[0]
}


/**
 * Carrega a base de dados de critérios e escala de avaliação.
 * 
 * Return {array} lista com uma lista de critérios e uma lista de etiquetas para a escala
 */
function getQuestions()
{
  const data = sheet.getSheetByName(CRITERIA_SHEET_NAME).getDataRange().getValues().slice(1)
  const criteria = data.filter(linha => linha[0]).map(linha => linha[0])
  const scale = data.filter(linha => linha[1]).map(linha => linha[1])
  return [criteria, scale]
}


/**
 * Carrega a base de dados de respostas do formulário, as avaliações.
 * 
 * Return {object} objeto relacionando o e-mail de um aluno com as avaliações dadas por ele para cada outro.
 */
function getAnswers()
{
  const criteria = getQuestions()[0]
  const numbers = sheet.getSheetByName(STUDENTS_SHEET_NAME).getDataRange().getValues().slice(1).map(linha => linha[0]).filter(number => number)
  var responses = sheet.getSheetByName(RESPONSES_SHEET_NAME).getDataRange().getValues().slice(1)
  const givenGrades = {}

  // Notas dadas por cada aluno
  responses.forEach(row => {
    email = row[0]
    grades = row.slice(1)
    givenGrades[email] = {}

    for (var i = 0; i < numbers.length; i++)
      givenGrades[email][numbers[i]] = grades.slice(i*criteria.length, (i+1)*criteria.length)
  })

  return givenGrades
}
