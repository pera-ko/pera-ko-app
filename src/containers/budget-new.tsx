import { Dialog, RadioGroup } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import React, { Fragment, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import BudgetRadio from "../components/budget-radio";

export default function BudgetNew() {
  const route = useRouteMatch('/:year/:month/preferences/newbudget');
  const history = useHistory();
  const [type, setType] = useState<"budget" | "goal">("budget")
  const [installmentType, setInstallmentType] = useState<"monthly" | "semi-monthly">("monthly")
  const isOpen = route !== null && route.isExact

  return (
    <Dialog open={isOpen} onClose={() => history.goBack()}
      as="div"
      className='fixed inset-0 bg-white overflow-y-auto text-gray-800 pb-20'>
      <div className='sticky top-0 bg-white flex items-center font-medium text-lg'>
        <button
          className='p-5'
          onClick={() => history.goBack()}>
          <ArrowLeftIcon className='h-6 w-6' />
        </button>
        <Dialog.Title>New Budget</Dialog.Title>
      </div>
      <div className='px-5 py-5'>
        <div className='mb-5'>
          <BudgetRadio type={type} onChange={setType}/>
        </div>
        <form>
          <div className='flex'>
            <div className='w-11 mr-3'>
              <label className='block mb-2'>
                <div className='font-medium text-sm my-1 text-gray-600'>Icon</div>
                <div className='px-2 font-medium flex items-center bg-indigo-100 rounded-md border-2 border-transparent focus-within:border-indigo-300'>
                  <input className='font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent'/>
                </div>
              </label>
              <label className=''>
                <div className='font-medium text-sm my-1 text-gray-600'>Color</div>
                <div className='px-3 font-medium flex items-center bg-indigo-100 rounded-full border-2 border-transparent focus-within:border-indigo-300'>
                  <input className='font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent'/>
                </div>
              </label>
            </div>
            <div className='flex-1'>
              <label className='block mb-2'>
                <div className='font-medium text-sm my-1 text-gray-600'>Name</div>
                <div className='px-3 font-medium flex items-center bg-indigo-100 rounded-md border-2 border-transparent focus-within:border-indigo-300'>
                  <input className='font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent w-full'/>
                </div>
              </label>
              <label className='block mb-2'>
                <div className='font-medium text-sm my-1 text-gray-600'>Amount</div>
                <div className=' px-3 font-medium flex items-center bg-indigo-100 rounded-md border-2 border-transparent focus-within:border-indigo-300'>
                  <span className='mr-3 text-gray-600'>PHP</span>
                  <input className='w-full font-medium flex-1 outline-none focus:outline-none text-right py-2 bg-transparent' type="number" value={1000.01} step=".01"/>
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
                  <RadioGroup value={installmentType} onChange={setInstallmentType} className='grid grid-cols-2 text-center text-sm font-medium'>
                    <RadioGroup.Option value="monthly" as={Fragment}>
                        {({checked}) => (
                          <span className={`px-2 py-3 border rounded-l-md outline-none focus:outline-none text-gray-600 ${!checked ? '' : 'bg-indigo-100 text-indigo-500'}`}>
                            Monthly
                          </span>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="bi-monthly" as={Fragment}>
                      {({checked}) => (
                        <span className={`px-2 py-3 border rounded-r-md outline-none focus:outline-none text-gray-600 ${!checked ? '' : 'bg-indigo-100 text-indigo-500'}`}>
                        Semi-monthly
                      </span>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </Fragment>
              )}
            </div>
          </div>
          <div className='fixed bottom-4 inset-x-0 px-5'>
          <button className=' w-full bg-indigo-600 text-white py-3 rounded-2xl  shadow-md'>
            Create Budget
          </button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}