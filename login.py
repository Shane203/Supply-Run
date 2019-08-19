#!/usr/local/bin/python3
from cgitb import enable 
enable()

from cgi import FieldStorage, escape
from hashlib import sha256
from time import time
from shelve import open
from http.cookies import SimpleCookie
import pymysql as db

form_data = FieldStorage()
username = ''
result = ''
header="""<header>
                   <ul>
                       <li style="float:left";><a href="index.py">Home</a></li>
                       <li><a href="contact.html">Contact Us</a></li>
                       <li><a href="show_cart.py">Cart <img class='cart' src='carticon.png'></a></li>
                       <li><a href="register.py">Register</a></li>
                  </ul>
        </header>"""
location=""
if len(form_data) != 0:
    username = escape(form_data.getfirst('username', '').strip())
    password = escape(form_data.getfirst('password', '').strip())
    if not username or not password:
        result = "<p class='reply'>Error: user name and password are required</p>"
    else:
        sha256_password = sha256(password.encode()).hexdigest()
        try:
            connection = db.connect('cs1dev.ucc.ie', 'slh3', 'roopaina', 'users_slh3')
            cursor = connection.cursor(db.cursors.DictCursor)
            cursor.execute("""SELECT * FROM users 
                              WHERE username = %s
                              AND password = %s""", (username, sha256_password))
            if cursor.rowcount == 0:
                result = "<p class='reply'>Error: incorrect user name or password</p>"
            else:
                cookie = SimpleCookie()
                sid = sha256(repr(time()).encode()).hexdigest()
                cookie['sid'] = sid
                session_store = open('cookies/sess_' + sid, writeback=True)
                session_store['authenticated'] = True
                session_store['username'] = username
                session_store.close()
                print(cookie)
            cursor.close()  
            connection.close()
            print("Location:http://cs1dev.ucc.ie/~slh3/cgi-bin/lab7/index.py")
        except (db.Error, IOError):
            result = '<p>Sorry! We are experiencing problems at the moment. Please call back later.</p>'
        
print('Content-Type: text/html')
print()
print("""
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Supply Run: Log In</title>
            <link rel="stylesheet" type="text/css" href="index.css">
        </head>
            %s
            <div id="aDiv">
	      <form action="login.py" method="post">
                <label for="username">User name: </label>
                <input type="text" name="username" id="username" value="%s"><br>
                <label for="password1">Password: </label>
                <input type="password" name="password" id="password1"><br>
		<br>
                <input type="submit" value="Login"><br>
                <p>Don't have an account? <a href="register.py">Register</a></p>
	      </form>
	    </div>
            %s
        </body>
    </html>""" % (header,username, result))
