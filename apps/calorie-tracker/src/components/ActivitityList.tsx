import { useMemo,type Dispatch} from "react"
import type { Activity } from "../types"
import { categories } from "../data/category"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import type { ActivityActions } from "../reducers/activity-Reducer"

type ActivitityListProps={
    activities:Activity[],
    dispatch:Dispatch<ActivityActions>
}

export default function ActivitityList({activities,dispatch}:ActivitityListProps) {
  const categoryName=useMemo(()=>
                             (category:Activity['category'])=>categories.map(cat=>cat.id===category?cat.name:'')
                             ,[activities])
  const isEmptyActivities=useMemo(()=>activities.length===0,[activities])
  return (
        <>
            <h2 className="text-4xl font-bold text-slate-400 text-center"> Comidas y Actividades</h2>
            {
                isEmptyActivities ? <p className="text-center my-5">No hay actividades aun...</p> :
                activities.map(activity=>(
                        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
                            <div className="space-y-2 relative">
                                <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category===1 ? 'bg-lime-500':'bg-orange-500'}`}>
                                    {categoryName(+activity.category)}
                                </p>
                                <p className="text-2xl font-bold pt-5">
                                    {activity.name}
                                </p>
                                <p className="font-black text-4xl text-lime-500">
                                    {activity.calories} {' ' }
                                    <span>Calorías</span>
                                </p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <button
                                    onClick={()=> dispatch({type:'set-activeId',payload:{id:activity.id}}) }
                                    className="h-8 w-8 text-gray-800"
                                >
                                    <PencilSquareIcon 
                                        className="h-8 w-8 text-gray-800"
                                    />
                                </button>

                                <button
                                    onClick={()=> dispatch({type:'delete-activity',payload:{id:activity.id}}) }
                                    className="h-8 w-8 text-gray-800"
                                >
                                    <XCircleIcon 
                                        className="h-8 w-8 text-red-500"
                                    />
                                </button>
                                
                            </div>
                        </div>
                ))

            }
        </>
  )
}