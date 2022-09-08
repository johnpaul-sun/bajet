import React, { useState } from "react";
import Card from "src/components/organisms/CardPopup/CardPopup";
import CalendarIcon from 'src/assets/images/calendar.png'
import Button from "src/components/molecules/Button/Button";
import Calendar from "src/components/molecules/Calendar/Calendar";
import getOrdinalNumber from 'src/utils/getOrdinalNumber';
import getMonthWord from "src/utils/getMonthWord";

type AddPocketTypes = {
  onClickHeader: () => void,
  handleSubmit?: () => void
}

function AddPocket({ onClickHeader, handleSubmit }: AddPocketTypes) {
  const [oneDay, setOneDay] = useState<boolean>(false);
  const [monthly, setMonthly] = useState<boolean>(true);
  const [calendar, setCalendar] = useState<boolean>(false);
  const [dateSelected, setDateSelected] = useState<string>('select-date-00');

  const selectedDay = dateSelected.split('-')[2];
  const selectedMonth = dateSelected.split('-')[1];

  const selectOneDay = (): void => {
    setOneDay(true);
    setMonthly(false);
  }

  const selectMonthly = (): void => {
    setOneDay(false);
    setMonthly(true);
  }

  const closeCalendar = (): void => {
    setCalendar(!calendar);
  }

  const selectedDate = (date: string): void => {
    setDateSelected(date);
    closeCalendar();
  }

  return (
    <Card header={true} headerText="Add Pocket" onClickHeader={onClickHeader} closeModal={onClickHeader} className="relative">
      {calendar && <Calendar closeCalendar={closeCalendar} selectedDate={selectedDate} />}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="pocket_name" className="text-13 font-medium">Pocket name</label>
          <input type="text" className="bg-background-dropdown-selected h-px-30 rounded-px-3 text-light-100 text-13 px-px-12" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-13 font-medium">Amount</label>
          <input type="number" className="bg-background-dropdown-selected h-px-30 rounded-px-3 text-success-100 text-13 px-px-12" />
        </div>
      </div>
      <div className="mt-px-30">
        <div className="flex flex-col gap-2">
          <p className="text-13 font-medium">Schedule</p>
          <div className="flex flex-row gap-2">
            <Button
              type="secondary"
              className={`w-full ${oneDay || 'opacity-50'}`}
              height="medium"
              text="One day"
              onClick={selectOneDay} />
            <Button
              type="secondary"
              className={`w-full ${monthly || 'opacity-50'}`}
              height="medium"
              text="Monthly"
              onClick={selectMonthly} />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-px-12">
          <p className="text-13 font-medium">Schedule date</p>
          <Button fontType="dark" type="secondaryInvert" className="w-full" height="medium" text={dateSelected} onClick={() => setCalendar(!calendar)} />
        </div>
        <div className="flex flex-row gap-2 mt-px-12">
          <img src={CalendarIcon} alt="dropdown" className='h-px-20 w-px-20' />
          <p className="text-13 font-medium">{oneDay ? 'on' : 'every'} {getOrdinalNumber(selectedDay)} of {oneDay ? getMonthWord(selectedMonth) : 'the Month'}</p>
        </div>
      </div>
      <Button type="secondary" text="Continue" className="mt-px-50" onClick={handleSubmit} />
    </Card>
  );
}

export default AddPocket;
