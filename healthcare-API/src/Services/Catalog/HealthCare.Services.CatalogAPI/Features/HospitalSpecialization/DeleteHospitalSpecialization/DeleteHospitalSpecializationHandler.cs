namespace HealthCare.Services.CatalogAPI.Features.HospitalSpecialization.DeleteHospitalSpecialization
{
    #region Record Delete Hospital's Specialization
    public record DeleteHospitalSpecializationCommand(Guid Id) : ICommand<DeleteHospitalSpecializationResult>;
    public record DeleteHospitalSpecializationResult(bool IsSuccess);
    #endregion

    public class DeleteHospitalSpecializationHandler : ICommandHandler<DeleteHospitalSpecializationCommand, DeleteHospitalSpecializationResult>
    {
        private readonly IDocumentSession _session;
        public DeleteHospitalSpecializationHandler(IDocumentSession session)
        {
            _session = session;
        }
        public async Task<DeleteHospitalSpecializationResult> Handle(DeleteHospitalSpecializationCommand command, CancellationToken cancellationToken)
        {
            _session.Delete<HospitalServices>(command.Id);

            await _session.SaveChangesAsync(cancellationToken);

            return new DeleteHospitalSpecializationResult(true);
        }
    }
}
