namespace HealthCare.Services.CatalogAPI.Features.Hospital.GetHospitalById
{
    #region Record Get Hospital By Id
    public record GetHospitalByIdQuery(Guid Id) : IQuery<GetHospitalByIdResult>;
    public record GetHospitalByIdResult(Hospitals Hospital);
    #endregion

    public class GetHospitalByIdHandler : IQueryHandler<GetHospitalByIdQuery , GetHospitalByIdResult>
    {
        private readonly IDocumentSession _session;

        public GetHospitalByIdHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<GetHospitalByIdResult> Handle(GetHospitalByIdQuery query, CancellationToken cancellationToken)
        {
            var hospital = await _session.LoadAsync<Hospitals>(query.Id, cancellationToken);

            if (hospital is null)
            {
                throw new HospitalNotFoundException (query.Id);
            }

            var services = await _session.Query<HospitalServices>()
                .Where(s => s.HospitalId == query.Id)
                .ToListAsync(cancellationToken);

            var specializations = await _session.Query<HospitalSpecializations>()
                .Where(s => s.HospitalId == query.Id)
                .ToListAsync(cancellationToken);

             hospital.HospitalServices = services.ToList();
             hospital.HospitalSpecializations = specializations.ToList();

            return new GetHospitalByIdResult(hospital);
        }
    }
}
