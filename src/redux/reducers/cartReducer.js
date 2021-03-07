import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      //üründaha onceden eklenmişsse quantitiysini arttıracagız
      var addedItem = state.find(
        c => c.product.id === action.payload.product.id
      ); //statein icerisinde bul. her bir sepet elemanı ıcın cnın producktının ıdsı parametre olarak gonderılen aksıyondan payload olarak gonderılen urune esıtse addedItema at.(payloaddan gelen utrun daha once sepette car mı)
      if (addedItem) {
        //eger listede addedItem varsa
        var newState = state.map(cartItem => {
          //reduxta arrayın refansını degıstırmelıyız state degıstırmek ıcın. map= arrayı gezeriz gezerken yeni array olustururuz
          if (cartItem.product.id === action.payload.product.id) {
            //addedItema denk gelen urunu bul quantitysini degistir
            return Object.assign({}, addedItem, {
              //{copy},parametremiz,yapmamız gereken şey.
              quantity: addedItem.quantity + 1,
            });
          }
          return cartItem; //map icinde yazıyoruz ki state.map bir arrayı gezerken her returnda hepsini bir arrayde toplar newState e atar.
        });
        return newState; // stateimiz için newStatei dondurduk
      } else {
        //sepette eleman yoksa
        return [...state, { ...action.payload }]; //...state:statein bir kopyasını al, o kopyaya action ile gelen payloadı ekle. arrayın kopyasını alıp ekliyoruz. reduxta push pop yapmıyoruz.
      }

    case actionTypes.REMOVE_FROM_CART:
      const newState2 = state.filter(
        cartItem => cartItem.product.id !== action.payload.id //id farklıysa onları filtrele. farklı olanları parametreyle gonderılen id den farklı olanları yeni bir array yap
      );
      return newState2;
    default:
      return state;
  }
}
