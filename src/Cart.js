import CartItem from './CartItem'

export default function Cart({ cartItems, setCartItems, setTotal, sort }) {
  if (sort === 'name') {
    setCartItems(
      cartItems.sort(function (a, b) {
        return a.name.localeCompare(b.name)
      })
    )
  }
  if (sort === 'price') {
    setCartItems(
      cartItems.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity))
    )
  }
  return (
    <>
      {cartItems.map(item => {
        return (
          <CartItem
            key={item.id}
            cartItems={cartItems}
            setCartItems={setCartItems}
            item={item}
            setTotal={setTotal}
          />
        )
      })}
    </>
  )
}
