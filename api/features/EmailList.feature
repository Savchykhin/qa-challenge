Feature: Clinic's Email List

Scenario: Get a list of clinic`s email addresses with user with limited permissions 
    Given user with limited permissions is logged in
        | email                    | password      |
        | gianna@hightable.test    | thedantonio1  |
    When user tries to get a list of email addresses of practice id 2
    Then user should be prevented from getting the list
    And response body should contain error message
        | message                                |
        | Error: User does not have permissions  | 

Scenario: Get a list of clinic`s email addresses with unauthenticated user
    When the unauthenticated user tries to get a list of email addresses of practice id 2
    Then user should be prevented from getting the list
    And response body should contain error message
        | message                                     |
        | You need to be authorized for this action.  | 