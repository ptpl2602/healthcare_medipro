namespace HealthCare.Services.CatalogAPI.Features.HospitalSpecialization.CreateHospitalSpecialization
{
    #region Record Create Hospital's Specialization

    public record CreateHospitalSpecializationCommand(
        Guid HospitalId,
        string Name,
        string? Description) : ICommand<CreateHospitalSpecializationResult>;

    public record CreateHospitalSpecializationResult(Guid Id);

    #endregion

    public class CreateHospitalSpecializationCommandValidator : AbstractValidator<CreateHospitalSpecializationCommand>
    {
        public CreateHospitalSpecializationCommandValidator()
        {
            RuleFor(i => i.Name).NotEmpty().WithMessage("Name of hospital's specialization is required!");
        }
    }

    public class CreateHospitalSpecializationHandler : ICommandHandler<CreateHospitalSpecializationCommand, CreateHospitalSpecializationResult>
    {
        private readonly IDocumentSession _session;

        public CreateHospitalSpecializationHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<CreateHospitalSpecializationResult> Handle(CreateHospitalSpecializationCommand command, CancellationToken cancellationToken)
        {
            var specialization = new HospitalSpecializations
            {
                Name = command.Name,
                Description = command.Description,
                HospitalId = command.HospitalId,
            };
            _session.Store(specialization);
            await _session.SaveChangesAsync(cancellationToken);
            return new CreateHospitalSpecializationResult(specialization.Id);
        }
    }
}
