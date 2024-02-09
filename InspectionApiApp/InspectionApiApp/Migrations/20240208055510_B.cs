using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InspectionApiApp.Migrations
{
    public partial class B : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalAmouunt",
                table: "Inspections");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalAmouunt",
                table: "Inspections",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
