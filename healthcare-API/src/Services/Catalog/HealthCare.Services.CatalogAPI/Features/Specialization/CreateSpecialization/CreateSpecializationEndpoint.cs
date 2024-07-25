namespace HealthCare.Services.CatalogAPI.Features.Specialization.CreateSpecialization
{
    public record CreateSpecializationRequest(string Name, string? Description, string ImageUrl);
    public record CreateSpecializationResponse(Guid Id);
    public class CreateSpecializationEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/specializations", async(CreateSpecializationRequest request, ISender sender) =>
            {
                var command = request.Adapt<CreateSpecializationCommand>();
                var result = await sender.Send(command);
                var response = result.Adapt<CreateSpecializationResponse>();
                return Results.Created($"/specializations/{response.Id}", response);
            }).WithName("CreateSpecialization")
              .Produces<CreateSpecializationResponse>(StatusCodes.Status201Created)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Create Specialization")
              .WithDescription("Add a new specialization in system");
        }
    }
}
