import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface"

const getCorsConfig = (): CorsOptions => {
    return {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        allowedHeaders: "Content-Type, Authorization"
    }
}

export {
    getCorsConfig
}