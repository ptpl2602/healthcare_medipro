using BuildingBlocks.CQRS.Command;
using MediatR;

namespace HealthCare.Services.CatalogAPI.Features.Doctor.CreateDoctor
{
    public record CreateDoctorCommand(
        string FirstName,
        string LastName,
        string Address,
        string Phone,
        string Email,
        string? Website,
        int Experience,
        string ImageUrl,
        string Description,
        string SpecializationId
    ) : ICommand<CreateDoctorResult>;
    public record CreateDoctorResult(Guid Id);

    internal class CreateDoctorCommandHandler : ICommandHandler<CreateDoctorCommand, CreateDoctorResult>
    {
        public Task<CreateDoctorResult> Handle(CreateDoctorCommand command, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
