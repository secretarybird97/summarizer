FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0
ENV PATH="$PATH:/root/.dotnet/tools"
RUN dotnet tool install -g dotnet-ef
ARG configuration=Release
ARG POSTGRES_CONNECTION_STRING
ENV POSTGRES_CONNECTION_STRING=${POSTGRES_CONNECTION_STRING}
WORKDIR /src
COPY ["server.csproj", "./"]
RUN dotnet restore "server.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet ef migrations script --idempotent --output /migrations/migration.sql
