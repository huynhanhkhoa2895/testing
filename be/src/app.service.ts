import {Injectable} from '@nestjs/common';
import {getAverage, isNumber} from "../util/helper";
import {InjectRepository} from "@nestjs/typeorm";
import {Log} from "./entity/Log.entity";
import {Repository} from "typeorm";
import {CreateLogDto} from "./DTO/createLog.dto";

@Injectable()
export class AppService {

  constructor(
      @InjectRepository(Log) private logRepository: Repository<Log>
  ) {
  }

  async getAllLog(): Promise<any> {
    try{
      return await this.logRepository.find();
    }catch (e){
      throw e;
    }
  }

  async createLog(createLogDto : CreateLogDto): Promise<any> {
    try{
      const log = await this.logRepository.create(createLogDto);
      return await this.logRepository.save(log);
    }catch (e){
      throw e;
    }
  }

  async partArrayLogToJSON(): Promise<object[]> {
    try{
      const data : Log[] = await this.logRepository.find();
      const inputs = data.map((item: Log)=>item.content)
      let texts = [];
      let logs: LogItem[] = [],results = [];
      const stepArray = ['category','total','title','pageReadByUser','rate']
      let item : LogItem;
      let text: string | number = '';
      let prevText: string | number = '';
      let step: number;
      for(let i=0;i<inputs.length;i++){
        texts = inputs[i]?.split(' ');
        step = 0;
        item = {
          category: [],
          total: 0,
          title: [],
          pageReadByUser: 0,
          rate: 0
        }
        for(let j=0;j<texts.length;j++) {
          text = texts[j];
          prevText = texts[(j === 0 ? 0 : j-1)];
          if(isNumber(prevText) || text.toString().search(/page/) > -1) {
            const match = text.toString().match(/^(\d+)([a-zA-Z]+)$/);
            step++;
            if(match){
              item[stepArray[step]] = parseInt(match[1]);
            } else {
              Array.isArray(item[stepArray[step-1]]) && item[stepArray[step-1]].pop()
              item[stepArray[step]] = Number(prevText);
            }
            step++;
          } else {
            if(step === 0 || step === 2) {
              Array.isArray(item[stepArray[step]]) && item[stepArray[step]].push(text.toString())
            }else{
              item[stepArray[step]] = text
            }
          }
        }
        item.category = Array.isArray(item.category) && item.category.join(' ').toLowerCase();
        item.title = Array.isArray(item.title) && item.title.join(' ').toLowerCase()

        logs.push(item)
      }
      logs.map((item: LogItem)=>{
        const index = results.findIndex((_item : any) => _item?.title === item.title && _item?.category === item.category)
        if(index === -1){
          results.push({...item,...{rate: [item.rate]}})
        }else{
          results[index].rate.push(Number(item.rate))
        }
      })
      return results.map((item)=>({
        title: item.title,
        reading_rate: item.pageReadByUser/item.total,
        average_rate: getAverage(item.rate)
      }))
    } catch (e) {
      throw e;
    }
  }
}
