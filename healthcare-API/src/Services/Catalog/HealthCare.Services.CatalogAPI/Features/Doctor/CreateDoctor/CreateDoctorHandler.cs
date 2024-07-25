using FluentValidation;

namespace HealthCare.Services.CatalogAPI.Features.Doctor.CreateDoctor
{
    public record CreateDoctorCommand(
        string FirstName,
        string LastName,
        string Address,
        string Phone,
        string Email,
        string Position,
        string? WorkPlace,
        string? Website,
        int Experience,
        string ImageUrl,
        string? Description,
        string? Note,
        List<string> SpecializationId
    ) : ICommand<CreateDoctorResult>;
    public record CreateDoctorResult(Guid Id);

    public class CreateDoctorCommandValidator : AbstractValidator<CreateDoctorCommand>
    {
        public CreateDoctorCommandValidator()
        {
            RuleFor(i => i.FirstName).NotEmpty().WithMessage("First name is required!");
            RuleFor(i => i.LastName).NotEmpty().WithMessage("Last name is required!");
            RuleFor(i => i.Address).NotEmpty().WithMessage("Address is required!");
            RuleFor(i => i.Phone).NotEmpty().WithMessage("Phone number is required!");
            RuleFor(i => i.Email).NotEmpty().WithMessage("Email is required!");
            RuleFor(i => i.Position).NotEmpty().WithMessage("Your position is required!");
            RuleFor(i => i.Experience).NotEmpty().WithMessage("Your experience is required!");
            RuleFor(i => i.ImageUrl).NotEmpty().WithMessage("Your image is required!");
            RuleFor(i => i.SpecializationId).NotEmpty().WithMessage("You need to choose specialty.");
        }
    }

    internal class CreateDoctorCommandHandler(IDocumentSession session) : ICommandHandler<CreateDoctorCommand, CreateDoctorResult>
    {
        public async Task<CreateDoctorResult> Handle(CreateDoctorCommand command, CancellationToken cancellationToken)
        {
            var doctor = new Doctors
            {
                FirstName = command.FirstName,
                LastName = command.LastName,
                Address = command.Address,
                Phone = command.Phone,
                Email = command.Email,
                Website = command.Website,
                Experience = command.Experience,
                ImageUrl = command.ImageUrl,
                Description = command.Description,
                SpecializationId = command.SpecializationId,
                Position = command.Position,
                WorkPlace = command.WorkPlace,
                Note = command.Note,
            };
            session.Store(doctor);
            await session.SaveChangesAsync(cancellationToken);
            return new CreateDoctorResult(doctor.Id);
        }
    }
}
