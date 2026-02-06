import { ChevronDownIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { useHistory } from "react-router"
import { useLocQuery } from "../hooks/use-loc-query"
import Chip from "./chip"
import Dialog from "./dialog"
import dayjs, { Dayjs } from "dayjs"
import { useState, useRef } from "react"

type DatePickerProps = {
  selected?: Date;
  onChange: (date: Date) => void;
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function DatePicker({ selected, onChange }: DatePickerProps) {
  const { set, search } = useLocQuery<{ datePicker: 'open' | 'closed' }>();
  const history = useHistory();
  const isOpen = search['datePicker'] === 'open';
  const [tempDate, setTempDate] = useState<Dayjs>(selected ? dayjs(selected) : dayjs());
  const nativeInputRef = useRef<HTMLInputElement>(null);

  const today = dayjs();
  const isToday = selected ? dayjs(selected).isSame(today, 'day') : true;

  const handleOpen = () => {
    setTempDate(selected ? dayjs(selected) : dayjs());
    
    // Use native date picker on mobile
    if (isMobile() && nativeInputRef.current) {
      nativeInputRef.current.click();
    } else {
      set({ datePicker: 'open' });
    }
  }

  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const newDate = dayjs(dateValue).toDate();
      onChange(newDate);
    }
  }

  const handleConfirm = () => {
    onChange(tempDate.toDate());
    history.goBack();
  }

  const handleClose = () => {
    history.goBack();
  }

  const handlePrevMonth = () => {
    setTempDate(tempDate.subtract(1, 'month'));
  }

  const handleNextMonth = () => {
    setTempDate(tempDate.add(1, 'month'));
  }

  const handleDateClick = (day: number) => {
    setTempDate(tempDate.date(day));
  }

  const handleToday = () => {
    setTempDate(dayjs());
  }

  const displayText = isToday ? 'Today' : selected?.toLocaleDateString() || 'Today';

  const button = (
    <Chip 
      onClick={handleOpen}
      leftElement={<CalendarIcon className="w-5 h-5"/>}
      rightElement={!isToday ? <ChevronDownIcon className="w-5 h-5"/> : undefined}
      active={!isToday}
    >
      {displayText}
    </Chip>
  )

  // Generate calendar days
  const firstDay = tempDate.startOf('month');
  const lastDay = tempDate.endOf('month');
  const daysInMonth = lastDay.date();
  const startingDayOfWeek = firstDay.day();
  
  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <>
      <input
        ref={nativeInputRef}
        type="date"
        value={selected ? dayjs(selected).format('YYYY-MM-DD') : ''}
        onChange={handleNativeDateChange}
        style={{ display: 'none' }}
      />
      {button}
      {isOpen && !isMobile() && (
        <Dialog 
          title="Select Date" 
          onClose={handleClose}
          showClose={true}
        >
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold">
              {tempDate.format('MMMM YYYY')}
            </h3>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weeks.map((week, weekIdx) => (
                week.map((day, dayIdx) => (
                  <button
                    key={`${weekIdx}-${dayIdx}`}
                    type="button"
                    onClick={() => day !== null && handleDateClick(day)}
                    disabled={day === null}
                    className={`
                      p-2 text-sm rounded text-center
                      ${day === null ? 'invisible' : ''}
                      ${day === tempDate.date() && tempDate.isSame(selected ? dayjs(selected) : dayjs(), 'month') 
                        ? 'bg-indigo-600 text-white font-semibold' 
                        : 'hover:bg-gray-200 dark:hover:bg-slate-700'
                      }
                      ${day === today.date() && tempDate.isSame(today, 'month')
                        ? 'border border-indigo-600'
                        : ''
                      }
                    `}
                  >
                    {day}
                  </button>
                ))
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={handleToday}
                className="px-3 py-1 text-sm rounded border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                Today
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default DatePicker
