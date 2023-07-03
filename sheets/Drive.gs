/**
 * Retorna uma pasta do Google Drive no mesmo diretório do arquivo
 * dessa planilha. Se essa pasta já não existir, ele a cria.
 *
 * @return {object} Google Drive Folder
 */
function getOutputFolder()
{
  // Obtém a pasta onde a planilha está localizada
  const parentFolder = DriveApp.getFileById(sheet.getId()).getParents().next()

  // Itera sobre as subpastas para ver se a pasta pedida já existe
  const subFolders = parentFolder.getFolders()
  while (subFolders.hasNext())
  {
    let folder = subFolders.next()
    // Retorna pasta se ela existir
    if (folder.getName() === OUTPUT_FOLDER_NAME) return folder
  }
  
  // Se ela não existir, a cria
  return parentFolder.createFolder(OUTPUT_FOLDER_NAME)
    .setDescription('Criada pela planilha de controle de conceitos, para guardar os relatórios individuais.')
}
