declare global{
    namespace NodeJS{
        interface ProcessEnv {
            NODE_ENV ?: string;
            HOST ?: string;
            PORT ?: string;
            DATABASE_URL  ?: string;
            USER ?: string;
            DATABASE ?: string;
            PASSWORD ?: string;  
            DB_HOST ?: string;
            DB_PORT ?: string;
            JWT_SECRET ?: string;
        }
    }
}

// This line is necessary to make the file a module
export {};


