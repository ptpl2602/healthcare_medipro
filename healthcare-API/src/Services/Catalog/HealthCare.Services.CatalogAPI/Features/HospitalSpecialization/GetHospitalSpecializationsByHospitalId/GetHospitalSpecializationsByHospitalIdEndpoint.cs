namespace HealthCare.Services.CatalogAPI.Features.HospitalSpecialization.GetHospitalSpecializationsByHospitalId
{
    #region Record Get Hospital's Specializations By Hospital Id
    public record GetHospitalSpecializationsResponse(IEnumerable<HospitalSpecializations> HospitalSpecializations);
    #endregion
    public class GetHospitalSpecializationsByHospitalIdEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/hospitals/specializations", async (Guid hospitalId, ISender sender) =>
            {
                var result = await sender.Send(new GetHospitalSpecializationsQuery(hospitalId));

                var response = result.Adapt<GetHospitalSpecializationsResponse>();

                return Results.Ok(response);
            }).WithName("GetHospitalSpecializations")
              .Produces<GetHospitalSpecializationsResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Get Hospital Specializations")
              .WithDescription("Get list hospital specializations in system");
        }
    }
}
