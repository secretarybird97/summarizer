FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0
ENV PATH="$PATH:/root/.dotnet/tools"
RUN dotnet tool install -g dotnet-ef
ARG configuration=Release
WORKDIR /src
COPY ["server.csproj", "./"]
RUN dotnet restore "server.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "server.csproj" -c $configuration -o /app/build
RUN dotnet ef migrations script --idempotent --output /migrations/migration.sql
