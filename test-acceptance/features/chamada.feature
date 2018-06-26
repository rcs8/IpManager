Feature: Chamada Eletrônica
As a Teacher/Assistant
I want to be able to create classes and record students attendances/absences
So that i can determine if the student attended the required number of classes

Scenario: Register attendance (GUI)
Given I am at the classes page
And I have “Rodrigo Cunha” with login “rcs8” registered as a student
And I have the class “Aula Introdutória” in the list
And the attendance box for “Rodrigo Cunha” is not checked
When I try to submit the class attendance
Then the student “Rodrigo Cunha” will be marked as present in the class “Aula Introdutória”

Scenario: Register absence (GUI)
Given I am at the classes page
And I have “Rodrigo Cunha” with login “rcs8” registered as a student
And I have the class “Aula Introdutória” in the list
And the attendance box for “Rodrigo Cunha” is checked
When I try to submit the class attendance
Then the student “Rodrigo Cunha” will be marked as absent in the class “Aula Introdutória”
