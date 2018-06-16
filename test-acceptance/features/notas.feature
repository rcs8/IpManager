Feature: Preenchimento de notas
As a Teacher/Assistant
I want to be able to register student’s evaluations and calculate their average grade
So That I can verify if the student has reached the minimum grade to pass

Scenario: Calculate Average with all grades (GUI)
Given I am at the grades page 
And I can see  the student “Rodrigo Cunha” in the list
And I have the lists “Lista 1”, “Lista 2”, “Lista 3”, “Lista 4”, “Lista 5”, “Lista 6”
And I have the tests “Prova 1”, “Prova 2”, “Prova 3”
And I have the “Mini-projeto” 
And the grades for these evaluations are “10”, “8”, “9”, “10” “5”, “9” for the lists, “6”,”8”,”10” for the tests, “9” for the project
When I submit the average for the student “Rodrigo Cunha” using a weighted average and weights “2”,”7” and “1”’ for lists, tests and project respectively
Then the average for “Rodrigo Cunha” is “8,2” with status “Aprovado”
And I can see a confirmation message
