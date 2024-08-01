namespace HealthCare.Services.CatalogAPI.Features.Specialization.GetSpecializations
{
    #region Record Get Specialization
    public record GetSpecializationsQuery() : IQuery<GetSpecializationsResult>;
    public record GetSpecializationsResult(IEnumerable<Specializations> Specializations);
    #endregion

    public class GetSpecializationsHandler : IQueryHandler<GetSpecializationsQuery, GetSpecializationsResult>
    {
        private readonly IDocumentSession _session;

        public GetSpecializationsHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<GetSpecializationsResult> Handle(GetSpecializationsQuery query, CancellationToken cancellationToken)
        {
            var specializations = await _session.Query<Specializations>().ToListAsync(cancellationToken);

            return new GetSpecializationsResult(specializations);
        }
    }
}
