namespace HealthCare.Services.CatalogAPI.Features.Doctor.GetDoctors
{
    #region Record Get Doctors
    public record GetDoctorsRequest(int? PageNumber = 1, int? PageSize = 10);
    public record GetDoctorsResponse(IEnumerable<Doctors> Doctors);
    #endregion

    public class GetDoctorsEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/doctors", async ([AsParameters] GetDoctorsRequest request, ISender sender) =>
            {
                var query = request.Adapt<GetDoctorsQuery>();

                var result = await sender.Send(query);

                var response = result.Adapt<GetDoctorsResponse>();

                return Results.Ok(response);
            }).WithName("GetDoctors")
              .Produces<GetDoctorsResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Get Doctors")
              .WithDescription("Get list doctors in system");
        }
    }
}
