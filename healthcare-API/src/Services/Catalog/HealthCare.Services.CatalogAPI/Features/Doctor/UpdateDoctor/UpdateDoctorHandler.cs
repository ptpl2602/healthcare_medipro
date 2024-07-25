
using HealthCare.Services.CatalogAPI.Exceptions;

namespace HealthCare.Services.CatalogAPI.Features.Doctor.UpdateDoctor
{
    public record UpdateDoctorCommand(
        Guid Id,
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
    ) : ICommand<UpdateDoctorResult>;
    public record UpdateDoctorResult(bool IsSuccess);

    public class UpdateDoctorCommandValidator : AbstractValidator<UpdateDoctorCommand>
    {
        public UpdateDoctorCommandValidator()
        {
            RuleFor(i => i.FirstName)
                .NotEmpty().WithMessage("First name is required!")
                .Length(2, 150).WithMessage("Name must be between 2 and 150 characters");
            RuleFor(i => i.LastName)
                .NotEmpty().WithMessage("Last name is required!")
                .Length(2, 150).WithMessage("Name must be between 2 and 150 characters");
        }
    }
    public class UpdateDoctorHandler(IDocumentSession session) : ICommandHandler<UpdateDoctorCommand, UpdateDoctorResult>
    {
        public async Task<UpdateDoctorResult> Handle(UpdateDoctorCommand command, CancellationToken cancellationToken)
        {
            var doctor = await session.LoadAsync<Doctors>(command.Id, cancellationToken);
            if(doctor is null)
            {
                throw new DoctorNotFoundException(command.Id);
            }
            doctor.FirstName = command.FirstName;
            doctor.LastName = command.LastName;
            doctor.Address = command.Address;
            doctor.Phone = command.Phone;
            doctor.Email = command.Email;
            doctor.Website = command.Website;
            doctor.Experience = command.Experience;
            doctor.ImageUrl = command.ImageUrl;
            doctor.Description = command.Description;
            doctor.SpecializationId = command.SpecializationId;
            doctor.Position = command.Position;
            doctor.WorkPlace = command.WorkPlace;
            doctor.Note = command.Note;

            session.Update(doctor);
            await session.SaveChangesAsync(cancellationToken);

            return new UpdateDoctorResult(true);
        }
    }
}
