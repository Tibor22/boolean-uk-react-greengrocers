export default function CartItem({ item, setCartItems, setTotal }) {
  const add = (itemName, itemPrice) => {
    setTotal(prevTotal => (prevTotal += itemPrice))
    setCartItems(prevItems =>
      prevItems.map(item => {
        return item.name === itemName
          ? { ...item, item: item.quantity++ }
          : item
      })
    )
  }
  const remove = (itemName, itemPrice) => {
    setTotal(prevTotal => (prevTotal -= itemPrice))
    setCartItems(prevItems => {
      prevItems = prevItems.filter(item => item.quantity > 0)
      return prevItems.map(item =>
        item.name === itemName ? { ...item, item: item.quantity-- } : item
      )
    })
  }

  return (
    <li>
      <img
        className="cart--item-icon"
        src={`assets/icons/${item.id}.svg`}
        alt={`${item.name}`}
      />
      <p>{item.name}</p>
      <button
        onClick={() => remove(item.name, item.price)}
        className="quantity-btn remove-btn center"
      >
        -
      </button>
      <span className="quantity-text center">{item.quantity}</span>
      <button
        onClick={() => add(item.name, item.price)}
        className="quantity-btn add-btn center"
      >
        +
      </button>
    </li>
  )
}
