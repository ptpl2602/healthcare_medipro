namespace HealthCare.Services.CatalogAPI.Features.Doctor.DeleteDoctor
{
    public record DeleteDoctorCommand(Guid Id) : ICommand<DeleteDoctorResult>;
    public record DeleteDoctorResult(bool IsSuccess);
    public class DeleteDoctorHandler(IDocumentSession session) : ICommandHandler<DeleteDoctorCommand, DeleteDoctorResult>
    {
        public async Task<DeleteDoctorResult> Handle(DeleteDoctorCommand command, CancellationToken cancellationToken)
        {
            session.Delete<Doctors>(command.Id);

            await session.SaveChangesAsync(cancellationToken);

            return new DeleteDoctorResult(true);
        }
    }
}
