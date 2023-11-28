#Python Class for all admin related queries
#Each method will retrieve a different set of data

from connections import mysql

class getAdminDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def getAlldata(self):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute("SELECT * FROM Admin")
        aData = self.cursor.fetchall()
        self.cursor.close()
        return aData




    