/**
 * Envia e-mails anexando os PDFs de relatórios individuais.
 * Marque a caixa da coluna 'Enviado' na aba 'Relatórios' para evitar reenviar.
 * Chamada pelo usuário via item de menu personalizado.
 */
function sendEmails()
{
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
