'use client';
import Image from 'next/image'
import useGoogleApi from "@/hooks/useGoogleApi";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {TBooks} from "@/types";
import Loading from "@/components/loading";
import InfiniteScroll from 'react-infinite-scroller';
import {useDebounce} from "usehooks-ts";

export default function Home() {
  const {data,updateQuery,hasMore,getData} = useGoogleApi()
  const [query,setQuery] = useState<string>('quilting')
  const debouncedValue = useDebounce<string>(query, 500)

  useEffect(()=>{
    updateQuery(debouncedValue)
  },[debouncedValue])

  const handlerScroll = useCallback(() => {
    if(data.length > 0){
      getData();
    }
  },[data])

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <main className="min-h-screen w-full p-2 xl:p-10">
      <div className={'w-full max-w-[1440px] mx-auto'}>
        <input type={'text'} className={'mb-5 border p-3'} value={query} onChange={onSearchChange} />
        <InfiniteScroll
            pageStart={0}
            loadMore={handlerScroll}
            hasMore={hasMore}
            loader={<Loading key={0} className={'mx-auto'} />}
        >
          <table className={'table table-fix w-full border-collapse border border-slate-500'}>
            <thead>
              <tr>
                <th className={'border border-slate-600 w-[25%]'}>Thumbnail</th>
                <th className={'border border-slate-600 w-[25%]'}>Title</th>
                <th className={'border border-slate-600 w-[25%]'}>Subtitle</th>
                <th className={'border border-slate-600 w-[25%]'}>Author</th>
              </tr>

            </thead>
            <tbody>
            {data && data?.map((item : TBooks,index : number)=>{
              return(
                  <tr key={index}>
                    <td className={'border border-slate-600 w-[25%]'}>
                      <div className={'p-2'}>
                        <Image
                            style={{height: 'auto'}}
                            className={'w-full h-full sm:w-[200px] sm:h-[200px] object-cover mx-auto'}
                            width={200}
                            height={200}
                            src={item.thumbnail}
                            alt={item.title}
                        />
                      </div>

                    </td>
                    <td className={'border border-slate-600 w-[25%]'}>{item.title}</td>
                    <td className={'border border-slate-600 w-[25%]'}>{item.subtitle}</td>
                    <td className={'border border-slate-600 w-[25%]'}>{item.author}</td>
                  </tr>
              )
            })}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </main>
  )
}
