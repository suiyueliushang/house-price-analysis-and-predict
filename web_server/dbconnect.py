import PyMySQL
conn = PyMySQL.connect(
    host = "localhost",
    user="root",
    password="lx15651697362",
    database="students",
    charset="utf8",
)
cursor = conn.cursor()
