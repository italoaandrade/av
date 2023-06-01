## Formulário e Planilha Bases

- [Formulário Base](https://docs.google.com/forms/d/1aHbnJZJk83ryBzDn17t8851JMmbifpWbJgF2lwuNyQQ/edit)
- [Planilha Base](https://docs.google.com/spreadsheets/d/1UReIduX3u1oipZ1_SqkeGQPN5eBJSqzjL7hakhyZ1cM/edit)

## Propósito

O poder dessa planilha reside num menu personalizado para o CA que pode ser visto na barra superior de opções dela, chamado 'Funções do CA'. Ele contém 3 opções que automatizam funções que, se fossem feitas manualmente, poderiam demorar absurdos:

#### ```Atualizar formulário do Google Forms```

Essa opção recria o formulário do zero com as informações atualizadas dos alunos, do instrutor e dos critérios. Isto é, não será mais preciso editar manualmente o formulário e incluir, para cada aluno, um bloco de edição para que ele seja avaliado, nem editar manualmente os nomes dos critérios ou da escala de avaliação manualmente em todos esses blocos.

#### ```Criar relatórios individuais em PDF```

Essa opção pega os dados das avaliações registradas pelos alunos e cria um PDF individual de relatório para cada aluno, informando a média da avaliação que ele recebeu tanto dos outros alunos (horizontal) quanto do seu instrutor (vertical). Além disso, essa opção salva todos esses PDFs em uma pasta do Google Drive do usuário que a estiver usando. O relatório é criado com base no template da aba 'Template', e os PDFs criados são listados na aba 'Relatórios'.

#### ```Enviar os relatórios por e-mail```

Uma vez que os relatórios tenham sido criados utilizando a opção acima, essa opção envia automaticamente para cada aluno, por meio do e-mail registrado para ele na aba 'Alunos', o PDF anexado do relatório individual dele.

No entanto, para o correto funcionamento dessas opções, é preciso que alguns critérios sejam atendidos:
- A planilha e o formulário devem saber o link um do outro, e é necessário garantir isso caso você crie cópias do formulário e da planilha.
- O usuário que estiver usando a planilha precisa conceder permissão ao script para acessar seu Drive e criar e atualizar a pasta dos relatórios PDF dos alunos.
- O usuário que estiver usando a planilha precisa conceder permissão ao script para por meio do seu Gmail enviar para cada aluno seu respectivo relatório PDF.

Para realizar essas configurações e permitir que a planilha e o formulário sejam automatizados, siga os passos das seções abaixo.

## (Opcional) - Criação de Cópias

A primeira etapa é opcional: fazer cópias da planilha e do formulário, caso não seja do seu interesse modificar os antigos. Se esse for o caso, precisaremos fazer a comunicação entre a nova planilha e o novo formulário para que eles possam alterar um ao outro; isto é, para que o formulário saiba em qual planilha guardar as respostas e a planilha saiba qual formulário recriar quando você selecionar essa opção. Para isso, a planilha precisa saber o link do formulário, e o formulário precisa saber o link da planilha.

Se, ao invés disso, você não quiser fazer uma cópia da planilha e do formulário, e puder alterar os atuais que estiver usando, pode pular direto para a seção seguinte.

Para fazer as cópias:
1. No formulário, selecione o menu ```(3 pontos) > Fazer uma cópia```.
2. Selecione um nome e uma pasta do seu Drive onde ele será salvo.
3. Feche o formulário anterior e continue apenas no novo.
4. Na planilha, selecione o menu ```Arquivo > Fazer uma cópia```.
5. Selecione um nome e uma pasta do seu Drive onde ela será salva.
6. Feche a planilha anterior e continue apenas na nova.

Para salvar o link da nova planilha no novo formulário:
1. Entre na planilha e copie o link dela na barra do navegador.
2. No formulário, selecione sequencialmente o menu ```(3 pontos) > Editor de Script > Arquivos > Parâmetros.gs```.
3. Cole na constante ```SHEET_URL``` o novo link que você copiou no passo 1, mantendo ele entre as aspas simples.
4. Salve as alterações, clicando no ícone de disquete ou usando o atalho de teclado ```Ctrl + S```.
5. Na barra lateral à esquerda, selecione o ícone do relógio, onde irá aparecer ```Acionadores```.
6. Clique em ```Adicionar acionador```.
7. Em ```Escolha a função que será executada``` escolha ```onFormSubmit```.
8. Em ```Selecione o tipo de evento``` escolha ```Ao enviar o formulário```.
9. Clique em ```Salvar```.
10. Na janela que abrirá, faça login com essa conta do Google.
11. Clique em ```Avançado``` e em seguida ```Go to Avaliação Horizontal```.
12. Conceda permissão clicando em ```Allow```.
13. Salve as alterações e feche essa aba do navegador.

Os passos de 4 a 11 garantem que a função do script seja chamada sempre que uma resposta do formulário for enviada, e a permissão que você concedeu permite que o script do formulário acesse a planilha usando o seu e-mail e edite essa planilha registrando de forma adequada as respostas enviadas pelo formulário.

Para salvar o link do novo formulário na nova planilha:
1. Entre no modo de edição do formulário e copie o link dele na barra do navegador.
2. Na planilha, selecione sequencialmente o menu ```Extensões > Apps Script > Arquivos > Parâmetros.gs```.
3. Cole na constante ```FORM_URL``` o novo link que você copiou no passo 1, mantendo ele entre as aspas simples.
4. Salve as alterações, clicando no ícone de disquete ou usando o atalho de teclado ```Ctrl + S```.
5. Feche essa aba do navegador.

## Atualização das Informações de Alunos e Instrutor

Nessa etapa, atualizaremos as informações dos alunos e do instrutor, de forma a poder em seguida selecionar um botão para recriar o formulário com base nessas informações atualizadas, e poder enviar esse formulário para os alunos preencherem a avaliação horizontal, bem como para o instrutor poder utilizar o mesmo formulário para preencher sua avaliação vertical.

Siga os seguintes passos, todos na planilha:
1. Na aba ```Alunos```, inclua/atualize as informações dos alunos desse ano (exceto pela coluna ```E```, com um checkbox, que é atualizada não por você, mas pela própria planilha posteriormente).
2. Na aba ```Comandante```, insira as informações do avaliador vertical desse ano.
3. Na aba ```Critérios```, se necessário, renomeie os critérios e/ou a escala de avaliação em cada um. É importante que sejam exatamente 10 os critérios listados.

## Atualização do Formulário

Sempre que fizer alterações em pelo menos uma daquelas 3 abas da planilha (Alunos, Comandante ou Critérios), é preciso atualizar o formulário para que ele inclua nele essas alterações, seja incluindo mais um aluno na listagem, ou mudando os nomes dos critérios, ou tomando ciência de qual é o e-mail do usuário responsável pela avaliação vertical. 

Para isso, é necessário apenas o clique de um botão:
1. Na planilha, selecione o menu personalizado ```Funções do CA```.
2. Selecione a opção ```Atualizar formulário do Google Forms```.

Nesse momento, você verá uma mensagem na tela dizendo que o script começou a rodar, e depois a mensagem dirá que ele está em execução. Quando ele terminar, você verá uma mensagem na tela dizendo que o script foi concluído, e em seguida a mensagem desaparecerá após alguns segundos.

Nesse momento, acesse o formulário e verifique se ele está de acordo com o esperado.

Na primeira vez que você selecionar a opção ```Atualizar formulário do Google Forms``` no menu, ao invés de executar direto o script ele dirá 'Autorização Necessária', informando que você precisa conceder permissão para que ele acesse o formulário e o edite pela sua conta do Google. Siga os passos:
1. Clique em ```Continuar```.
2. Faça login no Google com a conta.
3. Como o Google por si só não leu o script e não sabe o que o código faz, ele avisa isso. Sem problemas. Clique em ```Avançado```, e em seguida ```Acessar Avaliação Horizontal```.
4. Clique em ```Permitir```.
5. Clique novamente no menu ```Funções do CA``` e selecione ```Atualizar formulário do Google Forms```.

Para checar a segurança dessas permissões, se você quiser, basta ler o código do Script, que está com cada parte devidamente comentada para esclarecer o que cada uma faz caso você não tenha familiaridade com Javascript.

Você verá que ele só usa a API da sua conta para salvar os relatórios PDF no Google Drive, criar uma pasta lá para isso se não já houver criado uma, e salvar lá os PDFs. Além disso, depois enviará para os alunos em seu nome os e-mails com os relatórios de cada um. Sua conta Google não é usada para mais nada.

## Criação de Relatórios PDF

Com o formulário criado, você pode enviar o link dele (não o de edição, claro, mas o de preenchimento) para os alunos preencherem e registrarem as avaliações horizontais. Envie também para o instrutor realizar a avaliação vertical.

Na aba ```Alunos```, é possível verificar pelo checkbox na coluna E os alunos que já preencheram o formulário. Quando todos houverem preenchido e também o avaliador vertical, basta:
1. Selecione o menu personalizado ```Funções do CA```.
2. Selecione a opção ```Criar relatórios individuais em PDF```.

Nesse momento, você verá uma mensagem na tela dizendo que o script começou a rodar, e depois a mensagem dirá que ele está em execução. Mantenha o computador conectado à internet. Quando todos os relatórios tiverem sido gerados, você verá uma mensagem na tela dizendo que o script foi concluído, e em seguida a mensagem desaparecerá após alguns segundos.

Nesse momento, acesse a aba ```Relatórios``` da planilha e verifique os links de cada relatório gerado. Acessando cada link, você pode ver o relatório correspondente, e conferir se tudo foi gerado corretamente.

Naturalmente, haverá um erro de cálculo caso aconteça de não haver todas as avaliações horizontais preenchidas. Garanta que todos os alunos preencheram as avaliações antes de você gerar os PDFs.

## Envio de E-mails

Com os relatórios PDF criados, você pode consultar cada um na aba ```Relatórios```. Após verificar todos, você pode enviar para cada aluno seu respectivo relatório por e-mail da seguinte forma:
1. Selecione o menu personalizado ```Funções do CA```
2. Selecione a opção ```Criar relatórios individuais em PDF```

Nesse momento, você verá uma mensagem na tela dizendo que o script começou a rodar, e depois a mensagem dirá que ele está em execução. No canto inferior direito da tela, verá pequenas mensagens uma após outra, informando o nome de qual aluno está tendo seu PDF enviado por e-mail no momento. Mantenha o computador conectado à internet. Quando todos os e-mails tiverem sido enviados, você verá uma mensagem na tela dizendo que o script foi concluído, e em seguida a mensagem desaparecerá após alguns segundos.

Caso queira testar o envio dos PDFs, é possível configurar um parâmetro do script para que todos os PDFs sejam enviados para o e-mail do instrutor ao invés de o e-mail de cada aluno:
1. Na planilha, selecione o menu ```Extensões > Apps Script > Arquivos > Parâmetros.gs```
2. Mude a constante ```EMAIL_OVERRIDE``` para ```true```.
4. Se não quiser mais testar, e quiser que os e-mails de fato sejam enviados para cada aluno com seu respectivo relatório, mude essa parâmetro para ```false```.
5. Salve as alterações, clicando no ícone de disquete ou usando o atalho de teclado ```Ctrl + S```.

Caso queira alterar o texto do assunto do e-mail ou do corpo do e-mail enviado, siga os passos:
1. Na planilha, selecione o menu ```Extensões > Apps Script > Arquivos > Parâmetros.gs```
2. Mude a constante ```EMAIL_SUBJECT``` colocando entre as aspas simples o texto do assunto do e-mail que você deseja.
3. Mude a constante ```EMAIL_BODY``` colocando entre as aspas simples o texto do corpo do e-mail que você deseja, escrevendo tudo em apenas uma linha e dando enter usando os caracteres ```\n```, por exemplo: ```const EMAIL_BODY = 'Essa é uma linha do e-mail.\nEssa é outra linha'```.
4. Salve as alterações, clicando no ícone de disquete ou usando o atalho de teclado ```Ctrl + S```.
