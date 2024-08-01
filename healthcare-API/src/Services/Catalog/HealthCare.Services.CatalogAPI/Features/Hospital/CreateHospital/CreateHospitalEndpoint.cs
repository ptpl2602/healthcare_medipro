namespace HealthCare.Services.CatalogAPI.Features.Hospital.CreateHospital
{
    #region Record Create Hospital

    public record CreateHospitalRequest(
        string Name,
        string Address,
        string Phone,
        string Email,
        string Website,
        string ImageAvatar,
        List<string> ImageDescriptions,
        string Description
    );
    
    public record CreateHospitalResponse(Guid Id);

    #endregion

    public class CreateHospitalEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/hospitals", async (CreateHospitalRequest request, ISender sender) =>
            {
                var command = request.Adapt<CreateHospitalCommand>();
                var result = await sender.Send(command);
                var response = result.Adapt<CreateHospitalResponse>();

                return Results.Created($"/hospitals/{response.Id}", response);
            }).WithName("CreateHospital")
              .Produces<CreateHospitalResponse>(StatusCodes.Status201Created)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Create Hospital")
              .WithDescription("Add a new hospital in system");
        }
    }
}
