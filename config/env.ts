type Environment = {
    apiUrl: string | undefined,
    zitadelClientId: string | undefined
}

export const Config: Readonly<Environment> = {
    apiUrl: process.env.API_URL,
    zitadelClientId: process.env.ZITADEL_CLIENT_ID
}