# Acuttis - Backend da Avaliação Técnica

> Os commits foram realizados buscando se basear em [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)

> O projeto foi criado e testado usando o NPM 8.5.0 e Node.js 16.14.2.

## Scripts disponíveis

> Executar no diretório raiz do projeto:

### `npm run test`
Executa os testes em modo de monitoramento, que faz reexecutar sempre que acontece modificações.

### `npm run dev`

> Necessita do [nodemon](https://github.com/remy/nodemon): npm install -g nodemon

Executa o sistema no modo de monitoramento na porta 4000. Reexecuta sempre que acontece modificações.

### `npm start`

Apenas executa o sistema na porta 4000. **Não** reexecuta quando acontece modificações.


## Versão disponível online

Foi realizado deploy na Heroku e está acessível na seguinte URL:\
Frontend: https://acuttis-frontend-avaliacao.herokuapp.com <br>
Backend: https://acuttis-backend-avaliacao.herokuapp.com

> A primeira execução pode ser lenta porque no plano grátis a máquina virtual hiberna.

## Execução do sistema

É possível verificar que a API está em funcionamento apenas usando os testes ou acessando a publicação na Heroku. Mas também pode rodar em máquina local da seguinte forma:
- Executar na raiz `npm start`.
  - O sistema estará disponível em: http://localhost:4000
- Abrir o projeto do frontend e seguir o que está descrito no README.md.

> Usar a mesma versão do Node.js se encontrar problemas, para isso basta utilizar a ferramenta nvm ([Node Version Manager](https://github.com/nvm-sh/nvm)).
