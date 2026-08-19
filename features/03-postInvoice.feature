@postInvoice
Feature: Post Invoice
  As a logged in user
  I want to post an existing invoice
  So that it gets submitted to FBR for processing

  Background:
    Given user is logged in to the application
    And user navigates to the Upload Invoice page

  @smoke
  Scenario: Post an invoice from the listing page
    When user selects the first available invoice for posting
    And user clicks the Post Invoice button
    Then posting result should be visible