#Python Class for all Request_Contains related queries
#Each method will post a different set of data

from connections import mysql

class postRequestContainsDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def addNewRequestItem(self, id_request, request_item):
        try:
            self.cursor = mysql.connection.cursor()
            # Use parameterized queries to avoid SQL injection
            self.cursor.execute(
                "INSERT INTO Request_Contains (id_request, request_item) "
                "VALUES (%s, %s)",
                (id_request, request_item)
            )
            mysql.connection.commit()
            self.cursor.close()
            return "Done!!"
        except Exception as e:
            print('Error in addNewRequestItem:', str(e))
            return "Failed to add request item"