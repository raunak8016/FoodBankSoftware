#Python Class for all user related queries
#Each method will retrieve a different set of data

from connections import mysql

class getRequestDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()
        
    
    def getAlldata(self):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute("SELECT * FROM User")
        uData = self.cursor.fetchall()
        self.cursor.close()
        return uData
    
    def getAllUserFnames(self):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute("SELECT fname FROM User")
        uData = self.cursor.fetchall()
        self.cursor.close()
        return uData
    
    # def getAUser_u_email(self, u_email):
    #     self.cursor = mysql.connection.cursor()
    #     self.cursor.execute(f"""SELECT u_email FROM User WHERE u_email = '{u_email}'""")
    #     uData = self.cursor.fetchall()
    #     self.cursor.close()
    #     return uData
    
    def getAUserInfo(self, u_email):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute(f"""SELECT * FROM User WHERE u_email = '{u_email}'""")
        uData = self.cursor.fetchall()
        self.cursor.close()
        return uData







    