'use client'
import React,{useEffect, useState} from 'react'
import {AiFillCloseCircle} from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux'
import { itemAction } from '@/redux/store'

function ExpenseItems() {
  const dispatch = useDispatch()
  const items = useSelector((state)=> state.items)
  const total = useSelector((state)=>state.total)
  const [searchInput, setSearchInput] = useState('')
  const [filteredItem, setFilteredItem] = useState(items)

  const exceed = useSelector((state)=> state.budgetExceeded)
  const isDisabled = useSelector((state)=> state.isDisabled)
  useEffect(() => {
    if (searchInput.trim() === '') {
      // If search input is empty, show all items
      setFilteredItem(items);
    } else {
      // If search input is not empty, filter items
      const filteredItems = items.filter((item) =>
        item.itemName.toLowerCase().includes(searchInput && searchInput.toLowerCase())
      );
      setFilteredItem(filteredItems);
    }
  }, [items, searchInput]);
  useEffect(()=> {
    dispatch(itemAction.exceededBudget())
    
      })
  return (
    <div className="my-8">
       <h1 className="text-[22px] font-bold">Expenses</h1> 
      <input type="text" onChange = {(event)=> setSearchInput(event.target.value)}  placeholder='Type to Search' className="px-1 rounded-xl outline-none w-[80%] py-1 mx-3 border focus:border-[grey]"/>
       <div className=" mx-3 rounded-lg mt-5 border flex flex-col divide-y-[1px] space-y-2">
{filteredItem.map((item)=> {
  return <div key = {item.id} className="flex items-center justify-between px-2 py-2">
  <h1>{item.itemName}</h1>
  <div className="flex space-x-2 items-center"><h1>${item.price}</h1><AiFillCloseCircle onClick = {()=> {dispatch(itemAction.removeItem({id:item.id}))}} className="cursor-pointer text-[25px]"/></div>
  </div>
})}

<div className="flex justify-between mx-2"><h2 className="font-bold text-[25px]">Total</h2> <div className="font-bold text-[25px]">${total}</div></div>


       </div>
   {exceed?   <div className="text-[red] font-bold text-center">Expense budget Exceeded</div>: null}
       </div>
  )
}

export default ExpenseItems