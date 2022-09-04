import React from "react";
import CalendarComponent from "react-select-date";
import closeIcon from 'src/assets/images/close-light.png';

type CalendarTypes = {
  closeCalendar: () => void;
  selectedDate: (date: string) => void;
}

function Calendar({ closeCalendar, selectedDate }: CalendarTypes) {

  const selectDate = (date: Date): void => {
    selectedDate(date.toLocaleDateString("en-CA"));
  }

  return (
    <div className="absolute w-fit mr-px-30 z-50 border-2 border-black overflow-scroll ">
      <div className="bg-primary-100 float-right mt-px-3 rounded-px-18 flex justify-center items-center" onClick={closeCalendar}>
        <img src={closeIcon} alt="close" className="w-px-30 h-px-30" />
      </div>
      <CalendarComponent onSelect={(date): void => selectDate(date)} />
    </div>
  );
}

export default Calendar;
