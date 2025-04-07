export default {
    schema: './src/schema.ts',
    out:'./drizzle',
    driver:'d1',
    dbCredentials:{
        wranglerConfigPath: 'wrangler.json',
        dbName: 'd1-virtualbox',
    }
}