import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { 
  ApolloServerPlugin, 
  GraphQLRequestListener,
  BaseContext
} from '@apollo/server';

interface SentryPluginOptions {
  serviceName?: string;
  includeRawQuery?: boolean;
  includeRequestVariables?: boolean;
  captureAllErrors?: boolean;
  excludedCodes?: string[];
}

export function createSentryPlugin(options: SentryPluginOptions = {}): ApolloServerPlugin<BaseContext> {
  const {
    serviceName,
    includeRawQuery = true,
    includeRequestVariables = true,
    captureAllErrors = false,
    excludedCodes = [],
  } = options;

  return {
    async requestDidStart(requestContext): Promise<GraphQLRequestListener<BaseContext>> {
      return {
        async didEncounterErrors(ctx) {
          if (!ctx.operation && !captureAllErrors) {
            // Skip invalid operations unless explicitly configured to capture all errors
            return;
          }

          for (const err of ctx.errors) {
            if (err.extensions?.code && excludedCodes.includes(String(err.extensions.code))) {
              continue;
            }
            Sentry.withScope((scope) => {
              // Set service name if provided
              if (serviceName) {
                scope.setTag('service_name', serviceName);
              }

              // Set operation type if available
              if (ctx.operation) {
                scope.setTag('operation_type', ctx.operation.operation);
                scope.setTag('operation_name', ctx.operation.name?.value);
              }

              if (includeRawQuery && ctx.request.query) {
                scope.setExtra('query', ctx.request.query);
              }

              if (includeRequestVariables && ctx.request.variables) {
                scope.setExtra('variables', ctx.request.variables);
              }

              if (err.path) {
                scope.addBreadcrumb({
                  category: 'query-path',
                  message: err.path.join(' > '),
                  level: "debug",
                });
              }

              if (requestContext.request.http) {
                const { headers } = requestContext.request.http;
                
                const transactionId = headers.get('x-transaction-id');
                if (transactionId) {
                  scope.setTransactionName(transactionId);
                }

                scope.setExtra('headers', {
                  'user-agent': headers.get('user-agent'),
                  'accept-language': headers.get('accept-language'),
                });
              }
              
              console.log(err);
              Sentry.captureException(err);
            });
          }
        }
      };
    }
  };
}

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});