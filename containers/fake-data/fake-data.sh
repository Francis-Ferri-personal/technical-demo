#!/bin/bash

# Wait for MySQL to be ready
./wait-for-it.sh mysql:3306 --timeout=60 --strict -- echo "MySQL is up"

# Run the fake data script for MySQL
python fake-data-mysql.py
if [ $? -ne 0 ]; then
  echo "Error running fake-data-mysql.py"
  exit 1
fi

# Wait for MongoDB to be ready
./wait-for-it.sh mongo:27017 --timeout=60 --strict -- echo "MongoDB is up"

# Run the fake data script for MongoDB
python fake-data-mongodb.py
if [ $? -ne 0 ]; then
  echo "Error running fake-data-mongodb.py"
  exit 1
fi

echo "All fake data inserted successfully!"
