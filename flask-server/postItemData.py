#Python Class for all items related queries
#Each method will post a different set of data

from connections import mysql

class postItemDatas(object):
    def __init__(self):
        self.cursor = mysql.connection.cursor()

    def addNewItem(self, item_name, quantity, storage_type, brand, food_flag, toiletry_flag):
        try:
            self.cursor = mysql.connection.cursor()
            # Use parameterized queries to avoid SQL injection
            self.cursor.execute(
                "INSERT INTO Item (item_name, quantity, storage_type, brand, food_flag, toiletry_flag) "
                "VALUES (%s, %s, %s, %s, %s, %s)",
                (item_name, quantity, storage_type, brand, food_flag, toiletry_flag)
            )
            mysql.connection.commit()
            self.cursor.close()
            return "Done!!"
        except Exception as e:
            print('Error in addNewItem:', str(e))
            return "Failed to add Item"
    
    def updateItemQuantity(self, item_name, quantity):
        try:
            self.cursor = mysql.connection.cursor()
            # Use parameterized queries to avoid SQL injection
            self.cursor.execute(
                "UPDATE Item SET quantity = %s WHERE item_name = %s", (quantity, item_name)
            )
            mysql.connection.commit()
            self.cursor.close()
            return "Done!!"
        except Exception as e:
            print('Error in updateItemQuantity:', str(e))
            return "Failed to update Item quantities"
