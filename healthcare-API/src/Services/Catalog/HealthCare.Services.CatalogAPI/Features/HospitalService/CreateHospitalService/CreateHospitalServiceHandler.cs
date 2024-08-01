namespace HealthCare.Services.CatalogAPI.Features.HospitalService.CreateHospitalService
{
    #region Record Create Hospital's Services

    public record CreateHospitalServiceCommand(
        Guid HospitalId,
        string Name,
        string? Description,
        decimal Price) : ICommand<CreateHospitalServiceResult>;

    public record CreateHospitalServiceResult(Guid Id);

    #endregion

    public class CreateHospitalServicesCommandValidator : AbstractValidator<CreateHospitalServiceCommand>
    {
        public CreateHospitalServicesCommandValidator()
        {
            RuleFor(i => i.Name).NotEmpty().WithMessage("Name of hospital's service is required!");
            RuleFor(i => i.Price).GreaterThan(0).WithMessage("Price must be greater than 0!");
        }
    }

    internal class CreateHospitalServiceHandler : ICommandHandler<CreateHospitalServiceCommand, CreateHospitalServiceResult>
    {
        private readonly IDocumentSession _session;

        public CreateHospitalServiceHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<CreateHospitalServiceResult> Handle(CreateHospitalServiceCommand command, CancellationToken cancellationToken)
        {
            var service = new HospitalServices
            {
                HospitalId = command.HospitalId,
                Name = command.Name,
                Description = command.Description,
                Price = command.Price
            };
            _session.Store(service);
            await _session.SaveChangesAsync(cancellationToken);
            return new CreateHospitalServiceResult(service.Id);
        }
    }
}
