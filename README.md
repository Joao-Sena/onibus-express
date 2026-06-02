# OnibusExpress - Teste Apenas Front-End em Angular

Projeto gerado em Angular 20.3.25.
Node: 22.12.0

## Rodar o projeto

Para rodar basta baixa-lo do Github
- Rodar o comando "npm install" (já com o node instalado)
- Rodar "ng serve" ou "npm run start" e abrir a url `http://localhost:4200/` no browser.
- Rodar testes rode "npm run test". Esse caminho irá abrir o coverage para consultar file:///C:/Users/seuUsuario/documents/angular/onibus-express/coverage/lcov-report/index.html

## Capturas de tela da aplicação + Testes unitários em JEST

Tela 1 - Cenários: Inicial / Carregamento / Lista de passagens / Destino sem viagens listadas
<span>
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-1-sem-dados.png" width="80%">
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-1-loading.png" width="80%">
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-1-passagens.png" width="80%">
    <img src="https://raw.githubusercontent.com/Joao-Sena/onibus-express/main/src/assets/capturas/tela-1-sem-destino.png" width="80%">
</span>

Tela 2 - Assentos
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
