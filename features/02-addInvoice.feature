@addInvoice
Feature: Add Invoice
  As a logged in user
  I want to create a new invoice with buyer and item details
  So that I can raise it for posting to FBR

  Background:
    Given user is logged in to the application
    And user navigates to the Upload Invoice page

  @smoke
  Scenario: Create a new invoice with buyer details and a single line item
    When user opens the Add Invoice form
    And user fills invoice header details
    And user selects invoice date "17"
    And user fills PO date "18" and DO date "19"
    And user fills buyer details
    And user adds an invoice item with HS code "0101.2100"
    And user submits the invoice item
    And user submits the invoice
    Then invoice should be added successfully
