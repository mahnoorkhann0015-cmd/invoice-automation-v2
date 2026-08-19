@login
Feature: User Login
  As a registered user
  I want to log in to the Digital Invoice application
  So that I can manage my invoices

  Background:
    Given user is on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When user enters valid email and password
    And user clicks on the Sign In button
    Then user should be redirected to the dashboard
