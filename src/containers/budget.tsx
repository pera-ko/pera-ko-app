import { ClipboardCheckIcon, ViewGridIcon } from "@heroicons/react/outline"
import { Fragment } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useQuery } from "../hooks";

const Budget: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const isQuickAdd = query.get('view') === 'quickadd'

  const handleViewChange = (mode: 'grid' | 'quickadd') => {
    query.set('view', mode)
    history.push(`${location.pathname}?${query.toString()}`)
  }
  return (
    <Fragment>
      <div>
        <div className='px-4 py-5 flex justify-between items-center'>
          <div className='font-medium'>
            Select a budget
          </div>
          <div>
            <button 
              className={`px-2 py-1 border rounded-l-xl outline-none focus:outline-none text-gray-600 ${isQuickAdd ? 'border-r-0' : 'bg-indigo-100 text-indigo-500'}`}
              onClick={() => handleViewChange('grid')}>
              <ViewGridIcon className='h-6 w-6'/>
            </button>
            <button 
              className={`px-2 py-1 border rounded-r-xl outline-none focus:outline-none text-gray-600 ${!isQuickAdd ? 'border-l-0' : 'bg-indigo-100 text-indigo-500'}`}
              onClick={() => handleViewChange('quickadd')}>
              <ClipboardCheckIcon className='h-6 w-6'/>
            </button>
          </div>
        </div>
        {isQuickAdd ?
        (<div>quick add</div>) : (<div>grid</div>)}
      </div>
    </Fragment>
  )
}

export default Budget