FROM bellsoft/liberica-openjdk-alpine:21
WORKDIR /workdir/server

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]
