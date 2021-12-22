
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { Moment } from 'moment';
import React, { FC, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/IUser';
import { formatDate } from '../utils/date';
import { rules } from '../utils/rules';

interface EventFormProps {
   guests: IUser[],
   submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
   const [event, setEvent] = useState<IEvent>({
      author: '',
      description: '',
      date: '',
      guest: ''
   } as IEvent);
   const { user } = useTypedSelector(state => state.auth);
   const selectDate = (date: Moment | null) => {

      if (date) {
         setEvent({ ...event, date: formatDate(date.toDate()) });
      }

   }
   const submitForm = () => {
      props.submit({ ...event, author: user.username });
      setEvent({...event,
         author: '',
         description: '',
         date: '',
         guest: ''
      });

   }
   return (
      <Form onFinish={submitForm}>

         <Form.Item
            label="Описание события"
            name="description"
            rules={[rules.required()]}>

            <Input value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
         </Form.Item>
         <Form.Item
            label="Дата события"
            name="date"
            rules={[rules.required(), rules.isDateAfter('Дата события не может быть в прошлом!')]}>

            <DatePicker onChange={(date) => selectDate(date)} />
         </Form.Item>

         <Form.Item label="Гость" name="guest" rules={[rules.required()]}>
            <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
               {props.guests.map((guest => (<Select.Option value={guest.username} key={guest.username}>{guest.username}</Select.Option>)))}

            </Select>
         </Form.Item>

         <Row justify="end">
            <Form.Item>
               <Button type="primary" onClick={submitForm}>Создать</Button>
            </Form.Item>
         </Row>
      </Form>
   );
};

export default EventForm;