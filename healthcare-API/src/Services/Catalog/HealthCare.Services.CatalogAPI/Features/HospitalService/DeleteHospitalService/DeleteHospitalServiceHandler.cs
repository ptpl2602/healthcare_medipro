namespace HealthCare.Services.CatalogAPI.Features.HospitalService.DeleteHospitalService
{
    #region Record Delete Hospital's Service
    public record DeleteHospitalServiceCommand(Guid Id) : ICommand<DeleteHospitalServiceResult>;
    public record DeleteHospitalServiceResult(bool IsSuccess);
    #endregion

    public class DeleteHospitalServiceHandler : ICommandHandler<DeleteHospitalServiceCommand, DeleteHospitalServiceResult>
    {
        private readonly IDocumentSession _session;
        public DeleteHospitalServiceHandler(IDocumentSession session)
        {
            _session = session;
        }
        public async Task<DeleteHospitalServiceResult> Handle(DeleteHospitalServiceCommand command, CancellationToken cancellationToken)
        {
            _session.Delete<HospitalServices>(command.Id);

            await _session.SaveChangesAsync(cancellationToken);

            return new DeleteHospitalServiceResult(true);
        }
    }
}
