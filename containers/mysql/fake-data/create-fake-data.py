import mysql.connector
from faker import Faker
from dotenv import load_dotenv
import os

current_dir = os.path.dirname(os.path.realpath(__file__))

# Navigate three directories up from the current script directory
env_path = os.path.abspath(os.path.join(current_dir, '../../../.env'))

load_dotenv(env_path)

# Database connection configuration using environment variables
db_config = {
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', '12345678'),
    'host': os.getenv('MYSQL_HOST', 'localhost'),
    'database': os.getenv('MYSQL_DATABASE', 'userdb')
}

# Create a database connection
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Create an instance of Faker and set a seed
fake = Faker()
Faker.seed(42)  # Change 42 to any number to set a different seed

#  Create the user table if it doesn't exist
create_table_query = """
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255)
)
"""

cursor.execute(create_table_query)

#  Define the number of records to generate
num_records = 100

# Create an insert query
insert_query = """
INSERT INTO user (name, address, phone, email)
VALUES (%s, %s, %s, %s)
"""

# Generate and insert fake data
for _ in range(num_records):
    name = fake.name()
    address = fake.address()
    phone = fake.phone_number()
    email = fake.email()
    cursor.execute(insert_query, (name, address, phone, email))

conn.commit()

cursor.close()
conn.close()

print(f"The 'user' table created and {num_records} fake records have been inserted!")
