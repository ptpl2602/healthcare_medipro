namespace HealthCare.Services.CatalogAPI.Features.HospitalService.UpdateHospitalService
{
    #region Record Update Hospital's Services
    public record UpdateHospitalServiceRequest(
        Guid Id,
        string Name,
        string? Description,
        decimal Price,
        Guid HospitalId
    );

    public record UpdateHospitalServiceResponse(bool IsSuccess);
    #endregion

    public class UpdateHospitalServiceEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("/hospitals/services/{Id}", async (Guid Id, UpdateHospitalServiceRequest request, ISender sender) =>
            {
                var command = request.Adapt<UpdateHospitalServiceCommand>();
                command = command with { Id = Id };
                var result = await sender.Send(command);
                var response = result.Adapt<UpdateHospitalServiceResponse>();

                return Results.Ok(response);
            }).WithName("UpdateHospitalService")
              .Produces<UpdateHospitalServiceResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .ProducesProblem(StatusCodes.Status404NotFound)
              .WithSummary("Update Hospital")
              .WithDescription("Update a hospital in system");
        }
    }
}
