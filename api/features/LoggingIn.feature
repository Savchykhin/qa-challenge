Feature: Logging in

Scenario: User with valid credentials can login
    When I send request with registered username and correct password
        | email                    | validpassword |
        | gianna@hightable.test    | thedantonio1  |
    Then I should be granted JWT token
    And get 200 status code
    And get `ok: true` in response body

Scenario: User with invalid credentials cannot login
    When I send request with invalid login credentials
        | email                    | invalidpassword |
        | gianna@hightable.test    | 1234567890      |
    Then I should not be granted JWT token
    And get 400 status code
    And get `ok: false` and `Invalid login credentials` message in response body

