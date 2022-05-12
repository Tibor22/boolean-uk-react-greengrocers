import StoreItem from './StoreItem'

export default function StoreItems({
  storeItems,
  setCartItems,
  cartItems,
  setTotal,
  total,
  type
}) {
  return (
    <>
      {storeItems.map(item => {
        return (
          (type === item.type || type === 'all') && (
            <StoreItem
              cartItems={cartItems}
              setCartItems={setCartItems}
              key={item.id}
              item={item}
              setTotal={setTotal}
              total={total}
              type={type}
            />
          )
        )
      })}
    </>
  )
}
