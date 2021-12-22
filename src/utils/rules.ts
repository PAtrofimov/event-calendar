import moment, { Moment } from 'moment';
import { message } from "antd";

export const rules = {
   required: (message: string = 'Обязательное поле!') => ({
      message,
      required: true
   }),
   isDateAfter: (message: string) => () => ({
      validator(_:any, value: Moment) {
        // console.log({moment: moment(), value});

         if (value.isSameOrAfter(moment())) {
            return Promise.resolve()
         }

         return Promise.reject(new Error(message));
      }
   })
}