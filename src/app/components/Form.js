'use client'
import React from 'react'
import { itemAction } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from "react"

function Form() {
  const [itemName, setItemName] = useState()
  const [price, setPrice] = useState()
  const [btnable, setBtnable] = useState(true)
 
  const isDisabled = useSelector((state)=> state.isDisabled)
  const dispatch = useDispatch()
  function addExpense() {
dispatch(itemAction.addExpenses({itemName, price: parseInt(price) }))
setItemName("")
setPrice("")
  }

      useEffect(() => {
        if (!itemName || !price || itemName.trim().length <= 1) {
          setBtnable(!isDisabled);
        } else {
          setBtnable(isDisabled);
        }
      }, [itemName, price]);
  return (
    <>
  
    <h1 className="font-semibold text-[25px]">Add Expense</h1>
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-x-3 mx-3 grid-cols-1">
<div className="w-full">
  <label className="font-semibold text-[13px]">Name</label>
<input type="text" value = {itemName} maxLength = "10" className="px-2 w-[100%] rounded-md outline-none border border-[grey]" onChange={(event)=> setItemName(event.target.value)}/>
</div>

<div className="w-full">
<label className="font-semibold text-[13px]">Cost</label>
<input type="number"  value = {price} max = {2000}  className="px-2 w-[100%] rounded-md outline-none border border-[grey]" onChange={(event)=> setPrice(event.target.value)}/>
</div>

    </div> 
    <button className="text-white bg-[blue] px-2 py-1 rounded-md mt-3 ms-2" disabled = {isDisabled || btnable} onClick = {addExpense}>Save</button>
   
    </>
  )
}

export default Form