namespace HealthCare.Services.CatalogAPI.Features.Doctor.GetDoctors
{
    #region Record Get Doctors
    public record GetDoctorsQuery(int? PageNumber = 1, int? PageSize = 10) : IQuery<GetDoctorsResult>;
    public record GetDoctorsResult(IEnumerable<Doctors> Doctors);
    #endregion
    
    public class GetDoctorsHandler : IQueryHandler<GetDoctorsQuery, GetDoctorsResult>
    {
        private readonly IDocumentSession _session;

        public GetDoctorsHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<GetDoctorsResult> Handle(GetDoctorsQuery query, CancellationToken cancellationToken)
        {
            var doctors = await _session.Query<Doctors>()
                .ToPagedListAsync(query.PageNumber ?? 1, query.PageSize ?? 10, cancellationToken);

            foreach (var doctor in doctors)
            {
                var specializationGuids = doctor.SpecializationId.Select(Guid.Parse).ToList();

                doctor.Specializations = (await _session.Query<Specializations>()
                    .Where(s => specializationGuids.Contains(s.Id))
                    .ToListAsync(cancellationToken)).ToList();
            }

            return new GetDoctorsResult(doctors);
        }
    }
}
