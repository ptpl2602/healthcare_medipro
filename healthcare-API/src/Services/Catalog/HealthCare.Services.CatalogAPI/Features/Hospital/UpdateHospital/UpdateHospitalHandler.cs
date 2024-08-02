namespace HealthCare.Services.CatalogAPI.Features.Hospital.UpdateHospital
{
    #region Record Update Hospital

    public record UpdateHospitalCommand(
        Guid Id,
        string Name,
        string Address,
        string Phone,
        string Email,
        string Website,
        string ImageAvatar,
        List<string> ImageDescriptions,
        string Description) : ICommand<UpdateHospitalResult>;

    public record UpdateHospitalResult(bool IsSuccess);
    #endregion

    public class UpdateHospitalCommandValidator : AbstractValidator<UpdateHospitalCommand>
    {
        public UpdateHospitalCommandValidator()
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

    public class UpdateHospitalHandler : ICommandHandler<UpdateHospitalCommand, UpdateHospitalResult>
    {
        private readonly IDocumentSession _session;

        public UpdateHospitalHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<UpdateHospitalResult> Handle(UpdateHospitalCommand command, CancellationToken cancellationToken)
        {
            var hospital = await _session.LoadAsync<Hospitals>(command.Id, cancellationToken);
            if (hospital is null)
            {
                throw new HospitalNotFoundException(command.Id);
            }

            hospital.Name = command.Name;
            hospital.Address = command.Address;
            hospital.Phone = command.Phone;
            hospital.Email = command.Email;
            hospital.Website = command.Website;
            hospital.ImageAvatar = command.ImageAvatar;
            hospital.ImageDescriptions = command.ImageDescriptions;
            hospital.Description = command.Description;

            _session.Update(hospital);
            await _session.SaveChangesAsync(cancellationToken);

            return new UpdateHospitalResult(true);
        }
    }
}
