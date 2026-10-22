# ---------- STAGE 1: Build ----------
FROM maven:3.9.12-eclipse-temurin-25 AS build

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests


# ---------- STAGE 2: Runtime ----------
FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java","-jar","app.jar"]
