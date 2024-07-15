
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Services/Catalog/HealthCare.Services.CatalogAPI/HealthCare.Services.CatalogAPI.csproj", "src/Services/Catalog/HealthCare.Services.CatalogAPI/"]
RUN dotnet restore "./src/Services/Catalog/HealthCare.Services.CatalogAPI/./HealthCare.Services.CatalogAPI.csproj"
COPY . .
WORKDIR "/src/src/Services/Catalog/HealthCare.Services.CatalogAPI"
RUN dotnet build "./HealthCare.Services.CatalogAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./HealthCare.Services.CatalogAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HealthCare.Services.CatalogAPI.dll"]