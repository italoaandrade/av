// Planilha e Formulário
const sheet = SpreadsheetApp.getActiveSpreadsheet()
const FORM_URL = 'LINK DO FORMULÁRIO AQUI'

// Nome do processo
const APP_TITLE = 'Controle de Avaliações de Conceito'

// Nomes das abas
const STUDENTS_SHEET_NAME = 'Alunos'
const COMMANDER_SHEET_NAME = 'Comandante'
const CRITERIA_SHEET_NAME = 'Critérios'
const RESPONSES_SHEET_NAME = 'Respostas'
const TEMPLATE_SHEET_NAME = 'Template'
const REPORTS_SHEET_NAME = 'Relatórios'

// PDFs
const OUTPUT_FOLDER_NAME = 'Avaliação Horizontal/Vertical - Relatórios Individuais'

// E-mail
const EMAIL_SUBJECT = 'Médias de Avaliação Vertical e Horizontal'
const EMAIL_BODY = 'Segue, em anexo, um documento PDF com suas médias na Avaliação Horizontal e na Avaliação Vertical.\n Verifique suas notas e, se achar o caso, procure seu Cmt Ano para sanar eventuais dúvidas. Imprima o documento e após assinar entregue na C Alu em até 24hrs após o preenchimento.'

/**
 * Permite o teste do envio de e-mails. Para isso:
 * Sete EMAIL_OVERRIDE como true
 * Assim, todos os e-mails serão enviados para o e-mail registrado do comandante
 * na aba "Comandante" da planilha
*/
const EMAIL_OVERRIDE = true
const EMAIL_ADDRESS_OVERRIDE = getCommander().email
