## Formularios Dinâmicos com Angular 13

Essa é uma aplicação relativamente simples, focada em demonstrar a capacidade de geração de formularios dinamicos com algumas linhas, criando tanto a intância do FormGroup e seus controles, quando a renderização na tela do tipo correto de input de cada questão.

Para alcançar esse objetivo, implementei um banco de dados json, utilizando a lib 'json-server' e uma api node para gerenciar as requisições do frontend da aplicação.

#### Como usar 

Para usar a aplicação será necessário inicializar cada componente da aplicação, para isso siga os seguintes passos:

* **DBServer**
Aqui é tratado como banco de dados, utilizado para armazenar as questões possiveis que um formulario pode conter e suas caracteristicas(atributos), tipo de entrada, obrigatóriedade, grupo da questão(usuario, endereço, contato, etc...) Espero com isso, poder separar as questões em panels, wizard-steps, ou nav-items.
Tambem salvaremos os formularios e as questões de cada um. Para que ele funcione, siga os comandos abaixo:
 ~~~
 cd DBServer
 npm i
 npm start
 ~~~

* **Fake-Backend**
Bem, ele não é tão fake assim. rs' Cumpre perfeitamente sua função de ge


