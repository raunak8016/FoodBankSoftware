#Python Class for all donation related queries
#Each method will retrieve a different set of data

from connections import mysql

class getDonationDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def getItemsAndDateByDonorEmail(self, donor_email):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute(f"SELECT item, donation_date FROM Donation WHERE donor_email =  '{donor_email}'")
        aData = self.cursor.fetchall()
        self.cursor.close()
        return aData