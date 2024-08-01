
namespace HealthCare.Services.CatalogAPI.Features.Doctor.GetDoctorsBySpecialization
{
    #region Record Get Doctors By Specialization
    public record GetDoctorsBySpecializationQuery(string SpecializationName, int? PageNumber = 1, int? PageSize = 10) 
        : IQuery<GetDoctorsBySpecializationResult>;
    public record GetDoctorsBySpecializationResult(IEnumerable<Doctors> Doctors);

    #endregion

    internal class GetDoctorsBySpecializationHandler : IQueryHandler<GetDoctorsBySpecializationQuery, GetDoctorsBySpecializationResult>
    {
        private readonly IDocumentSession _session;

        public GetDoctorsBySpecializationHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<GetDoctorsBySpecializationResult> Handle(GetDoctorsBySpecializationQuery query, CancellationToken cancellationToken)
        {
            var specialization = await _session.Query<Specializations>()
                .FirstOrDefaultAsync(i => i.Name.ToLower() == query.SpecializationName.ToLower(), cancellationToken);

            if (specialization == null)
            {
                return new GetDoctorsBySpecializationResult(Enumerable.Empty<Doctors>());
            }

            var doctors = await _session.Query<Doctors>()
                .Where(i => i.SpecializationId.Contains(specialization.Id.ToString()))
                .ToPagedListAsync(query.PageNumber ?? 1, query.PageSize ?? 10, cancellationToken);

            foreach (var doctor in doctors)
            {
                var specializationGuids = doctor.SpecializationId.Select(Guid.Parse).ToList();

                doctor.Specializations = (await _session.Query<Specializations>()
                    .Where(s => specializationGuids.Contains(s.Id))
                    .ToListAsync(cancellationToken)).ToList();
            }

            return new GetDoctorsBySpecializationResult(doctors);
        }
    }
}
