#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
ENV ASPNETCORE_ENVIRONMENT=Development
WORKDIR /src
COPY ["healthcare-API/healthcare-API.csproj", "healthcare-API/"]
RUN dotnet restore "./healthcare-API/./healthcare-API.csproj"
COPY . .
WORKDIR "/src/healthcare-API"
RUN dotnet build "./healthcare-API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./healthcare-API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS api
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "healthcare-API.dll", "--environment=Development"]