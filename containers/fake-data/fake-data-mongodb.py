from pymongo import MongoClient
from faker import Faker
import os
from dotenv import load_dotenv

current_dir = os.path.dirname(os.path.realpath(__file__))

# Navigate three directories up from the current script directory
env_path = os.path.abspath(os.path.join(current_dir, '../../.env'))

load_dotenv(env_path)

# MongoDB connection details
mongo_host = os.getenv('MONGO_HOST', 'localhost')
mongo_port = os.getenv('MONGO_PORT', 27017)
mongo_user= os.getenv('MONGO_INITDB_ROOT_USERNAME', 'root')
mongo_password= os.getenv('MONGO_INITDB_ROOT_PASSWORD', '12345678')
mongo_database = os.getenv('MONGO_INITDB_DATABASE', 'petdb')

mongo_uri = f"mongodb://{mongo_user}:{mongo_password}@{mongo_host}:{mongo_port}"
print(mongo_uri)

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[mongo_database]

# Define a collection (similar to a table in relational databases)
collection = db['pets']  # Replace 'pets' with your collection name

# Create an instance of Faker and set a seed
fake = Faker()
Faker.seed(42)

# Define the number of records to generate
num_records = 100

# Insert fake data into MongoDB
for _ in range(num_records):
    pet = {
        'name': fake.first_name(),
        'owner': fake.name(),
        'sex': fake.random_element(elements=('male', 'female')),
        'breed': fake.word(),
        'height': fake.random_number(digits=2),
        'weight': fake.random_number(digits=2)
    }
    collection.insert_one(pet)

print(f"{num_records} fake records inserted into MongoDB")

# Close MongoDB connection
client.close()
