namespace HealthCare.Services.CatalogAPI.Features.HospitalService.CreateHospitalService
{
    #region Record Create Hospital's Services
    public record CreateHospitalServiceRequest(
        string Name,
        string? Description,
        decimal Price
    );

    public record CreateHospitalServiceResponse(Guid Id);

    #endregion

    public class CreateHospitalServiceEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/hospitals/{HospitalId}/services", async (Guid HospitalId, CreateHospitalServiceRequest request, ISender sender) =>
            {
                var command = new CreateHospitalServiceCommand(HospitalId, request.Name, request.Description, request.Price);
                var result = await sender.Send(command);
                var response = new CreateHospitalServiceResponse(result.Id);

                return Results.Created($"/hospitals/{HospitalId}/services/{response.Id}", response);
            }).WithName("CreateHospitalServices")
              .Produces<CreateHospitalServiceResponse>(StatusCodes.Status201Created)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Create Hospital's Service")
              .WithDescription("Add a new service of hospital in system");
        }
    }
}
