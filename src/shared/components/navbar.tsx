import React from "react"
import {
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';


type Props = {
  leftButton: NavButton | NavLink,
  title: string
  rightButton?: NavButton | NavLink
}

type NavButton = {
  type: "button"
  onClick(): void
  icon: typeof ArrowLeftIcon
}

type NavLink = {
  type: "link"
  link: string
  icon: typeof ArrowLeftIcon
}

const NavBar = ({ leftButton, title, rightButton } : Props) => {
  const renderButton = (button?: NavButton | NavLink) => {

    if (!button) return null

    const iconElement = button.icon ? React.createElement(button.icon, {
      className: "h-6 w-6",
    }) : null

    if (button.type === "button") {
      return (
        <button
          className='p-5 outline-none focus:outline-none'
          onClick={button.onClick}
        >
          {iconElement}
        </button>
      )
    }
    
    return (
      <Link to={button.link} className='p-5'>
        {iconElement}
      </Link>
    )
  }

  return (
    <div className='sticky top-0 z-10 flex items-center text-lg font-medium app-bg'>
      {renderButton(leftButton)}
      
      <span className="flex-1">{title}</span>

      {renderButton(rightButton)}
    </div>
  )
}

export default NavBar