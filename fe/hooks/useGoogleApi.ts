import {useEffect, useState} from "react";
import {TBooks} from "@/types";
const PER_PAGE = 10
const useGoogleApi = () => {
  const [data,setData] = useState<TBooks[]>([]);
  const [total,setTotal] = useState<number>(0);
  const [page,setPage] = useState<number>(0)
  const [hasMore,setHasMore] = useState<boolean>(true)
  const [query,setQuery] = useState<string>('quilting')
  const updateQuery = (value : string) => {
    setQuery(value)
    setData([])
    setPage(0)
    setHasMore(true)
  }
  useEffect(()=>{
    getData()
  },[query])
  const getData = async () => {
    const startIndex: number = page*PER_PAGE
    const rs : any = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${PER_PAGE}`)
        .then((res: Response) => res.json())
        .then((res: any)=>(
            {
              total: res?.totalItems || 0,
              data: res.items.map((item : any)=>({
                thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
                title: item?.volumeInfo?.title,
                subtitle: item?.volumeInfo?.subtitle,
                author: item?.volumeInfo?.authors ? item?.volumeInfo?.authors[0] : '',
              }))
            }
        ))
        .catch((e)=>console.log(e));
    setData((data)=> {
      return[...data, ...(rs?.data || [])]
    })
    setTotal(rs?.total)
    setHasMore(startIndex+PER_PAGE < rs?.total)
    setPage(page+1)
  }

  return {data,total,updateQuery,hasMore,getData}
}
export default useGoogleApi
