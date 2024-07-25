
namespace HealthCare.Services.CatalogAPI.Features.Specialization.CreateSpecialization
{
    public record CreateSpecializationCommand(string Name, string? Description, string ImageUrl) : ICommand<CreateSpecializationResult>;
    public record CreateSpecializationResult(Guid Id);

    public class CreateSpecializationCommandValidator : AbstractValidator<CreateSpecializationCommand>
    {
        public CreateSpecializationCommandValidator()
        {
            RuleFor(i => i.Name).NotEmpty().WithMessage("Specialization's name is required!");
            RuleFor(i => i.ImageUrl).NotEmpty().WithMessage("Your image is required!");
        }
    }

    public class CreateSpecializationHandler(IDocumentSession session) : ICommandHandler<CreateSpecializationCommand, CreateSpecializationResult>
    {
        public async Task<CreateSpecializationResult> Handle(CreateSpecializationCommand command, CancellationToken cancellationToken)
        {
            var specialization = new Specializations
            {
                Name = command.Name,
                Description = command.Description,
                ImageUrl = command.ImageUrl
            };
            session.Store(specialization);
            await session.SaveChangesAsync(cancellationToken);
            return new CreateSpecializationResult(specialization.Id);
        }
    }
}
