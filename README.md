# Project Description
Admin Vue is a light Admin template, developed based on modern Vue 3 with Vuetify 3,
.NET core 8, Entity Framework core 8.0.0 & Pinia as state management.You have five popular Relational database connectivity options here.You have flexibility to choose Sql server, Mysql, Sqlite, PostgreSql and Oracle 12c+.
 
Admin Vue template consists of two separate project, one is AdminAPi for API and the other is AdminClient project for UI.
 
Both of the projects are developed separately and you have full flexibility to use them independently.

# Project Requirement
- Visual Studio Code.
- Node.js 20 (Browse here to download https://nodejs.org/en/)
- .NET Core 8 SDK (Browse here to download  https://dotnet.microsoft.com/download)
- Database provider software (SQL Server / MySql / Sqlite / PostgreSql / Oracle).

# Quick Start Guide

Admin Vue template has two separate project i.e. AdminClient and AdminApi.

Open AdminApi project on Visual studio code. Then open appsettings.json file and replace the Connection String by your one.
Now open terminal on VS Code and write below commands
    -> dotnet ef migrations add initial
    -> dotnet ef database update
    -> dotnet run
You should see your API listening at localhost:5001.

Now open AdminClient on VS Code. Open terminal and write
    -> npm install
    -> npm run dev

Your project will be running at localhost:3000.
