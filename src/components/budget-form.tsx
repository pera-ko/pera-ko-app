import { RadioGroup } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import BudgetRadio from "./budget-radio"

interface Budget {
  type: "budget";
  budgetName: string;
  amount: number;
}

interface Goal {
  type: "goal";
  budgetName: string;
  amount: number;
  startDate: string;
  endDate?: string | undefined;
  installmentType: "monthly" | "semi-monthly"
}

interface BudgetFormProps {
  defaultValue?: Budget | Goal
}
const BudgetForm: React.FC<BudgetFormProps> = ({ defaultValue }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Budget | Goal>({defaultValues: defaultValue});
  const [type, setType] = useState<"budget" | "goal">("budget")
  const [installmentType, setInstallmentType] = useState<"monthly" | "semi-monthly">("monthly")

  const handleFormSubmit:SubmitHandler<Budget | Goal> = (data) => {
    console.log(data)
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
            <button 
              type='button'
              className='block h-11 w-11 px-3 font-medium items-center bg-indigo-100 rounded-md border-2 border-transparent focus-within:border-indigo-300'>
            </button>
          </label>
          <label className=''>
            <div className='font-medium text-sm my-1 text-gray-600'>Color</div>
            <button 
              type='button'
              className='block h-11 w-11 px-3 font-medium items-center bg-indigo-100 rounded-full border-2 border-transparent focus-within:border-indigo-300'>
            </button>
          </label>
        </div>
        <div className='flex-1'>
          <label className='block mb-2'>
            <div className='font-medium text-sm my-1 text-gray-600'>Name</div>
            <div className={`
              ${errors.budgetName ? 'border-red-400' : 'focus-within:border-indigo-300'}
              px-3 font-medium flex items-center bg-indigo-100 rounded-md 
              border-2 border-transparent `}>
              <input 
                {...register("budgetName", { required: "Name is required."})}
                className='font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent w-full'/>
            </div>
            {errors.budgetName && <span className='text-xs text-red-700'>{errors.budgetName?.message}</span>}
          </label>
          <label className='block mb-2'>
            <div className='font-medium text-sm my-1 text-gray-600'>Amount</div>
            <div className={`
              ${errors.amount ? 'border-red-400' : 'focus-within:border-indigo-300'}
              px-3 font-medium flex items-center bg-indigo-100 rounded-md 
              border-2 border-transparent `}>
              <span className='mr-3 text-gray-600'>PHP</span>
              <input 
                {...register("amount", { required: "Amount is required."})}
                className='w-full font-medium flex-1 outline-none focus:outline-none text-right py-2 bg-transparent' type="number" defaultValue={1000.01} step=".01"/>
            </div>
          </label>
          {type === "goal" && (
            <Fragment>
              <label className='block mb-2'>
                <div className='font-medium text-sm my-1 text-gray-600'>Start Date</div>
                <div className=' px-3 font-medium flex items-center bg-indigo-100 rounded-md border-2 border-transparent focus-within:border-indigo-300'>
                  <input className='w-full font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent' type="date"/>
                </div>
              </label>
              <label className='block mb-2'>
                <div className='font-medium text-sm my-1 text-gray-600'>End Date</div>
                <div className=' px-3 font-medium flex items-center bg-indigo-100 rounded-md border-2 border-transparent focus-within:border-indigo-300'>
                  <input className='w-full font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent' type="date"/>
                </div>
              </label>
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