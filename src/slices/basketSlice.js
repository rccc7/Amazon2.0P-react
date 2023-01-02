import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions
    addToBasket: (state, action) => {
      //Spread operator: keep whatever is in the current state and append the new item
      //action.payload must contain a product object
      //Here, we don't call "state.items.push(action.payload)" because we should always 
      //make an inmutable update to an object, we should not mutate in react. 
      //Arrays and objects are mutable, and when we call push we are mutating the array
      //Instead of calling push we could call concat or use the spread operator 
      //which return a new copy of the array
      //See this explanation: https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      //search for the item's id in the array of products.
      //In this case, find the first occurence of the article that contains that Id
      const index = state.items.findIndex(
        basketItem => basketItem.id === action.payload.id);

      console.log('The id to remove>>>', action.payload.id)

      //Copy the current basket into a new array so that the changes will be automaticalle re-rendered
      let newBasket = [...state.items];
      if (index >= 0) {
        //The item exists in the basket, remove it.
        newBasket.splice(index, 1);
      }
      else {
        console.warn('Cant remove the product because it is not in the basket:>>', action.payload.id);
      }

      state.items = newBasket;
    },
    emptyBasket: (state, action) => {
      let newBasket = [];
      state.items = newBasket;
      // console.log('the new basket:>>', state.items)
    }
  },
});

export const { addToBasket, removeFromBasket, emptyBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((prev, curr) => prev + curr.price, 0);

export default basketSlice.reducer;
