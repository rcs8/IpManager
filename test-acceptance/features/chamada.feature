Feature: Chamada
As a teacher
I want to be able to create classes and record students attendances
So that i can determine if the student attended the required number of classes

Scenario: Register absence (GUI)
Given I am at the classes page
Given I have “rcs8” registered as a student
Given I have the class with day "09/09" and description “Aula Introdutória” in the list
When I try to submit "rcs8" attendance
Then the student “rcs8" will have "1" absence
