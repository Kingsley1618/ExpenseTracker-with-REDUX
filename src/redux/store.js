import { configureStore, createSlice } from '@reduxjs/toolkit'



const initialState = {
    items : [],
    total : 0,
    budget : 0,
    budgetRemain:0,
    isDisabled : false,
  budgetExceeded : false
}

const itemSlice = createSlice({
    name : "items",
    initialState,
reducers: {
    addExpenses(state,action) {
        const newItems = {
            itemName : action.payload.itemName,
            id:Math.random(),
            price : action.payload.price
        }

        if (state.total + newItems.price > state.budget) {
            state.isDisabled = true;
            state.budgetExceeded = true;
            return;
          } else {
            state.budgetExceeded  = false
          }



const existingItem = state.items.find((item)=> item.name)
if(!existingItem) {
        state.items = [...state.items, newItems]
    }
    },
    removeItem(state,action) {
state.items = state.items.filter(val=> val.id !== action.payload.id)
    },
    calculateTotal(state,action){
   const totalPrice =  state.items.reduce((item, val)=> 
 item + val.price,
    0)
    state.total = totalPrice
    },
    RemainingTotal(state,action) {
        state.budgetRemain = state.budget - state.total
    },
    updateBudget(state,action) {
        state.budget = action.payload.newBudget
    },
    exceededBudget(state,action) {
        if(state.total > state.budget) {
state.isDisabled = true
if(state.items.length > 0) {
    
state.items.pop()
}
        } else {
            state.isDisabled = false
        }
        
    }
}
})


export const store = configureStore({
reducer : itemSlice.reducer,


})

export const itemAction = itemSlice.actions