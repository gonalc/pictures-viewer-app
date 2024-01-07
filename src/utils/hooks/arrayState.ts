import { useState } from "react"

const useArrayState = <T>(initialValue: T[] = []) => {
    const [value, setValue] = useState<T[]>(initialValue)

    const addItem = (item: T) => {
        setValue(previous => [...previous, item])
    }

    const removeItem = (index: number) => {
        setValue(previous => {
            const items = [...previous]

            items.splice(index, 1)

            return items
        })
    }

    const updateItem = (item: T, index: number) => {
        setValue(previous => {
            const items = [...previous]

            items.splice(index, 1, item)

            return items
        })
    }

    return [value, {
        addItem,
        removeItem,
        updateItem
    }] as const
}

export default useArrayState
