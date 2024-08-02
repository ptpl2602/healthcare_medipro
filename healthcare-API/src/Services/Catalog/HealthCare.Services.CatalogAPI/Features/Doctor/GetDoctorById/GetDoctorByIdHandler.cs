namespace HealthCare.Services.CatalogAPI.Features.Doctor.GetDoctorById
{
    #region Record Get Doctor By Id
    public record GetDoctorByIdQuery(Guid Id) : IQuery<GetDoctorByIdResult>;
    public record GetDoctorByIdResult(Doctors Doctor);
    #endregion
    internal class GetDoctorByIdHandler : IQueryHandler<GetDoctorByIdQuery, GetDoctorByIdResult>
    {
        private readonly IDocumentSession _session;

        public GetDoctorByIdHandler(IDocumentSession session)
        {
            _session = session;
        }

        public async Task<GetDoctorByIdResult> Handle(GetDoctorByIdQuery query, CancellationToken cancellationToken)
        {
            var doctor = await _session.LoadAsync<Doctors>(query.Id, cancellationToken);

            if(doctor is null)
            {
                throw new DoctorNotFoundException(query.Id);
            }

            var specializationDetail = doctor.SpecializationId.Select(Guid.Parse).ToList();

            doctor.Specializations = (await _session.Query<Specializations>()
                .Where(i => specializationDetail.Contains(i.Id))
                .ToListAsync(cancellationToken)).ToList();

            return new GetDoctorByIdResult(doctor);
        }
    }
}
