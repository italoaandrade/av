/**
 * Carrega as médias de cada aluno no template.
 * Chamada pelo usuário via item de menu personalizado.
 */
function createReports()
{
  var ui = SpreadsheetApp.getUi()
  var response = ui.alert(
    'Criar relatórios em PDF',
    'Esse procedimento criará um PDF com o relatório das médias horizontais e verticais de cada aluno em cada critério de avaliação, e salvará todos na pasta do seu Drive onde está essa planilha, além de mostrar os links para cada relatório na aba "Relatórios" dessa planilha. Isso pode levar vários minutos. Deseja continuar?',
    ui.ButtonSet.YES_NO
  )

  if (response !== ui.Button.YES) return

  const averages = getAverages()
  const students = getStudents()
  const criteria = getQuestions()[0]
  const templateSheet = sheet.getSheetByName(TEMPLATE_SHEET_NAME)
  const reportsSheet = sheet.getSheetByName(REPORTS_SHEET_NAME)
  const reports = []
  var rows, horizontalAverages, verticalAverages

  // Lida com pausas para não sobrecarregar servidor da Google
  const maximumBackoff = 64000 // Valor máximo de tempo de espera em milissegundos

  for (let number in averages)
  {
    let retryAttempts = 0
    while (retryAttempts < 5)
    {
      try
      {
        horizontalAverages = averages[number].horizontal || criteria.map(criterium => '')
        verticalAverages = averages[number].vertical || criteria.map(criterium => '')
        rows = horizontalAverages.map((grade, index) => [grade, verticalAverages[index]])
        const nickname = students.find(student => student.number == number).nickname
        
        templateSheet.getRange('C11:D20').setValues(rows)
        templateSheet.getRange('B6').setValue(`Al ${nickname}`)
        templateSheet.getRange('B8').setValue(number)

        // Salva resultado parcial e aguarda um delay de segurança para efetivação
        SpreadsheetApp.flush()
        Utilities.sleep(500)
        const fileName = `Relatório - ${number} - ${nickname}`
        reports.push([number, createPDF(templateSheet, fileName)])
        sheet.toast(`Relatório do aluno ${nickname} foi criado...`, APP_TITLE, 10)
        break
      }
      catch (error)
      {
        const randomMilliseconds = Math.floor(Math.random() * 1000)

        // Calcula o tempo de espera exponencial usando a fórmula ((2^n) + randomMilliseconds)
        const waitTime = Math.min(Math.pow(2, retryAttempts)*1000 + randomMilliseconds, maximumBackoff)

        // Pausa a execução do código pelo tempo de espera
        Utilities.sleep(waitTime)

        // Incrementa o contador de tentativas
        retryAttempts++
      }
    }
    
    if (retryAttempts >= 5)
    {
      sheet.toast('Você tentou fazer muitas solicitações ao Google nos últimos minutos. Espere alguns minutos e tente novamente.')
    }

  }

  reportsSheet.getRange(2, 1, reports.length, 2).setValues(reports)
}


/**
 * Cria um PDF com o relatório individual do aluno e salva no Google Drive.
 * 
 * @param {Google Sheet} templateSheet - Aba da planilha com o template do PDF
 * @param {string} pdfName - Nome do PDF a ser criado
 * Return {string} url do PDF criado
 */
function createPDF(templateSheet, pdfName)
{
  const numRows = templateSheet.getLastRow() + 1
  const numColumns = templateSheet.getLastColumn() + 1
  const url = "https://docs.google.com/spreadsheets/d/" + sheet.getId() + "/export" +
    "?format=pdf&" +
    "size=8&" +
    "portrait=true&" +
    "fitw=true&" +
    "gridlines=false&" +
    "printtitle=false&" +
    "top_margin=0&" +
    "bottom_margin=0&" +
    "left_margin=0&" +
    "right_margin=0&" +
    "sheetnames=false&" +
    "pagenum=UNDEFINED&" +
    "attachment=true&" +
    "gid=" + templateSheet.getSheetId() + '&' +
    "r1=0&c1=0&r2=" + numRows + "&c2=" + numColumns

  const params = { method: "GET", headers: { "authorization": "Bearer " + ScriptApp.getOAuthToken() } }
  const blob = UrlFetchApp.fetch(url, params).getBlob().setName(pdfName + '.pdf')
  return getOutputFolder().createFile(blob).getUrl()
}
