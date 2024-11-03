import { useState, useEffect } from "react"


export default function ScrollIndicator({url}) {

    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const [errorMessage, setErrormessage] = useState('')

    async function fetchData(getUrl) {
        try {
            setloading(true)
            const response = await fetch
            
        } catch (e) {
            console.log(e);
            setErrormessage(e.Message)
            
        }
    }

    useEffect(() => {
        fetchData(url)
    }, [url])
    

  return (
    <div>



    </div>
  )
}
