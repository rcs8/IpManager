Feature: Relatorios de aluno
As a student 
I want to require informations about my evaluations, personal average, 
So that i see my performance

Scenario: Relatorio sem todas as notas preenchidas (GUI)
Given eu sou o aluno "tharcio" 
And tenho as notas "7", "7", "8", "8" nas lista e "8", "" nas provas, e "80%" de presença
When eu entro na pagina do perfil
Then eu vejo o relatorio com as notas "7", "7", "8", "8" nas lista e "8", "" nas provas, e "80%" de presença
media "", e status ""

Scenario GUI: Relatorio com todas as notas preenchidas
Given eu sou o aluno "tharcio" 
And tenho as notas "7", "7", "8", "8" nas lista e "8", "7" nas provas, e "80%" de presença
When eu entro na pagina do perfil
Then eu vejo o relatorio com as notas "7", "7", "8", "8" nas lista e "8", "7" nas provas, e "80%" de presença
media "7.5", e status "aprovado"


