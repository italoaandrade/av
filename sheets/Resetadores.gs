/**
 * Recria o formulário com base nos critérios e escala
 * definidos na aba de Critérios da planilha.
 */
function populateForm()
{
  var ui = SpreadsheetApp.getUi()
  var response = ui.alert(
    'Recriar o formulário',
    'Esse procedimento recriará o formulário, inclusive apagando as respostas que já tiverem sido registradas. Tem certeza de que deseja continuar?',
    ui.ButtonSet.YES_NO
  )

  if (response !== ui.Button.YES) return

  // Esvazia o forms
  sheet.toast('Recriando o formulário com base nas novas configurações...', 'Controle de Avaliações', 3)
  const form = FormApp.openByUrl(FORM_URL)
  form.getItems().slice(2).forEach(item => {form.deleteItem(item)})
  form.deleteAllResponses()

  // Cria uma grid para cada aluno
  const students = getStudents()
  const [criteria, scale] = getQuestions()
  students.forEach(student => {
    const grid = form.addGridItem()
    grid.setTitle('Aluno avaliado: '+ student.nickname)
    grid.setRows(criteria)
    grid.setColumns(scale)
    grid.setRequired(true)
  })

  // Reseta a aba de respostas da planilha
  resetResponseSheet(students, criteria)
}


/**
 * Limpa a aba de respostas da planilha e cria as colunas correspondentes
 * a cada critério para cada aluno listado na aba de Alunos.
 * 
 * @param {array} students - Lista de objetos estudantes
 * @param {array} criteria - Lista de critérios de avaliação
 */
function resetResponseSheet(students, criteria)
{
  sheet.toast('Recriando a aba de respostas com base nas novas configurações...', 'Controle de Avaliações', 2)
  var responsesSheet = sheet.getSheetByName(RESPONSES_SHEET_NAME)
  responsesSheet.clearContents()
  var headers = ['E-MAIL AVALIADOR']
  for (var i = 0; i < students.length; i++)
    for (var j = 1; j <= criteria.length; j++)
      headers.push(students[i].number + '.' + j)
  responsesSheet.getRange(1, 1, 1, headers.length).setValues([headers])
}
