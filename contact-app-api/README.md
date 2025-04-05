# Getting Started

### Setting up MySQL Server

1. Build an image of sql : 
    docker build -t contactsql .
2. Spin the container
    docker run --name mysql-contact-db -p 3306:3306 -d contactsql



