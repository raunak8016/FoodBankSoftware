#Python Class for all user related queries
#Each method will retrieve a different set of data

from connections import mysql

class getRequestContainsDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def getAllItemsByRequestId(self, id_request):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute(f"""SELECT request_item FROM Request_Contains WHERE id_request = '{id_request}'""")
        rData = self.cursor.fetchall()
        self.cursor.close()
        return rData
    
    