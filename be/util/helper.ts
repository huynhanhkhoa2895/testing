export function isNumber(value : string | number){
  return !isNaN(Number(value))
}

export function getAverage(arr : number[]){
  let sum = 0;
  arr.forEach((item: number) => {
    sum += Number(item);
  })
  return sum / arr.length
}

export function response(data: any,code : number, err? : []){
  return({
    statusCode : code,
    data: data ?? []
  })
}