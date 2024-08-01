
namespace HealthCare.Services.CatalogAPI.Features.Hospital.CreateHospital
{
    #region Record Create Hospital

    public record CreateHospitalCommand(
        string Name,
        string Address,
        string Phone,
        string Email,
        string Website,
        string ImageAvatar,
        List<string> ImageDescriptions,
        string Description) : ICommand<CreateHospitalResult>;

    public record CreateHospitalResult(Guid Id);

    #endregion

    public class CreateHospitalCommandValidator : AbstractValidator<CreateHospitalCommand>
    {
        public CreateHospitalCommandValidator()
        {
            RuleFor(i => i.Name).NotEmpty().WithMessage("Name of hospital is required!");
            RuleFor(i => i.Address).NotEmpty().WithMessage("Address is required!");
            RuleFor(i => i.Phone).NotEmpty().WithMessage("Hotline is required!");
            RuleFor(i => i.Email).NotEmpty().WithMessage("Email is required!");
            RuleFor(i => i.Website).NotEmpty().WithMessage("Website of hospital is required!");
            RuleFor(i => i.ImageAvatar).NotEmpty().WithMessage("Image is required!");
            RuleFor(i => i.Description).NotEmpty().WithMessage("Description of hospital is required!");
        }
    }

    internal class CreateHospitalHandler : ICommandHandler<CreateHospitalCommand, CreateHospitalResult>
    {
        private readonly IDocumentSession _session;

        public CreateHospitalHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<CreateHospitalResult> Handle(CreateHospitalCommand command, CancellationToken cancellationToken)
        {
            var hospital = new Hospitals
            {
                Name = command.Name,
                Address = command.Address,
                Phone = command.Phone,
                Email = command.Email,
                Website = command.Website,
                ImageAvatar = command.ImageAvatar,
                ImageDescriptions = command.ImageDescriptions,
                Description = command.Description
            };
            _session.Store(hospital);
            await _session.SaveChangesAsync(cancellationToken);
            return new CreateHospitalResult(hospital.Id);
        }
    }
}
