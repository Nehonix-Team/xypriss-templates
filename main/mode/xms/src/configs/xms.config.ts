/**
 * XyPriss Multi-Server Configuration Store
 * 
 * Aggregates server-specific identifiers and network port assignments from 
 * the XyPriss environment variables via the 'xms_nodes' key.
 */
export const xmsc: IXMSC = __sys__.vars.get("xms_nodes");

/**
 * Type Casting for Network Ports
 * 
 * Ensures all port assignments retrieved from environment variables are 
 * treated as numeric values to prevent configuration errors during 
 * server binding.
 */
Object.keys(xmsc).forEach((key) => {
  xmsc[key as keyof IXMSC].port = Number(xmsc[key as keyof IXMSC].port);
});

/**
 * XMS Configuration Interface
 */
interface IXMSC {
  /** Configuration for the Authentication server instance */
  auth: {
    id: string;
    port: number;
  };
  /** Configuration for the Main API server instance */
  main: {
    id: string;
    port: number;
  };
}
