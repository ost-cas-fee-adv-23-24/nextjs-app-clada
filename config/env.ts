type Environment = {
  apiUrl: string | undefined;
  zitadelClientId: string | undefined;
  defaultPageSize: number;
  defaultOffset: number;
};

export const Config: Readonly<Environment> = {
  apiUrl:
    process.env.API_URL ?? 'https://mumble-api-prod-4cxdci3drq-oa.a.run.app',
  zitadelClientId: process.env.ZITADEL_CLIENT_ID,
  defaultPageSize: process.env.DEFAULT_PAGE_SIZE
    ? +process.env.DEFAULT_PAGE_SIZE
    : 10,
  defaultOffset: process.env.DEFAULT_OFFSET ? +process.env.DEFAULT_OFFSET : 10,
};
