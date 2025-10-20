import React, { FC } from 'react'

interface StatutsCardProps {
    title: string,
    description: string
    action?: React.ReactNode;
    className: string,
    children: React.ReactNode
}

const StatutsCard: FC<StatutsCardProps> = ({title, description, action, className, children}) => {
  return (
    <div className="min-h-screen  w-full flex justify-center items-center">
      <div className={` flex items-center justify-between gap-4 min-h-[400px]  ${className}`}>
        <div className="flex flex-col text-center space-y-4 max-w-md w-full mx-4">
           <div className="py-4">
             {children}
           </div>
            <div className="text-xl font-semibold">{title}</div>
            {description && <div className="text-sm">{description}</div>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    </div>
    </div>
  )
}

export default StatutsCard