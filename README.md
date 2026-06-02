# OnibusExpress - Teste Apenas Front-End em Angular

- Projeto gerado em Angular 20.3.25.
- Node: 22.12.0

## Rodar o projeto localmente

Para rodar basta baixa-lo do Github
- Abrir o CMD na pasta do projeto
- Rodar o comando "npm install" (já com o node instalado)
- Rodar "npm run start" ou "ng serve" e abrir a url `http://localhost:4200/` no browser.
- Rodar testes rode "npm run test". Esse caminho irá abrir o coverage para consultar file:///C:/Users/seuUsuario/documents/angular/onibus-express/coverage/lcov-report/index.html

## Capturas de tela da aplicação + Testes unitários em JEST

Tela 1 - Cenários: Inicial / Carregamento / Lista de passagens / Destino sem viagens listadas
<span>
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-1-sem-dados.png" width="80%">
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-1-loading.png" width="80%">
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-1-passagens.png" width="80%">
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-1-sem-destino.png" width="80%">
</span>

Tela 2 - Reserva de assentos com listagem deles
<span>
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-2-assentos.png" width="80%">
</span>

Tela 3 - Formulário Passageiro e Confirmação de Reserva
<span>
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-3-formulario-passageiro.png" width="80%">
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-3-reserva-efetuada.png" width="80%"> 
</span>

Tela 4 - Minha reserva (depois de efetuar a reserva o usuário pode consultar)
<span>
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-4-minha-reserva.png" width="80%">
</span>

- Como meu teste é de Front-End fiz um arquivo de Mock das viagens, para ver viagens disponíveis use o filtro com mais viagens:
    São Paulo / Rio de Janeiro / 04/06/2026
    
- Caso insira uma data sem viagens irá aparecer a mensagem de nenhuma viagem encontrada

## Sugestões

- Eu segui a arquitetura sugerida de separar em pasta de: components, pages, services, etc.
- Mas a que recomendo para aplicações escaláveis é a arquitetura em camadas baseada em Features.
- Nela temos o CORE / FEATURES / SHARED. Já pensando que a aplicação pode ser escalada com mais funcionalidades ou até outras vertentes, seria o ideal, pois nela fica tudo mais organizado ainda e separado em "módulos" que seria cada Feature.
Mas nesse caso que é somente um teste e vejo sendo uma aplicação pequena não se faz necessário.

- Avaliar regra de negócio se caso a página recarregue o usuário volte para a tela de passagens (foi o que eu fiz), mas isso deve ser avaliado se mantenho salvando o estado em uma SERVICE que centraliza todos os dados, ou se salva exemplo em um sessionStorage, para caso a página recarregue ou o usuário feche e abra a guia ele mantenha com sua opção selecionada.
- Mas de toda forma precisa analisar com o Back-End também se não seria melhor sempre voltar pra inicial, e não ficar consultando sempre na API todo o fluxo anterior caso recarregue a página