namespace HealthCare.Services.CatalogAPI.Features.Hospital.GetHospitalById
{
    #region Record Get Hospital By Id
    public record GetHospitalByIdResponse(Hospitals Hospital);
    #endregion

    public class GetHospitalByIdEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/hospitals/{id}", async (Guid id, ISender sender) =>
            {
                var result = await sender.Send(new GetHospitalByIdQuery(id));

                if (result.Hospital == null)
                {
                    return Results.NotFound($"No hospital found with ID: {id}");
                }

                var response = result.Adapt<GetHospitalByIdResponse>();

                return Results.Ok(response);
            }).WithName("GetHospitalById")
              .Produces<GetHospitalByIdResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Get Hospital By Id")
              .WithDescription("Get hospital by ID in system");
        }
    }
}
