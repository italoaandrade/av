/**
 * Envia e-mails anexando os PDFs de relatórios individuais.
 * Marque a caixa da coluna 'Enviado' na aba 'Relatórios' para evitar reenviar.
 * Chamada pelo usuário via item de menu personalizado.
 */
function sendEmails()
{
  var ui = SpreadsheetApp.getUi()
  var response = ui.alert(
    'Enviar os relatórios por e-mail',
    'Tem certeza de que deseja enviar os relatórios por e-mail? Só serão enviados os relatórios que ainda não estiverem marcados como "Enviado" na aba de Relatórios.',
    ui.ButtonSet.YES_NO
  )

  if (response !== ui.Button.YES) return

  const reportsSheet = sheet.getSheetByName(REPORTS_SHEET_NAME)
  const reports = reportsSheet.getRange(2, 1, reportsSheet.getLastRow(), reportsSheet.getLastColumn()).getValues().filter(row => row[0])
  
  sheet.toast('Enviando relatórios individuais PDF para o e-mail dos respectivos alunos...', APP_TITLE, 1)
  
  reports.forEach((row, index) => {
    if (!row[2])
    {
      const student = getStudents().find(student => student.number == row[0])
      sheet.toast(`Enviando e-mail para ${student.nickname}`, APP_TITLE, 1)

      const fileId = row[1].match(/[-\w]{25,}(?!.*[-\w]{25,})/)
      const attachment = DriveApp.getFileById(fileId)

      let recipient = student.email
      if (EMAIL_OVERRIDE) recipient = EMAIL_ADDRESS_OVERRIDE

      Utilities.sleep(1000)

      GmailApp.sendEmail(recipient, `Relatório de Conceito - Al ${student.nickname}`, `Olá, ${student.nickname}.\nSegue anexo um documento PDF com suas médias na Avaliação Horizontal e na Avaliação Vertical.`, {
        attachments: [attachment.getAs(MimeType.PDF)],
        name: APP_TITLE
      })
      reportsSheet.getRange(index + 2, 3).setValue(true)
    }
  })
}
