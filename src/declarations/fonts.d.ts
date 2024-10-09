declare module "*.otf";
declare module "*.ttf";

declare module "*.png" {
  const value: string;

  export default value;
}
