using BuildingBlocks.CQRS.Command;
using FluentValidation;
using MediatR;
namespace BuildingBlocks.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse> (IEnumerable<IValidator<TRequest>> validators)
        : IPipelineBehavior<TRequest, TResponse> where TRequest : ICommand<TResponse>
    {

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            var context = new ValidationContext<TRequest>(request);

            var validationResults = 
                await Task.WhenAll(validators.Select(i => i.ValidateAsync(context, cancellationToken)));
        
            var failures = validationResults.Where(i => i.Errors.Any())
                                            .SelectMany(i => i.Errors)
                                            .ToList();

            if(failures.Any())
            {
                throw new ValidationException(failures);
            }

            return await next();
        }
    }
}
