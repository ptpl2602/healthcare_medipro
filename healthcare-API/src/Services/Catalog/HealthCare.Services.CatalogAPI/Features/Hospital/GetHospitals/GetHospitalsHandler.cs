namespace HealthCare.Services.CatalogAPI.Features.Hospital.GetHospitals
{
    #region Record Get Hospitals
    public record GetHospitalsQuery(int? PageNumber = 1, int? PageSize = 10) : IQuery<GetHospitalsResult>;
    public record GetHospitalsResult(IEnumerable<Hospitals> Hospitals);
    #endregion

    public class GetHospitalsHandler : IQueryHandler<GetHospitalsQuery, GetHospitalsResult>
    {
        private readonly IDocumentSession _session;

        public GetHospitalsHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<GetHospitalsResult> Handle(GetHospitalsQuery query, CancellationToken cancellationToken)
        {
            var hospitals = await _session.Query<Hospitals>()
                .ToPagedListAsync(query.PageNumber ?? 1, query.PageSize ?? 10, cancellationToken);

            var hospitalIds = hospitals.Select(i => i.Id).ToList();

            var hospitalServices = await _session.Query<HospitalServices>()
                .Where(s => hospitalIds.Contains(s.HospitalId))
                .ToListAsync(cancellationToken);

            var hospitalSpecialization = await _session.Query<HospitalSpecializations>()
                .Where(s => hospitalIds.Contains(s.HospitalId))
                .ToListAsync(cancellationToken);

            foreach (var hospital in hospitals)
            {
                hospital.HospitalServices = hospitalServices.Where(s => s.HospitalId == hospital.Id).ToList();
                hospital.HospitalSpecializations = hospitalSpecialization.Where(s => s.HospitalId == hospital.Id).ToList();
            }

            return new GetHospitalsResult(hospitals);
        }
    }
}