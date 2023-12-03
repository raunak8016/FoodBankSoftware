#Python Class for all order related queries
#Each method will retrieve a different set of data

from connections import mysql

class getOrderDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def getAlldata(self):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute("SELECT * FROM Order")
        aData = self.cursor.fetchall()
        self.cursor.close()
        return aData