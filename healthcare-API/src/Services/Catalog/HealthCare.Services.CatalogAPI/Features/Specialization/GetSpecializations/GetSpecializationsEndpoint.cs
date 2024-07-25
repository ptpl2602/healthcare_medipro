namespace HealthCare.Services.CatalogAPI.Features.Specialization.GetSpecializations
{
    public record GetSpecializationsResponse(IEnumerable<Specializations> Specializations);

    public class GetSpecializationsEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/specializations", async (ISender sender) =>
            {
                var result = await sender.Send(new GetSpecializationsQuery());

                var response = result.Adapt<GetSpecializationsResponse>();

                return Results.Ok(response);
            }).WithName("GetSpecializations")
              .Produces<GetSpecializationsResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Get Specializations")
              .WithDescription("Get list specializations in system");
        }
    }
}
