from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MySQL_HOST'] = 'localhost' #default localhost port:5000
app.config["MYSQL_USER"] = "root"   #username for MySQL database
app.config["MYSQL_PASSWORD"] = "LoweMe124" #David's password
app.config["MYSQL_DB"] = "foodbankdb"    #name of the database

mysql = MySQL(app)      #connect MySql to the app