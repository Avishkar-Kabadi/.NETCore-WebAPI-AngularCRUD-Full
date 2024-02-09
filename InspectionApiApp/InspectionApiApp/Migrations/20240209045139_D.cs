using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InspectionApiApp.Migrations
{
    public partial class D : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PendingAmount",
                table: "Inspections",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PendingAmount",
                table: "Inspections");
        }
    }
}
