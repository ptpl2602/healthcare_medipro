namespace HealthCare.Services.CatalogAPI.Features.HospitalService.UpdateHospitalService
{
    #region Record Update Hospital's Services

    public record UpdateHospitalServiceCommand(
        Guid Id,
        string Name,
        string? Description,
        Guid HospitalId,
        decimal Price) : ICommand<UpdateHospitalServiceResult>;

    public record UpdateHospitalServiceResult(bool IsSuccess);

    #endregion

    public class UpdateHospitalServicesCommandValidator : AbstractValidator<UpdateHospitalServiceCommand>
    {
        public UpdateHospitalServicesCommandValidator()
        {
            RuleFor(i => i.Name).NotEmpty().WithMessage("Name of hospital's service is required!");
            RuleFor(i => i.Price).GreaterThan(0).WithMessage("Price must be greater than 0!");
        }
    }


    public class UpdateHospitalServiceHandler : ICommandHandler<UpdateHospitalServiceCommand, UpdateHospitalServiceResult>
    {
        private readonly IDocumentSession _session;

        public UpdateHospitalServiceHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<UpdateHospitalServiceResult> Handle(UpdateHospitalServiceCommand command, CancellationToken cancellationToken)
        {
            var service = await _session.LoadAsync<HospitalServices>(command.Id, cancellationToken);
            if(service is null)
            {
                throw new HospitalServiceNotFoundException(command.Id);
            }

            service.Name = command.Name;
            service.Price = command.Price;
            service.HospitalId = command.HospitalId;
            service.Description = command.Description;

            _session.Update(service);
            await _session.SaveChangesAsync(cancellationToken);

            return new UpdateHospitalServiceResult(true);
        }
    }
}
