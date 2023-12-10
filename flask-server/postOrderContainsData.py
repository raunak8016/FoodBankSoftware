#Python Class for all Order_Contains related queries
#Each method will post a different set of data

from connections import mysql

class postOrderContainsDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def addNewOrderItem(self, order_no, item_name):
        try:
            self.cursor = mysql.connection.cursor()
            # Use parameterized queries to avoid SQL injection
            self.cursor.execute(
                "INSERT INTO Order_Contains (order_no, item_name) "
                "VALUES (%s, %s)",
                (order_no, item_name)
            )
            mysql.connection.commit()
            self.cursor.close()
            return "Done!!"
        except Exception as e:
            print('Error in addNewOrderItem:', str(e))
            return "Failed to add new order item"