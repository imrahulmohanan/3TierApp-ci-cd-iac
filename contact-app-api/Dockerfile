# Build the Spring Boot app using Maven
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

# Use JDK image to run the app
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy only the built jar from builder stage
COPY --from=builder /app/target/contactApp-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 9090

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
