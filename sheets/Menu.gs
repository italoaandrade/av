// UI
function onOpen()
{
  SpreadsheetApp.getUi()
    .createMenu('Funções do CA')
    .addItem('Atualizar formulário do Google Forms', 'populateForm')
    .addItem('Criar relatórios individuais em PDF', 'createReports')
    .addItem('Enviar os relatórios por e-mail', 'sendEmails')
    .addToUi()
}
