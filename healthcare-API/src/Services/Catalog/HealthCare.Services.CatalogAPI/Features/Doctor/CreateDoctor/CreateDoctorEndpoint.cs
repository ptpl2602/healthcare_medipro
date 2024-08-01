namespace HealthCare.Services.CatalogAPI.Features.Doctor.CreateDoctor
{
    #region Record Create Doctor
    public record CreateDoctorRequest(
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

    public record CreateDoctorResponse(Guid Id);

    #endregion

    public class CreateDoctorEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/doctors", async (CreateDoctorRequest request, ISender sender) =>
            {
                var command = request.Adapt<CreateDoctorCommand>();
                var result = await sender.Send(command);
                var response = result.Adapt<CreateDoctorResponse>();

                return Results.Created($"/doctors/{response.Id}", response);
            }).WithName("CreateDoctor")
              .Produces<CreateDoctorResponse>(StatusCodes.Status201Created)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Create Doctor")
              .WithDescription("Add a new doctor in system");
        }
    }
}
