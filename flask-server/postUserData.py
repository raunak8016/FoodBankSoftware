#Python Class for all user related queries
#Each method will post a different set of data

from connections import mysql

class postUserDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def addNewClient(self, u_email, fname, lname, client_flag, donor_flag, address):
        try:
            self.cursor = mysql.connection.cursor()
            # Use parameterized queries to avoid SQL injection
            self.cursor.execute(
                "INSERT INTO User (u_email, fname, lname, client_flag, donor_flag, address) "
                "VALUES (%s, %s, %s, %s, %s, %s)",
                (u_email, fname, lname, client_flag, donor_flag, address)
            )
            mysql.connection.commit()
            self.cursor.close()
            return "Done!!"
        except Exception as e:
            print('Error in addNewClient:', str(e))
            return "Failed to add client"

    def addNewDonor(self, u_email, fname, lname, client_flag, donor_flag):
        try:
            self.cursor = mysql.connection.cursor()
            # Use parameterized queries to avoid SQL injection
            self.cursor.execute(
                "INSERT INTO User (u_email, fname, lname, client_flag, donor_flag) "
                "VALUES (%s, %s, %s, %s, %s)",
                (u_email, fname, lname, client_flag, donor_flag)
            )
            mysql.connection.commit()
            self.cursor.close()
            return "Done!!"
        except Exception as e:
            print('Error in addNewDonor:', str(e))
            return "Failed to add donor"
        

    def updateUserVerifyAdmin(self, verify_admin, u_email):
        try:
            self.cursor = mysql.connection.cursor()
            # Use parameterized queries to avoid SQL injection
            self.cursor.execute(
                "UPDATE User SET verify_admin = %s WHERE u_email = %s", (verify_admin, u_email)
            )
            mysql.connection.commit()
            self.cursor.close()
            return "Done!!"
        except Exception as e:
            print('Error in updateUserVerifyAdmin:', str(e))
            return "Failed to update verify admin "