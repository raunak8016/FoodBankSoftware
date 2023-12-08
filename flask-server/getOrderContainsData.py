#Python Class for all user related queries
#Each method will retrieve a different set of data

from connections import mysql

class getOrderContainsDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()
    
    def getAllItemsByOrderNo(self, order_no):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute(f"""SELECT item_name FROM Order_Contains WHERE order_no = '{order_no}'""")
        uData = self.cursor.fetchall()
        self.cursor.close()
        return uData