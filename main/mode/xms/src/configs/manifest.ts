export const manifest: IManifest = __sys__.vars.get("manifest");

interface IManifest {
  name: string;
  description: string;
  version: string;
  author: string;
}
