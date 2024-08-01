namespace HealthCare.Services.CatalogAPI.Features.HospitalSpecialization.UpdateHospitalSpecialization
{
    #region Record Update Hospital's Specialization
    public record UpdateHospitalSpecializationRequest(
        Guid Id,
        string Name,
        string? Description,
        Guid HospitalId
    );
    public record UpdateHospitalSpecializationResponse(bool IsSuccess);
    #endregion

    public class UpdateHospitalSpecializationEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("/hospitals/specializations/{Id}", async (Guid Id, UpdateHospitalSpecializationRequest request, ISender sender) =>
            {
                var command = request.Adapt<UpdateHospitalSpecializationCommand>();
                command = command with { Id = Id };
                var result = await sender.Send(command);
                var response = result.Adapt<UpdateHospitalSpecializationResponse>();

                return Results.Ok(response);
            }).WithName("UpdateHospitalSpecialization")
              .Produces<UpdateHospitalSpecializationResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .ProducesProblem(StatusCodes.Status404NotFound)
              .WithSummary("Update Hospital Specialization")
              .WithDescription("Update a hospital specialization in system");
        }
    }
}
