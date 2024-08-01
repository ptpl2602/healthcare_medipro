namespace HealthCare.Services.CatalogAPI.Features.HospitalSpecialization.CreateHospitalSpecialization
{
    #region Record Create Hospital's Specialization
    public record CreateHospitalSpecializationRequest(
        string Name,
        string? Description
    );

    public record CreateHospitalSpecializationsResponse(Guid Id);

    #endregion

    public class CreateHospitalSpecializationsEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/hospitals/{HospitalId}/specializations", async (Guid HospitalId, CreateHospitalSpecializationRequest request, ISender sender) =>
            {
                var command = new CreateHospitalSpecializationCommand(HospitalId, request.Name, request.Description);
                var result = await sender.Send(command);
                var response = new CreateHospitalSpecializationsResponse(result.Id);

                return Results.Created($"/hospitals/{HospitalId}/specializations/{response.Id}", response);
            }).WithName("CreateHospitalSpecializations")
              .Produces<CreateHospitalSpecializationsResponse>(StatusCodes.Status201Created)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Create Hospital's Specialization")
              .WithDescription("Add a new specialization of hospital in system");
        }
    }
}
