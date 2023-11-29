#Python Class for all user related queries
#Each method will post a different set of data

from connections import mysql

class postUserDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def addNewUser(self, a_email, fname, lname):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute(f"""INSERT INTO Admin (a_email, fname, lname) VALUES ({a_email}, {fname}, {lname})""")
        mysql.connection.commit()
        self.cursor.close()
        return f"Done!!"