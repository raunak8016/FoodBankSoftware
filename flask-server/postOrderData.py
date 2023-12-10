#Python Class for all admin related queries
#Each method will post a different set of data

from connections import mysql

class postOrderDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def addNewOrder(self, order_no, delivery_date, admin_email, supplier_id):
        try:
            self.cursor = mysql.connection.cursor()
            # Use parameterized queries to avoid SQL injection
            self.cursor.execute(
                "INSERT INTO `Order` (order_no, delivery_date, admin_email, supplier_id) "
                "VALUES (%s, %s, %s, %s)",
                (order_no, delivery_date, admin_email, supplier_id)
            )
            mysql.connection.commit()
            self.cursor.close()
            return "Done!!"
        except Exception as e:
            print('Error in addNewOrder:', str(e))
            return "Failed to add order"
