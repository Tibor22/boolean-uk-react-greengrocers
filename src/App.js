import './styles/reset.css'
import './styles/index.css'

import initialStoreItems from './store-items'
import StoreItems from './StoreItems'
import Cart from './Cart'
import { useState } from 'react'
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
  const [url, setUrl] = useState(
    'https://fit-life-food.p.rapidapi.com/nutrition/apple'
  )

  const { error, isPending, data } = useFetch(url)

  console.log(data)

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
        <div className="detail">
          <h2>Some heading</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            similique dolore laborum eos porro quod veniam eaque molestias
            consequatur sapiente laudantium asperiores ducimus sint est ipsam, a
            qui. Veniam, eaque?
          </p>
          <img src="" alt="" />
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
