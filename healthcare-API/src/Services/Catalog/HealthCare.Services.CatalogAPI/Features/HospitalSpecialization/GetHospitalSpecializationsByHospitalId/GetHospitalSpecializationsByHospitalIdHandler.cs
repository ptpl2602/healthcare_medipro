using HealthCare.Services.CatalogAPI.Features.HospitalService.GetHospitalServicesByHospitalId;

namespace HealthCare.Services.CatalogAPI.Features.HospitalSpecialization.GetHospitalSpecializationsByHospitalId
{
    #region Record Get Hospital's Specializations By Hospital Id
    public record GetHospitalSpecializationsQuery(Guid hospitalId) : IQuery<GetHospitalSpecializationsResult>;
    public record GetHospitalSpecializationsResult(IEnumerable<HospitalSpecializations> HospitalSpecializations);
    #endregion
    public class GetHospitalSpecializationsByHospitalIdHandler : IQueryHandler<GetHospitalSpecializationsQuery, GetHospitalSpecializationsResult>
    {
        private readonly IDocumentSession _session;

        public GetHospitalSpecializationsByHospitalIdHandler(IDocumentSession session)
        {
            _session = session;
        }
        public async Task<GetHospitalSpecializationsResult> Handle(GetHospitalSpecializationsQuery query, CancellationToken cancellationToken)
        {
            var specializations = await _session.Query<HospitalSpecializations>()
                .Where(s => s.HospitalId == query.hospitalId).ToListAsync(cancellationToken);

            return new GetHospitalSpecializationsResult(specializations);
        }
    }
}
