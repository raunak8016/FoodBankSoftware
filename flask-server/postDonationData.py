#Python Class for all donations related queries
#Each method will post a different set of data

from connections import mysql

class postDonationDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def addNewDonation(self, donor_email, item_name, donation_date):
        try:
            self.cursor = mysql.connection.cursor()
            # Use parameterized queries to avoid SQL injection
            self.cursor.execute(
                "INSERT INTO Donation (donor_email, item_name, donation_date) "
                "VALUES (%s, %s, %s)",
                (donor_email, item_name, donation_date)
            )
            mysql.connection.commit()
            self.cursor.close()
            return "Done!!"
        except Exception as e:
            print('Error in addNewDonation:', str(e))
            return "Failed to add Donation"