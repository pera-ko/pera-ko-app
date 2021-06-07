import { Popover, RadioGroup } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { HexColorPicker } from "react-colorful";
import BudgetRadio from "./budget-radio"
import InputGroup from "./input-group"
import {default as EmojiPicker, IEmojiData } from "emoji-picker-react";

interface Budget {
  type: "budget";
  budgetName: string;
  amount: number;
  icon: string;
}

interface Goal {
  type: "goal";
  budgetName: string;
  amount: number;
  icon: string;
  startDate: string;
  endDate?: string | undefined;
  installmentType: "monthly" | "semi-monthly"
}

interface Inputs {
  budgetName: string;
  amount: number;
  icon: string;
  startDate?: string;
  endDate?: string;
  installmentType?: "monthly" | "semi-monthly"
}

interface BudgetFormProps {
  defaultValue?: Budget | Goal
  onSubmit?(value: Budget | Goal): void
}

const BudgetForm: React.FC<BudgetFormProps> = ({ defaultValue, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({defaultValues: defaultValue});
  const [type, setType] = useState<"budget" | "goal">("budget")
  const [installmentType, setInstallmentType] = useState<"monthly" | "semi-monthly">("monthly")
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>();
  const [color, setColor] = useState("#fff");

  const handleFormSubmit:SubmitHandler<Inputs> = (data) => {
    let returnValue: Budget | Goal;
    if (type === "budget") {
      returnValue = {
        type,
        budgetName: data.budgetName,
        amount: data.amount,
        icon: chosenEmoji?.emoji!
      }
    } else {
      returnValue = {
        type,
        budgetName: data.budgetName,
        amount: data.amount,
        icon: chosenEmoji?.emoji!,
        startDate: data.startDate!,
        endDate: data.endDate,
        installmentType
      }
    }
    if (onSubmit) onSubmit(returnValue)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='mb-5'>
        <BudgetRadio type={type} onChange={setType}/>
      </div>
      <div className='flex'>
        <div className='w-11 mr-3'>
          <label className='block mb-2'>
            <div className='font-medium text-sm my-1 text-gray-600'>Icon</div>
            <Popover>
              <Popover.Button type='button'
              className='block h-11 w-11 text-2xl font-medium items-center bg-indigo-100 rounded-md border-2 border-transparent focus:border-indigo-300 outline-none focus:outline-none'>
                {chosenEmoji
                  ? chosenEmoji.emoji
                  : defaultValue
                  ? defaultValue.icon
                  : ''}
              </Popover.Button>
              <Popover.Panel className="absolute z-10">
                <EmojiPicker
                  onEmojiClick={(e, emoji) => setChosenEmoji(emoji)}
                  native
                />
              </Popover.Panel>
            </Popover>
          </label>
          <label className=''>
            <div className='font-medium text-sm my-1 text-gray-600'>Color</div>
            <Popover>
              <Popover.Button type='button'
              className='block h-11 w-11 px-3 rounded-full border-2 focus:border-indigo-300 focus:outline-none outline-none' style={{backgroundColor: color}}></Popover.Button>
              <Popover.Panel className="absolute z-10">
                <HexColorPicker color={color} onChange={setColor}/>
              </Popover.Panel>
            </Popover>
          </label>
        </div>
        <div className='flex-1'>
          <InputGroup
            label="Budget Name"
            error={errors.budgetName}
            {...register("budgetName", { required: "Name is required."})}
            />
          <InputGroup
            label="Amount"
            contentLabel={{ type: "text", content: "PHP" }}
            error={errors.amount}
            inputClassName="text-right"
            {...register("amount", { required: "Amount is required."})}/>
          {type === "goal" && (
            <Fragment>
              <InputGroup
                label="Start Date"
                error={errors.startDate}
                type="date"
                {...register("startDate", { required: "Start Date is required.", setValueAs: v => new Date(v).toJSON() })}/>
              <InputGroup
                label="End Date"
                error={errors.endDate}
                type="date"
                {...register("endDate", { setValueAs: v => new Date(v).toJSON() })}/>
              <div className='font-medium text-sm my-1 text-gray-600 mt-1'>Installment Type</div>
              <RadioGroup value={installmentType} onChange={setInstallmentType} className='grid grid-cols-2 text-center text-sm font-medium focus:bg-black'>
                <RadioGroup.Option value="monthly"
                  className={({active, checked}) => `
                    ${checked ? 'bg-indigo-100 text-indigo-500' : ''} 
                    ${active ? 'ring-2 ring-offset-indigo-300 text-red-500' : ''} 
                    px-2 py-3 border rounded-l-md outline-none focus:outline-none text-gray-600 
                    `}>
                    <RadioGroup.Label>Monthly</RadioGroup.Label>
                </RadioGroup.Option>
                <RadioGroup.Option value="semi-monthly"
                  className={({active, checked}) => `
                    ${checked ? 'bg-indigo-100 text-indigo-500' : ''} 
                    ${active ? 'ring-2 ring-offset-indigo-300 text-red-500' : ''} 
                    px-2 py-3 border rounded-r-md outline-none focus:outline-none text-gray-600 
                    `}>
                    <RadioGroup.Label>Semi-monthly</RadioGroup.Label>
                </RadioGroup.Option>
              </RadioGroup>
            </Fragment>
          )}
        </div>
      </div>
      <div className='fixed bottom-4 inset-x-0 px-5'>
      <button type='submit' className=' w-full bg-indigo-600 text-white py-3 rounded-2xl  shadow-md'>
        Create Budget
      </button>
      </div>
    </form>
  )
}

export default BudgetForm