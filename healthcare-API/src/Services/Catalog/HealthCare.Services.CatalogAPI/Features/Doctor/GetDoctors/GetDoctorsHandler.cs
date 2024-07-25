
namespace HealthCare.Services.CatalogAPI.Features.Doctor.GetDoctors
{
    public record GetDoctorsQuery(int? PageNumber = 1, int? PageSize = 10) : IQuery<GetDoctorsResult>;
    public record GetDoctorsResult(IEnumerable<Doctors> Doctors);
    public class GetDoctorsHandler(IDocumentSession session) : IQueryHandler<GetDoctorsQuery, GetDoctorsResult>
    {
        public async Task<GetDoctorsResult> Handle(GetDoctorsQuery query, CancellationToken cancellationToken)
        {
            var doctors = await session.Query<Doctors>()
                .ToPagedListAsync(query.PageNumber ?? 1, query.PageSize ?? 10, cancellationToken);

            return new GetDoctorsResult(doctors);
        }
    }
}
