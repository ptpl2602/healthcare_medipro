namespace HealthCare.Services.CatalogAPI.Features.Doctor.DeleteDoctor
{
    #region Record Delete Doctor
    public record DeleteDoctorCommand(Guid Id) : ICommand<DeleteDoctorResult>;
    public record DeleteDoctorResult(bool IsSuccess);
    #endregion
    
    public class DeleteDoctorHandler : ICommandHandler<DeleteDoctorCommand, DeleteDoctorResult>
    {
        private readonly IDocumentSession _session;

        public DeleteDoctorHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<DeleteDoctorResult> Handle(DeleteDoctorCommand command, CancellationToken cancellationToken)
        {
            _session.Delete<Doctors>(command.Id);

            await _session.SaveChangesAsync(cancellationToken);

            return new DeleteDoctorResult(true);
        }
    }
}
