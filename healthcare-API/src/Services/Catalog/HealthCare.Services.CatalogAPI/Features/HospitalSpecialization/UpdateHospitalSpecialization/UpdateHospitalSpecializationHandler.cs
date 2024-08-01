namespace HealthCare.Services.CatalogAPI.Features.HospitalSpecialization.UpdateHospitalSpecialization
{
    #region Record Update Hospital's Specialization

    public record UpdateHospitalSpecializationCommand(
        Guid Id,
        string Name,
        string? Description,
        Guid HospitalId) : ICommand<UpdateHospitalSpecializationResult>;

    public record UpdateHospitalSpecializationResult(bool IsSuccess);

    #endregion
    public class UpdateHospitalSpecializationCommandValidator : AbstractValidator<UpdateHospitalSpecializationCommand>
    {
        public UpdateHospitalSpecializationCommandValidator()
        {
            RuleFor(i => i.Name).NotEmpty().WithMessage("Name of hospital's specialization is required!");
        }
    }

    public class UpdateHospitalSpecializationHandler : ICommandHandler<UpdateHospitalSpecializationCommand, UpdateHospitalSpecializationResult>
    {
        private readonly IDocumentSession _session;

        public UpdateHospitalSpecializationHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<UpdateHospitalSpecializationResult> Handle(UpdateHospitalSpecializationCommand command, CancellationToken cancellationToken)
        {
            var specialization = await _session.LoadAsync<HospitalSpecializations>(command.Id, cancellationToken);
            if (specialization is null)
            {
                throw new HospitalSpecializationNotFoundException(command.Id);
            }

            specialization.Name = command.Name;
            specialization.HospitalId = command.HospitalId;
            specialization.Description = command.Description;

            _session.Update(specialization);
            await _session.SaveChangesAsync(cancellationToken);

            return new UpdateHospitalSpecializationResult(true);
        }
    }
}
