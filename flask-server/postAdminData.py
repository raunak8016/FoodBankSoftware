#Python Class for all admin related queries
#Each method will post a different set of data

from connections import mysql

class postAdminDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def addNewAdmin(self, a_email, fname, lname, volunteer_flag, coordinator_flag):
        try:
            self.cursor = mysql.connection.cursor()
            # Use parameterized queries to avoid SQL injection
            self.cursor.execute(
                "INSERT INTO Admin (a_email, fname, lname, volunteer_flag, coordinator_flag) "
                "VALUES (%s, %s, %s, %s, %s)",
                (a_email, fname, lname, volunteer_flag, coordinator_flag)
            )
            mysql.connection.commit()
            self.cursor.close()
            return "Done!!"
        except Exception as e:
            print('Error in addNewAdmin:', str(e))
            return "Failed to add admin"

    


   

