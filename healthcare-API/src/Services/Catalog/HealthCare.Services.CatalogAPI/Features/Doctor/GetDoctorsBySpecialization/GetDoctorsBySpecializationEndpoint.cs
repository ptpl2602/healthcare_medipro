namespace HealthCare.Services.CatalogAPI.Features.Doctor.GetDoctorsBySpecialization
{
    #region Record Get Doctors By Specialization
    public record GetDoctorsBySpecializationRequest(int? PageNumber = 1, int? PageSize = 10);

    public record GetDoctorsBySpecializationResponse(IEnumerable<Doctors> Doctors);
    
    #endregion
    
    public class GetDoctorsBySpecializationEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet(
                "/doctors/search", 
                async (string specialty, [AsParameters] GetDoctorsBySpecializationRequest request, ISender sender) =>
            {
                var query = new GetDoctorsBySpecializationQuery(
                   specialty.Replace("-", " ").ToLower(),
                   request.PageNumber,
                   request.PageSize
                );

                var result = await sender.Send(query);

                if (!result.Doctors.Any())
                {
                    return Results.NotFound($"No doctors found for specialization: {specialty}");
                }

                var response = new GetDoctorsBySpecializationResponse(result.Doctors);

                return Results.Ok(response);
            }).WithName("GetDoctorsBySpecialization")
              .Produces<GetDoctorsBySpecializationResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status404NotFound)
              .WithSummary("Get Doctors by Specialization")
              .WithDescription("Get list of doctors by specialization name");
        }
    }
}
