#Python Class for all request related queries
#Each method will retrieve a different set of data

from connections import mysql

class getRequestDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()
        
    
    def getAlldata(self):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute("SELECT * FROM Request")
        rData = self.cursor.fetchall()
        self.cursor.close()
        return rData
    
    def getASingleRequest(self, request_user):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute(f"""SELECT * FROM Request WHERE request_user = '{request_user}'""")
        rData = self.cursor.fetchall()
        self.cursor.close()
        return rData