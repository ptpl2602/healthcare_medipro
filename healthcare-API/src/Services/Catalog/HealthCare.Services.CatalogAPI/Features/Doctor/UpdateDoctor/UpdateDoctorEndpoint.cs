
using HealthCare.Services.CatalogAPI.Features.Doctor.CreateDoctor;

namespace HealthCare.Services.CatalogAPI.Features.Doctor.UpdateDoctor
{
    #region Record Update Doctor
    public record UpdateDoctorRequest(
        Guid Id,
        string FirstName,
        string LastName,
        string Address,
        string Phone,
        string Email,
        string Position,
        string? WorkPlace,
        string? Website,
        int Experience,
        string ImageUrl,
        string? Description,
        string? Note,
        List<string> SpecializationId
    );
    public record UpdateDoctorResponse(bool IsSuccess);

    #endregion

    public class UpdateDoctorEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("/doctors", async (UpdateDoctorRequest request, ISender sender) =>
            {
                var command = request.Adapt<UpdateDoctorCommand>();
                var result = await sender.Send(command);
                var response = result.Adapt<UpdateDoctorResponse>();

                return Results.Ok(response);
            }).WithName("UpdateDoctor")
              .Produces<UpdateDoctorResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .ProducesProblem(StatusCodes.Status404NotFound)
              .WithSummary("Update Doctor")
              .WithDescription("Update a doctor in system");
        }
    }
}
