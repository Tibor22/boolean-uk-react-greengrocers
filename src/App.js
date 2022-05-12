import './styles/reset.css'
import './styles/index.css'
import './styles/details.css'

import initialStoreItems from './store-items'
import StoreItems from './StoreItems'
import Cart from './Cart'
import { useState, useEffect } from 'react'
import { useFetch } from './useFetch'

/*
Here's what a store item should look like
{
  id: '001-beetroot',
  name: 'beetroot',
  price: 0.35
}

What should a cart item look like? 🤔


*/

console.log(initialStoreItems)

export default function App() {
  // Setup state here...

  const [storeItems, setStoreItems] = useState(initialStoreItems)
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [type, setType] = useState('all')
  const [sort, setSort] = useState()
  const [currItem, setCurrItem] = useState('')
  const [url, setUrl] = useState()
  const [imageUrl, setImageUrl] = useState()
  const { data } = useFetch(url)
  const { data: image } = useFetch(imageUrl)

  useEffect(() => {
    if (currItem) {
      setImageUrl(
        `https://api.unsplash.com/search/photos/?client_id=uhytsXNkP4woKLLbRMg-y7S_mMAR4hWBtvn3ut2a49k&query=${currItem}`
      )
      setUrl(
        `https://fit-life-food.p.rapidapi.com/nutrition/${
          currItem === 'eggplant' ? 'aubergine' : currItem
        }`
      )
    }
  }, [currItem])

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <form>
          <label>
            <span>Filter by type</span>
            <select
              onChange={e => setType(e.target.value)}
              name="type"
              id="type"
            >
              <option value="all">All</option>
              <option value="vegetable">Vegetables</option>
              <option value="fruit">Fruits</option>
            </select>
          </label>
        </form>
        <ul className="item-list store--item-list">
          <StoreItems
            setTotal={setTotal}
            cartItems={cartItems}
            setCartItems={setCartItems}
            storeItems={storeItems}
            total={total}
            type={type}
            setUrl={setUrl}
            setCurrItem={setCurrItem}
            setImageUrl={setImageUrl}
          />
        </ul>
      </header>
      <main>
        <div id="cart">
          <h2>Your Cart</h2>

          <div className="cart--item-list-container">
            <ul className="item-list cart--item-list">
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                setTotal={setTotal}
                sort={sort}
              />
            </ul>
          </div>

          <div className="total-section">
            <div>
              <h3>Total</h3>
            </div>
            <div>
              <span className="total-number">
                £{Math.abs(total.toFixed(2))}
              </span>
            </div>
          </div>
        </div>
        <form>
          <label>
            <span>Sort by</span>
            <select
              onChange={e => setSort(e.target.value)}
              name="sort"
              id="sort"
            >
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </label>
        </form>
        <div className="details">
          <div className="details-heading">
            <h2>{currItem.toUpperCase()}</h2>

            {image && <img src={image.results[0].urls.raw} alt="" />}
          </div>

          <ul className="details-container">
            {data &&
              Object.keys(data).map(obj => {
                return (
                  <li>
                    {obj} {data[obj]}
                  </li>
                )
              })}
          </ul>
        </div>
      </main>

      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}
// API KEY: uhytsXNkP4woKLLbRMg-y7S_mMAR4hWBtvn3ut2a49k
// secret key:hP97jiK3Mn-W8MJIyFKmlySZJ3VrLy60UjvHyowxqBg
