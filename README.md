## Formularios Dinâmicos com Angular 13

Essa é uma aplicação relativamente simples, focada em demonstrar a capacidade de geração de formularios dinamicos com algumas linhas, criando tanto a intância do FormGroup e seus controles, quando a renderização na tela do tipo correto de input de cada questão.

Para alcançar esse objetivo, implementei um banco de dados json, utilizando a lib 'json-server' e uma api node para gerenciar as requisições do frontend da aplicação.

#### Como usar 

Para usar a aplicação será necessário inicializar cada componente da aplicação, para isso siga os seguintes passos:

* **DBServer**
Aqui é tratado como banco de dados, utilizado para armazenar as questões possiveis que um formulario pode conter e suas caracteristicas(atributos), tipo de entrada, obrigatóriedade, grupo da questão(usuario, endereço, contato, etc...) Espero com isso, poder separar as questões em panels, wizard-steps, ou nav-items.
Tambem salvaremos os formularios e as questões de cada um. Para que ele funcione, siga os comandos abaixo:

```
 cd DBServer
 npm i
 npm start
```

* **Fake-Backend**
Bem, ele não é tão fake assim. rs'. Foi implementado um NodeServer utilizando a lib 'express', outras libs complementares como 'require.js', 'body-parser.js', 'nodemon.js' e 'cors.js' e voilá! Ela cumpre perfeitamente(ou quase) sua função de gerenciar as requisições HTTP vindas do frontend e retornar do banco de dados o resultado esperado. Como tem que ser! Nesse caso, nosso banco de dados é o DBServer, resumindo um json-server. Para que o server funcione siga os seguintes passos: 

```
cd  fake-backend
npm i
npm start
```

Ao final você verá a seguinte mensagem: 
```
Listening on port 5000
```

* **FrontEnd**
Por último mas não menos importante, o client side! Feito utilizando o Angular 13, e aproveitando aquele template inicial que o Angular CLI monta pra mostrar o quanto é incrivel, refeito para alcançar os objetivos de:
* *Cadastrar/Editar/Excluir questões possiveis de um form*
* *Cadastrar/Editar/Excluir formularios, associando-os às questões citadas acima*
* *E finalmente contruir um component padrão de contrução de template baseado nos dados de cada formulário previamente cadastrado.*
Execute-o com os seguintes passos:

```
cd dynamic-forms
npm i
ng serve --open
```

