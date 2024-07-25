using HealthCare.Services.CatalogAPI.Models;

namespace HealthCare.Services.CatalogAPI.Features.Specialization.GetSpecializations
{
    public record GetSpecializationsQuery() : IQuery<GetSpecializationsResult>;
    public record GetSpecializationsResult(IEnumerable<Specializations> Specializations);
    public class GetSpecializationsHandler(IDocumentSession session) : IQueryHandler<GetSpecializationsQuery, GetSpecializationsResult>
    {
        public async Task<GetSpecializationsResult> Handle(GetSpecializationsQuery query, CancellationToken cancellationToken)
        {
            var specializations = await session.Query<Specializations>().ToListAsync(cancellationToken);

            return new GetSpecializationsResult(specializations);
        }
    }
}
