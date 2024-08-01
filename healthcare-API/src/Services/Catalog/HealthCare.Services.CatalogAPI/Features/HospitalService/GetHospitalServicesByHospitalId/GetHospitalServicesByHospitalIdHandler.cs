namespace HealthCare.Services.CatalogAPI.Features.HospitalService.GetHospitalServicesByHospitalId
{
    #region Record Get Hospital's Service By Hospital Id
    public record GetHospitalServicesQuery(Guid HospitalId) : IQuery<GetHospitalServicesResult>;
    public record GetHospitalServicesResult(IEnumerable<HospitalServices> HospitalServices);
    #endregion

    public class GetHospitalServicesByHospitalIdHandler : IQueryHandler<GetHospitalServicesQuery, GetHospitalServicesResult>
    {
        private readonly IDocumentSession _session;

        public GetHospitalServicesByHospitalIdHandler(IDocumentSession session)
        {
            _session = session;
        }
        public async Task<GetHospitalServicesResult> Handle(GetHospitalServicesQuery query, CancellationToken cancellationToken)
        {
            var hospitalServices = await _session.Query<HospitalServices>()
                .Where(s => s.HospitalId == query.HospitalId).ToListAsync(cancellationToken);

            return new GetHospitalServicesResult(hospitalServices);
        }
    }
}
