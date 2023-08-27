import Image from 'next/image'
import Budget from "./components/Budget"
import ExpenseItems from "./components/ExpenseItems"
import Form from "./components/Form"
export default function Home() {
  return (
   <>
   <Budget />
   <ExpenseItems />
  <Form />
   </>
  )
}
