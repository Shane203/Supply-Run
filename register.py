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
                       <li><a href="login.py">Login</a></li>
                  </ul>
        </header>"""
if len(form_data) != 0:
    username = escape(form_data.getfirst('username', '').strip())
    password1 = escape(form_data.getfirst('password1', '').strip())
    password2 = escape(form_data.getfirst('password2', '').strip())
    sex = escape(form_data.getfirst('sex', '').strip())
    genre = escape(form_data.getfirst('genre', '').strip())
    if not username or not password1 or not password2:
        result = "<p class='reply'>Error: user name and passwords are required</p>"
    elif password1 != password2:
        result = "<p class='reply'>Error: passwords don\'t match</p>"
    else:
        try:
            connection = db.connect('cs1dev.ucc.ie', 'slh3', 'roopaina', 'users_slh3')
            cursor = connection.cursor(db.cursors.DictCursor)
            cursor.execute("""SELECT * FROM users 
                              WHERE username = %s""", (username))
            if cursor.rowcount > 0:
                result = "<p class='reply'>Error: user name already taken</p>"
            else:
                sha256_password = sha256(password1.encode()).hexdigest()
                cursor.execute("""INSERT INTO users (username, password, sex, genre, Balance) 
                                  VALUES (%s, %s, %s, %s, 1000)""", (username, sha256_password, sex, genre))
                connection.commit()
                cursor.close()  
                connection.close()
                cookie = SimpleCookie()
                sid = sha256(repr(time()).encode()).hexdigest()
                cookie['sid'] = sid
                session_store = open('cookies/sess_' + sid, writeback=True)
                session_store['authenticated'] = True
                session_store['username'] = username
                session_store.close()
                header="""<header>
                   <ul>
                       <li style="float:left";><a href="index.py">Home</a></li>
                       <li><a href="logout.py">Logout</a></li>
                       <li><a href="contact.html">Contact Us</a></li>
                       <li><a href="show_cart.py">Cart <img class='cart' src='carticon.png'></a></li>
                       <li><a href="insert_data.py">Insert Data</a></li> 
                  </ul>
                         </header>"""
                result = """<p class='reply'>Thanks for joining %s.</p>"""%(username)
                print(cookie)
        except (db.Error, IOError):
            result = '<p>Sorry! We are experiencing problems at the moment. Please call back later.</p>'
        
print('Content-Type: text/html')
print()
print("""
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Web Dev 2</title>
            <link rel="stylesheet" type="text/css" href="index.css">
        </head>
        <body>
            %s
            <div id="aDiv">
	      <form action="register.py" method="post">
                <label for="username">User name: </label>
                <input type="text" name="username" id="username" value="%s"><br>
                <label for="password1">Password: </label>
                <input type="password" name="password1" id="password1"><br>
                <label for="passwords2">Re-enter password: </label>
                <input type="password" name="password2" id="password2"><br>
		<label for="sex">Sex: </label><br>
		<select name="sex" id="sex">
			<option>Male</option>
			<option>Female</option>
		</select><br>
		<label for="genre">Favourite Genre: </label><br>
		<select name="genre" id="genre">
			<option>Pop</option>
			<option>Rap/Hip-Hop</option>
			<option>Classic</option>
			<option>Country</option>
			<option>K-Pop</option>
			<option>R&B</option>
			<option>Raggae</option>
			<option>Rock</option>
		</select><br><br>
                <input type="submit" value="Register"><br>
                <p>Already have an account? <a href="login.py">Login</a></p>
	      </form>
           </div>
           <br>
            %s
        </body>
    </html>""" % (header, username, result)) 
