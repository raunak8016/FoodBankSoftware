#Python Class for all user related queries
#Each method will retrieve a different set of data

from connections import mysql

class getSupplierDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()
        
    
    def getAlldata(self):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute("SELECT * FROM Supplier")
        sData = self.cursor.fetchall()
        self.cursor.close()
        return sData
    
    