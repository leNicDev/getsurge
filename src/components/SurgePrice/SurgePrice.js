import { useEffect, useState } from "react";
import { getSurgePriceInBnb } from "../../common/price";

export default function SurgePrice() {
    const [price, setPrice] = useState(Number(0))
    
    useEffect(() => {
        (async () => {
            const currentPrice = await getSurgePriceInBnb()
            setPrice(Number(1 / currentPrice))
        })()
    }, [])

    return <div>
        <h1>{price.toFixed(20).replace(/\.?0+$/,"")}</h1>
    </div>
}