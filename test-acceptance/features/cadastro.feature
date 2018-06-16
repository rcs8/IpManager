Feature: Cadastro de Alunos
As a teacher 
I want to register my students
So that I can have a better control of my class’ activities

Scenario: Cadastro de Alunos bem sucedido (Controlador) #trivial
Given there is no student with email “abc@cin.ufpe.br” registered in the system
When I try to register the student “Abc” with email “abc@cin.ufpe.br”
Then the student “Abc” with email “abc@cin.ufpe.br” is registered in the system
And an email is sent to “abc@cin.ufpe.br” with a password

Scenario: Cadastro de alunos bem sucedido (GUI) 
Given I’m at the registration page
And there is no student with email “abc@cin.ufpe.br”
When I try to register the student “Abc” with email “abc@cin.ufpe.br”
Then a success message appears

Scenario: Cadastro de aluno com email duplicado (Controlador) #trivial
Given there is a student with email “abc@cin.ufpe.br” registered in the system
When I try to register the student “Acd” with email “abc@cin.ufpe.br”
Then the student is not saved by the system twice

Scenario: Cadastro de aluno com email duplicado (GUI)
Given I’m at the registration page
And there is a student with email “abc@cin.ufpe.br”
When I try to register the student “Acd” with email “abc@cin.ufpe.br”
Then a warning message is shown
