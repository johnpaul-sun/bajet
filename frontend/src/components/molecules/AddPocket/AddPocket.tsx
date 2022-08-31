import React, { useState } from "react";
import Card from "src/components/organisms/CardPopup/CardPopup";
import Calendar from 'src/assets/images/calendar.png'
import Button from "../Button/Button";

type AddPocketTypes = {
  onClickHeader: () => void,
  handleSubmit: () => void
}

function AddPocket({ onClickHeader, handleSubmit }: AddPocketTypes) {
  const [oneDay, setOneDay] = useState<boolean>(false);
  const [monthly, setMonthly] = useState<boolean>(true);

  return (
    <Card header={true} headerText="Add wallet" onClickHeader={onClickHeader}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="pocket_name" className="text-13 font-medium">Wallet name</label>
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
            <Button type="secondary" className={`w-full ${oneDay || 'bg-primary-60'}`} height="medium" text="One day" onClick={() => {
              setOneDay(true);
              setMonthly(false);
            }} />
            <Button type="secondary" className={`w-full ${monthly || 'bg-primary-60'}`} height="medium" text="Monthly" onClick={() => {
              setOneDay(false);
              setMonthly(true);
            }} />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-px-12">
          <p className="text-13 font-medium">Schedule date</p>
          <Button fontType="dark" type="secondaryInvert" className="w-full" height="medium" text="August 31, 2022" onClick={handleSubmit} />
        </div>
        <div className="flex flex-row gap-2 mt-px-12">
          <img src={Calendar} alt="dropdown" className='h-px-20 w-px-20' />
          <p className="text-13 font-medium">on 31st day of August</p>
        </div>
      </div>
      <Button type="secondary" text="Continue" className="mt-px-50" onClick={handleSubmit} />
    </Card>
  );
}

export default AddPocket;
