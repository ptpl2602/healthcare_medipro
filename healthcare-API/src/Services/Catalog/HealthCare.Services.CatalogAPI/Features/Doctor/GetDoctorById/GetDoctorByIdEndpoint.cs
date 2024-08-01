namespace HealthCare.Services.CatalogAPI.Features.Doctor.GetDoctorById
{
    #region Record Get Doctor By Id
    public record GetDoctorByIdResponse(Doctors Doctor);
    #endregion
    
    public class GetDoctorByIdEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/doctors/{id}", async (Guid id, ISender sender) =>
            {
                var result = await sender.Send(new GetDoctorByIdQuery(id));

                if (result.Doctor == null)
                {
                    return Results.NotFound($"No doctor found with ID: {id}");
                }

                var response = result.Adapt<GetDoctorByIdResponse>();

                return Results.Ok(response);
            }).WithName("GetDoctorById")
              .Produces<GetDoctorByIdResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .WithSummary("Get Doctor By Id")
              .WithDescription("Get doctor by ID in system");
        }
    }
}
