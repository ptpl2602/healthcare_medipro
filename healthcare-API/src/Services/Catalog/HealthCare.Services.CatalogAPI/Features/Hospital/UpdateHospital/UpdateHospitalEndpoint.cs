namespace HealthCare.Services.CatalogAPI.Features.Hospital.UpdateHospital
{
    #region Record Update Hospital
    public record UpdateHospitalRequest(
        Guid Id,
        string Name,
        string Address,
        string Phone,
        string Email,
        string Website,
        string ImageAvatar,
        List<string> ImageDescriptions,
        string Description) : ICommand<UpdateHospitalResult>;

    public record UpdateHospitalResponse(bool IsSuccess);
    #endregion

    public class UpdateHospitalEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("/hospitals/{Id}", async (Guid Id, UpdateHospitalRequest request, ISender sender) =>
            {
                var command = request.Adapt<UpdateHospitalCommand>();
                command = command with { Id = Id };
                var result = await sender.Send(command);
                var response = result.Adapt<UpdateHospitalResponse>();

                return Results.Ok(response);
            }).WithName("UpdateHospital")
              .Produces<UpdateHospitalResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .ProducesProblem(StatusCodes.Status404NotFound)
              .WithSummary("Update Hospital")
              .WithDescription("Update a hospital in system");
        }
    }
}
