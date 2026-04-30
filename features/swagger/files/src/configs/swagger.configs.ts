import { SwaggerPlugin } from "xypriss-swagger";

/**
 * Swagger Documentation Plugin Configuration
 */
export const swagger = SwaggerPlugin({
    port: 3001,
    title: "{{NAME}} Documentation",
    version: "1.0.0"
});
