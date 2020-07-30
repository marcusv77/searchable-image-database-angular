// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    playground: $ENV.CRIC_PLAYGROUND,
    api_url: $ENV.CRIC_API_DOMAIN,
    email_address: $ENV.CRIC_EMAIL
};
