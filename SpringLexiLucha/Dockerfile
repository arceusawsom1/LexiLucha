## Use an official Maven image as a base image
#FROM maven:3.8.4-openjdk-17
#
## Set the working directory in the container
#WORKDIR /usr/src/app
#
## Copy the project files into the container
#COPY . .
#
## Build the Maven project
#RUN mvn clean install
#
## Set the entry point for the application
#CMD ["java", "-jar", "target/your-artifact-id-1.0-SNAPSHOT.jar"]


# Build stage
FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /usr/src/app

COPY . .

RUN mvn clean install

# Runtime stage
FROM openjdk:17-alpine

WORKDIR /app

# This isn't needed right now, but we will override from the compose file (located ..)
# ENV MYSQL_HOST = localhost

COPY --from=build /usr/src/app/target/LexiLucha-0.0.1-SNAPSHOT.jar /app/
#Expose the web port (Just for ping test)
EXPOSE 8080

#Expose SocketIo port
EXPOSE 5000

CMD ["java", "-jar", "LexiLucha-0.0.1-SNAPSHOT.jar"]