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
    
    def getAllAdminFnames(self):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute("SELECT fname FROM Admin")
        aData = self.cursor.fetchall()
        self.cursor.close()
        return aData
    
    # def getAnAdmin_a_email(self, a_email):
    #     self.cursor = mysql.connection.cursor()
    #     self.cursor.execute(f"""SELECT a_email FROM Admin WHERE a_email = '{a_email}'""")
    #     aData = self.cursor.fetchall()
    #     self.cursor.close()
    #     return aData
    
    def getAnAdminInfo(self, a_email):
        self.cursor = mysql.connection.cursor()
        self.cursor.execute(f"""SELECT * FROM Admin WHERE a_email = '{a_email}'""")
        aData = self.cursor.fetchall()
        self.cursor.close()
        return aData



    