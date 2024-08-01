
namespace HealthCare.Services.CatalogAPI.Features.Doctor.DeleteDoctor
{
    #region Record Delete Doctor
    public record DeleteDoctorResponse(bool IsSuccess);
    #endregion
    public class DeleteDoctorEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("/doctors/{id:guid}", async (Guid id, ISender sender) =>
            {
                var result = await sender.Send(new DeleteDoctorCommand(id));
                var response = result.Adapt<DeleteDoctorResponse>();
                return Results.Ok(response);
            }).WithName("DeleteDoctor")
              .Produces<DeleteDoctorResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .ProducesProblem(StatusCodes.Status404NotFound)
              .WithSummary("Delete Doctor")
              .WithDescription("Delete a doctor by Id in system");
        }
    }
}
