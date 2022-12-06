import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  //카트에 아이템을 추가하기
  if (action.type === 'ADD') {
    // 카트 전체 토탈 값 계산하기 =  현재 존재하는 토탈 값 + ( 새로운 아이템의 가격 * 새로운 아이템의 수량 )
    const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount)
        
    // 아이템 id를 사용하여 카트 배열에서 항목 인덱스 찾기
    // 동일한 id를 가진 항목이 이미 존재하는 경우에만 index가 반환되도록 한다 그렇지 않으면 -1 반환됨.
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
    
    // 인덱스 기반으로 CartItem 가져오기
    const existingCartItem = state.items[existingCartItemIndex]    
      
    let updatedItems;

    // existingCartItem은 아이템이 Cart에 이미 존재는 경우에만 객체를 가진다. 
    if(existingCartItem) {
    // 기존 항목 데이터 +  업데이트 금액/수량을 기존 수량 + 새 수량으로 확산하여 업데이트된 항목 생성
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      
      // 항목 배열의 복사본 만들기 및 기존 항목을 신규/업데이트된 항목으로 교체
      updatedItems = [...state.items]      
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      //항목이 카트에 아직 존재하지 않으면 해당 새 항목을 카트에 추가하기만 하면 된다.
      updatedItems = state.items.concat(action.item)
    }

// 업데이트된 항목 목록 및 총 금액으로 상태를 반환
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }



if(action.type === 'REMOVE') {
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.id)
    
    const existingItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingItem.price

    let updatedItems;
    if(existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1}
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
}

if(action.type === 'CLEAR'){
  return defaultCartState
 }


return defaultCartState;
};


const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type:'CLEAR'})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart:clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;