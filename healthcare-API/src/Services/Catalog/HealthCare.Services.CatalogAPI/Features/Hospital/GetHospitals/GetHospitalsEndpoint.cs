namespace HealthCare.Services.CatalogAPI.Features.Hospital.GetHospitals
{
    #region Record Get Hospitals
    public record GetHospitalsRequest(int? PageNumber = 1, int? PageSize = 10);
    public record GetHospitalsResponse(IEnumerable<Hospitals> Hospitals);
    #endregion

    public class GetHospitalsEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/hospitals", async ([AsParameters] GetHospitalsRequest request, ISender sender) =>
            {
                var query = request.Adapt<GetHospitalsQuery>();

                var result = await sender.Send(query);

                var response = result.Adapt<GetHospitalsResponse>();

                return Results.Ok(response);
            }).WithName("GetHospitals")
              .Produces<GetHospitalsResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Get Hospitals")
              .WithDescription("Get list hospitals in system");
        }
    }
}
