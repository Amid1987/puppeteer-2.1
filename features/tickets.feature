Feature: Booking ticket
    Scenario: Should booking one ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user chooses day 3, hall 1 and seance 1
        And user chooses row 2, chair 1 and click booked
        Then user sees the booked ticket

    Scenario: Should booking two tickets
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user chooses day 3, hall 1 and seance 1
        And user chooses row 2, chair 1 and chair 2 and click booked
        Then user sees the booked ticket

    Scenario: Should booking two tickets
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user chooses day 7, hall 1 and seance 1
        And user chooses row 9, chair 1 and click booked
        And user click get code booking
        And user back start page
        And user chooses day 7, hall 1 and seance 1
        Then user chooses row 9, chair 1 and sees chair reserving