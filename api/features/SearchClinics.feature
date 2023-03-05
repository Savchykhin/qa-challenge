Feature: Search Clinics 

Scenario: Search clinics with authenticated user
    Given user is logged in
        | email                    | password      |
        | gianna@hightable.test    | thedantonio1  |
    When search for clinics with `veterinary` word
    Then search returns names of clinics which contain `veterinary`

Scenario: Search clinics with unauthenticated user
    When search for clinics with `veterinary` word
    Then user should be prevented from getting the search results
    And response body should contain error message
        | message                                     |
        | You need to be authorized for this action.  | 