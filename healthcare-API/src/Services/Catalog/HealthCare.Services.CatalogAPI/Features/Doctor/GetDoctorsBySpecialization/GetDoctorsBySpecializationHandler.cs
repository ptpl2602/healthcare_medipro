
namespace HealthCare.Services.CatalogAPI.Features.Doctor.GetDoctorsBySpecialization
{
    public record GetDoctorsBySpecializationQuery(string SpecializationName, int? PageNumber = 1, int? PageSize = 10) 
        : IQuery<GetDoctorsBySpecializationResult>;
    public record GetDoctorsBySpecializationResult(IEnumerable<Doctors> Doctors);
    internal class GetDoctorsBySpecializationHandler(IDocumentSession session)
        : IQueryHandler<GetDoctorsBySpecializationQuery, GetDoctorsBySpecializationResult>
    {
        public async Task<GetDoctorsBySpecializationResult> Handle(GetDoctorsBySpecializationQuery query, CancellationToken cancellationToken)
        {
            var specialization = await session.Query<Specializations>()
                .FirstOrDefaultAsync(i => i.Name.ToLower() == query.SpecializationName.ToLower(), cancellationToken);

            if (specialization == null)
            {
                return new GetDoctorsBySpecializationResult(Enumerable.Empty<Doctors>());
            }

            var doctors = await session.Query<Doctors>()
                .Where(i => i.SpecializationId.Contains(specialization.Id.ToString()))
                .ToPagedListAsync(query.PageNumber ?? 1, query.PageSize ?? 10, cancellationToken);

            return new GetDoctorsBySpecializationResult(doctors);
        }
    }
}
