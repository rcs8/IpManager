Feature: Alocação Alunos à Monitores
As a professor
I want to allocate students to specifics assistant
So that every student will have an assistant and one assistant can have one or more students 

Scenario: Alocação de alunos a monitor livre
Given estou logado como professor "paulo"
And existe uma lista de monitores com monitor "rafael" com os alunos "tharcio" e "rodrigo" alocados
And uma lista de alunos não alocados com "luiz"
And um limite de "6" alunos por monitor
When eu tento alocar "luiz" ao monitor "rafael"
Then a lista de alunos não alocados fica vazia
And a lista de monitores têm monitor "rafael" com os alunos "tharcio", "rodrigo" e "luiz" alocados

Scenario: Alocação de alunos a monitor cheio
Given estou logado como professor "paulo"
And existe uma lista de monitores com o monitor "rafael" com os alunos "tharcio", "rodrigo", "jose", "maria", "joao", "carlos" alocados
And a lista de alunos não alocados com "luiz"
And um limite de "6" alunos por monitor
When eu tento alocar "luiz" ao monitor "rafael"
Then o sistema retorna uma mensagem de erro de monitor cheio
And a lista de monitores têm "rafael" com "tharcio", "rodrigo", "jose", "maria", "joao", "carlos" alocados 
And a lista de alunos não alocados com "luiz"

Scenario: Troca de alunos entre monitores
Given estou logado como professor "paulo"
And existe uma lista de monitores com o monitor "rafael" com os alunos "tharcio", "rodrigo", "jose", "maria", "joao", "carlos" alocados e "ramon" com "" alocados
And uma lista de alunos não alocados com "luiz"
And um limite de "6" alunos por monitor
When eu peço para alocar “rodrigo” ao monitor “ramon”
Then o sistema retorna a lista de monitores que têm "rafael" com "tharcio", "rodrigo" e "luiz" alocados 
And "ramon" com "rodrigo" alocados

Scenario: Troca de alunos entre monitores (GUI)
Given estou logado como professor "paulo"
And eu vejo uma lista de monitores com o monitor "rafael" com "tharcio", "rodrigo", "jose", "maria", "joao", "carlos" alocados e o monitor "ramon" com "" alocados
And uma mensagem indicando o máximo de "6" alunos por monitor
When eu  tento alocar o aluno “rodrigo” ao monitor “ramon” 
Then eu vejo a lista de monitores mostrando "rafael" com "tharcio", "jose", "maria", "joao"e "carlos" alocados e "ramon" com "rodrigo" alocados
