namespace HealthCare.Services.CatalogAPI.Features.HospitalService.DeleteHospitalService
{
    #region Record Delete Hospital's Service
    public record DeleteHospitalServiceResponse(bool IsSuccess);
    #endregion

    public class DeleteHospitalServiceEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("/hospitals/services/{id:guid}", async (Guid id, ISender sender) =>
            {
                var result = await sender.Send(new DeleteHospitalServiceCommand(id));
                var response = result.Adapt<DeleteHospitalServiceResponse>();
                return Results.Ok(response);
            }).WithName("DeleteHospitalService")
              .Produces<DeleteHospitalServiceResponse>(StatusCodes.Status200OK)
              .ProducesProblem(StatusCodes.Status400BadRequest)
              .ProducesProblem(StatusCodes.Status404NotFound)
              .WithSummary("Delete Hospital's Service")
              .WithDescription("Delete a hospital's service by Id in system");
        }
    }
}
