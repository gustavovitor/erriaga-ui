# Erriagá

Frontend feito em Javascript com Angular 9.

Essa aplicação consome a API do Erriagá disponível [aqui.](https://github.com/gustavovitor/erriaga-api)

# O Frontend

### Configurações

Para subir a aplicação basta clonar/fazer o download do projeto, entrar na pasta que contém o ```packages.json``` e executar o comando
```npm install``` para baixar as dependências.

Após fazer o download das dependências, basta executar o comando ```ng serve``` e abrir o navegador [aqui.](http://localhost:4200)

### Observações Importantes

O frontend trabalha com JWT e armazena o seu ```access_token``` no local storage do seu navegador
logo, caso você esteja trabalhando com algum frontend que também tenha o mesmo comportamento no host ```http://localhost:4200```
será necessário limpar o cache/dados de navegação ou inicializar essa aplicação no modo anônimo.
