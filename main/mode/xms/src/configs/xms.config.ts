export const xmsc: IXMSC = __sys__.vars.get("servers");


Object.keys(xmsc).forEach((key) => {
  xmsc[key as keyof IXMSC].port = Number(xmsc[key as keyof IXMSC].port);
});

interface IXMSC {
  auth: {
    id: string;
    port: number;
  };
  main: {
    id: string;
    port: number;
  };
}
