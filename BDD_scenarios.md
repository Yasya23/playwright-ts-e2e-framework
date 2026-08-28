# BDD Feature Specifications

```gherkin

Feature: User sign-in

  Background:
    Given the user is on the "Sign in" page

  Scenario: User signs in successfully with a registered email and password
    Given the user has a registered account with a valid email and password
    When the user enters their email and password
    And the user submits the sign-in form
    Then the user is redirected to the "My account" page

Feature: User registration

  Background:
    Given the user is on the "Registration" page

  Scenario: User registers successfully with valid credentials
    Given the user has no account
    When the user enters their valid credentials
    And the user submits the register form
    Then the user is redirected to the Login page


Feature: Actions with Chosen Product

  Scenario: Logged-in user adds a product to favorites
    Given the user is logged in
    And the user is viewing the product listing
    When the user adds a product to favorites
    Then a confirmation message is displayed

  Scenario: Guest user cannot add products to favorites
    Given the user is not logged in
    When the user is on the product listing page
    And the user tries to add a product to favorites
    Then a sign-in required message is displayed


Feature: Favorite products

  Scenario: Logged-in user removes a product from favorites
    Given the user is logged in
    And the product exists in the favorites list
    When the user removes the product from favorites
    Then the product is removed from the favorites list

  Scenario: User views an empty favorites list
    Given the user is logged in
    And the favorites list is empty
    When the user opens the favorites page
    Then an empty favorites message is displayed
```
