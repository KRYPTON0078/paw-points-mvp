declare module 'qrcode' {
  type Options = {width?: number; margin?: number; errorCorrectionLevel?: 'M'; type?: 'svg'};
  const QRCode: {toDataURL(text:string, options?:Options):Promise<string>;toString(text:string, options:Options):Promise<string>};
  export default QRCode;
}
