declare module "*.svg" {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.pdf" {
  const pdf: string;
  export default pdf;
}
