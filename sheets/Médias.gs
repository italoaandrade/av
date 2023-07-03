/**
 * Lê os dados da aba de respostas e retorna um objeto contendo
 * as médias verticais e horizontais de cada aluno pelo número.
 */
function getAverages()
{
  // Obtém dados
  const givenGrades = getAnswers()
  const students = getStudents()

  // Notas do avaliador
  const commanderEmail = getCommander().email
  const verticalGrades = givenGrades[commanderEmail]
  delete givenGrades[commanderEmail]

  // Checa existência de avaliações
  if (Object.keys(givenGrades).length == 0)
  {
    sheet.toast('Nenhuma avaliação horizontal foi registrada. Por favor, peça aos alunos para preencherem a planilha.', 'Controle de Avaliações', 5)
    return
  }

  // Médias
  const averages = {}

  students.forEach(student => {
    const studentGrades = Object.keys(givenGrades).filter(email => email != student.email) // Ignora avaliação própria
    averages[student.number] = {}

    averages[student.number].horizontal = studentGrades
      .map(email => givenGrades[email][student.number]) // Lista de avaliações para ele
      .reduce((acc, curr) => {
        curr.forEach((grade, index) => { acc[index] = (acc[index] || 0) + Number(grade) })
        return acc
      }, []) // Acumulador das notas em cada critério
      .map(sum => sum / studentGrades.length) // Média em cada critério
      .map(grade => grade.toFixed(2).toString().replace('.', ',')) // Formata
    
    if (averages[student.number].horizontal.length == 0) delete averages[student.number].horizontal
    if (verticalGrades && student.number in verticalGrades)
      averages[student.number].vertical = verticalGrades[student.number].map(grade => grade.replace('.', ','))
  })

  return averages
}


/**
 * Calcula as médias horizontais e verticais de um aluno
 * selecionado no menu dropdown.
 */
function getAverage(selectedNickname)
{
  // Obtém dados
  const criteria = getQuestions()[0]
  var responses = sheet.getSheetByName(RESPONSES_SHEET_NAME).getDataRange().getValues()

  // Obtém o número do aluno selecionado
  const student = getStudents().find(student => student.nickname == selectedNickname)

  // Se não foi reconhecido
  if (!student)
  {
    const rows = criteria.map(criterion => [criterion, 0.0, 0.0])
    return rows
  }

  // Obtém as respostas
  const responsesHeader = responses[0]
  responses = responses.slice(1)

  // Localiza avaliações dele e do comandante
  const studentRowIndex = responses.findIndex(row => row[0] == student.email)
  const commanderRowIndex = responses.findIndex(row => row[0] == getCommander().email)

  // Para cada critério
  const rows = []
  criteria.forEach((criterion, index) => {
    // Extrai as notas da coluna correspondente
    const columnIndex = responsesHeader.indexOf(student.number + '.' + (index+1))
    const columnData = responses.map(row => row[columnIndex])
    const values = columnData.map(value => parseFloat(value))

    // Calcula a média e inclui na próxima linha
    const studentsValues = values.filter((value, index) => index != studentRowIndex && index != commanderRowIndex)
    const commanderValue = values.find((value, index) => index == commanderRowIndex)
    const average = studentsValues.length > 0 ? studentsValues.reduce((total, value) => total + value, 0) / studentsValues.length : 0
    rows.push([criterion, average, commanderValue])
  })

  // Exibe as médias de cada critério
  return rows
}
