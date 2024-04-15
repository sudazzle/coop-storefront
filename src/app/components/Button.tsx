import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

export const Button: React.FC<ButtonProps> = ({ active, ...rest }) => {
  let className = "hover:bg-blue-900 ease-in duration-300 hover:scale-105 hover:border-blue-900 hover:text-white border border-blue-300 rounded-xl py-2 px-4"
  
  if (active === true) {
    className += " bg-blue-900 text-white"
  } else {
    className += " bg-white text-blue-900"
  }

  return (
    <button className={className} {...rest} />
  );
}