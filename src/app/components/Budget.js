'use client'
import { itemAction } from '@/redux/store'
import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"

function Budget() {
  const dispatch = useDispatch()
  const [budget, setBudget] = useState()
 
  const [isBudget, setIsBudget] = useState(false)
  const itemBudget = useSelector((state)=> state.budget)
  const remainTotal = useSelector((state)=> state.budgetRemain)
  const total = useSelector((state)=> state.total)
  const items = useSelector((state)=> state.items)

  function showBudget() {
    setIsBudget(true)
  }
  function cancelEdit() {
    setIsBudget(false)
  }
  function saveEdit() {
dispatch(itemAction.updateBudget({newBudget : budget}))
setIsBudget(false)
  }
  useEffect(()=> {
dispatch(itemAction.RemainingTotal())
  })
 
      useEffect(()=> {
        dispatch(itemAction.calculateTotal())
          },[items])
  return (
    <div className="px-3">
        <h1 className="font-semibold  text-[21px]">My Budget Planner</h1>
    
    <div className="grid md:grid-cols-3 gap-y-2 sm:grid-cols-2 grid-cols-1 gap-x-4">
<div className={`back items-center flex justify-between px-2 py-2 rounded-lg relative sm:mb-0 ${isBudget ? "mb-5" : null}`}>
  {!isBudget ? <><div>Budget : ${itemBudget}</div> 
  <button className="bg-[blue] text-white font-[12px] py-1 px-2 rounded-lg" onClick={showBudget}>Edit</button> </>  :
  <input type = "number" placeholder='Type in your budget' value = {budget} max = {2000} min = {0} onChange = {(event)=> setBudget(event.target.value)} className="absolute top-0 px-2 w-[100%] rounded-md sm:h-[100%] h-[35px] left-0 outline-none border border-[grey]"/>}
 
 </div>
<div className="color-success px-2 py-2 rounded-lg">Remaining : ${remainTotal}</div>
<div className="color-primary px-2 py-2 rounded-lg">Spent so far : ${total}</div>

    </div>

   {isBudget? <div className="flex space-x-2 mt-2"><button onClick={saveEdit} className="bg-[green] text-white px-2 py-1 rounded-lg">Save Edit</button> 
   <button onClick = {cancelEdit} className="bg-[grey] text-white px-2 py-1 rounded-lg">Cancel Edit</button>
    </div> : null}
    </div>
  )
}

export default Budget