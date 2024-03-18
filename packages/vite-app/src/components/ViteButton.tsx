import { useState } from "react"

export default function ViteButton() {
  const [count, setCount] = useState(0)
  return <button type="button" onClick={() => setCount(count + 1)}>Button from vite: {count}</button>
}
