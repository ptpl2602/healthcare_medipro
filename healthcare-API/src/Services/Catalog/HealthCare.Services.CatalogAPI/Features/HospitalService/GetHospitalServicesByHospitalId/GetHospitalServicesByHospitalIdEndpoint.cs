namespace HealthCare.Services.CatalogAPI.Features.HospitalService.GetHospitalServicesByHospitalId
{
    #region Record Get Hospital's Services By Hospital Id
    public record GetHospitalServicesResponse(IEnumerable<HospitalServices> HospitalServices);
    #endregion

    public class GetHospitalServicesByHospitalIdEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/hospitals/services", async (Guid HospitalId, ISender sender) =>
            {
                var result = await sender.Send(new GetHospitalServicesQuery(HospitalId));

                var response = result.Adapt<GetHospitalServicesResponse>();

                return Results.Ok(response);
            }).WithName("GetHospitalServices")
              .Produces<GetHospitalServicesResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Get Hospital Services")
              .WithDescription("Get list hospital services in system");
        }
    }
}
