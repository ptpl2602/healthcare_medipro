namespace HealthCare.Services.CatalogAPI.Features.HospitalSpecialization.DeleteHospitalSpecialization
{
    #region Record Delete Hospital's Specialization
    public record DeleteHospitalSpecializationResponse(bool IsSuccess);
    #endregion

    public class DeleteHospitalSpecializationEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("/hospitals/specialization/{id:guid}", async (Guid id, ISender sender) =>
            {
                var result = await sender.Send(new DeleteHospitalSpecializationCommand(id));
                var response = result.Adapt<DeleteHospitalSpecializationResponse>();
                return Results.Ok(response);
            }).WithName("DeleteHospitalSpecialization")
              .Produces<DeleteHospitalSpecializationResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .ProducesProblem(StatusCodes.Status404NotFound)
              .WithSummary("Delete Hospital's Specialization")
              .WithDescription("Delete a hospital's specialization by Id in system");
        }
    }
}
