export default function StoreItem({
  item,
  setCartItems,
  setTotal,
  total,
  setUrl,
  setCurrItem,
  setImageUrl
}) {
  const addToCart = newItem => {
    setUrl(
      `https://fit-life-food.p.rapidapi.com/nutrition/${
        newItem.name === 'eggplant' ? 'aubergine' : newItem.name
      }`
    )
    setCurrItem(newItem.name)
    setImageUrl(
      `https://api.unsplash.com/search/photos/?client_id=uhytsXNkP4woKLLbRMg-y7S_mMAR4hWBtvn3ut2a49k&query=${newItem.name}`
    )
    setCartItems(prevArray => {
      if (prevArray?.some(item => item.id === newItem.id)) return prevArray
      setTotal(total + item.price)
      return [...prevArray, newItem]
    })
  }

  return (
    <li key={item.id}>
      <div className="store--item-icon">
        <img src={`/assets/icons/${item.id}.svg`} alt={`${item.name}`} />
      </div>
      <button
        onClick={() =>
          addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
          })
        }
      >
        Add to cart
      </button>
    </li>
  )
}
