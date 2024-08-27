import zlib from "zlib";

export function compressObject(obj: any) {
  try {
    const jsonString = JSON.stringify(obj);

    const compressedBuffer = zlib.deflateSync(jsonString);

    const compressedString = compressedBuffer.toString("base64");
    return compressedString;
  } catch (error) {
    console.log(error, "error");
  }
}

export function decompressObject(compressedString: string): any {
  const compressedBuffer = Buffer.from(compressedString, "base64");

  const jsonString = zlib.inflateSync(compressedBuffer).toString();

  const obj = JSON.parse(jsonString);
  return obj;
}

export function parseOrderData(orderData: string): any {
  try {
    
    return JSON.parse(orderData);;
  } catch (error) {
    return false;
  }
}
