FROM bellsoft/liberica-openjdk-alpine:21 AS base
WORKDIR /app

FROM base AS builder

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src

RUN --mount=type=cache,target=/root/.m2 ./mvnw install -DskipTests

FROM builder AS extractor

RUN JAR_FILE=$(ls target/*.jar) && cp ${JAR_FILE} target/application.jar
RUN java -Djarmode=layertools -jar target/application.jar extract --destination target/extracted

# Production image
FROM base AS runner

# RUN addgroup -S demo && adduser -S demo -G demo
RUN addgroup --system --gid 1001 java
RUN adduser --system --uid 1001 springboot
USER springboot
VOLUME /tmp
ARG EXTRACTED=/app/target/extracted

COPY --from=extractor ${EXTRACTED}/dependencies/ ./
COPY --from=extractor ${EXTRACTED}/spring-boot-loader/ ./
COPY --from=extractor ${EXTRACTED}/snapshot-dependencies/ ./
COPY --from=extractor ${EXTRACTED}/application/ ./

ENTRYPOINT ["java","-XX:TieredStopAtLevel=1","-Dspring.main.lazy-initialization=true","org.springframework.boot.loader.launch.JarLauncher"]
