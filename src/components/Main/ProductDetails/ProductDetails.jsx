import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ProductDetails() {

  let { id } = useParams();

  const [detailsData, setDetailsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resDetails = await axios.get(`https://itx-frontend-test.onrender.com/api/product/${id}`)
      setDetailsData(resDetails.data)

    }
    fetchData()
  }, [])
  

  return (
    <div></div>
  )
}

export default ProductDetails
