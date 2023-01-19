import axios from 'axios'
import React from 'react'
import ToySidebar from '@/components/ToySidebar'
import { Grid,Box } from '@chakra-ui/react'
import ProductItems from '@/components/ProductItems'
const boys = ({initialData}) => {
  const [data,set_data]= React.useState(initialData)
  
// function for sort by price
 const OrderPrice=async(order)=>{
let res =  await axios.get(`http://localhost:8080/toys?_sort=price&_order=${order}`)
console.log(res.data)
set_data(res.data)
 }

 // function for sort by discount
 const OrderDiscount=async(order)=>{
  let res =  await axios.get(`http://localhost:8080/toys?_sort=discount&_order=${order}`)
  console.log(res.data)
  set_data(res.data)
   }



  // function for filtering by price
  const FilterPrice=async(lowerRange,higherRange)=>{
    let res =  await axios.get(`http://localhost:8080/toys?price_gte=${lowerRange}&price_lte=${higherRange}`)
    console.log(res.data)
    set_data(res.data)
     }

     // function for filtering by category

     const FilterCategory=async(query)=>{
      let res =  await axios.get(`http://localhost:8080/toys?q=${query}`)
      console.log(res.data)
      set_data(res.data)
       }
 
  return (
    <Box display="flex" w={{base:"100%",sm:"100%", md:"80%"}} m="auto">
    <Box w={{base:"30%", sm:"30%",md:"20%"}}>
      <ToySidebar OrderPrice={OrderPrice} OrderDiscount={OrderDiscount} FilterPrice={FilterPrice} FilterCategory={FilterCategory}/>
    </Box>
    <Box w={{base:"70%", sm:"70%",md:"80%"}}>
    <Grid templateColumns={{base:'repeat(1, 1fr)',sm:'repeat(2, 1fr)',md:'repeat(3, 1fr)'}} gap={{base:0,sm:2,md:6}} w={{base:"100%",sm:"100%",md:"100%"}}>
    {data.map((el,id)=> <ProductItems key={id} title={el.title} price={el.price} image={el.img} mrp={el.mrp} id={el.id} discount={el.discount} lft={el.lft} />)
}
        </Grid>
        </Box>
        </Box>
  )
}

export default boys

export async function getStaticProps(){
    let response = await axios.get("http://localhost:8080/toys")
    return {
        props:{
        initialData: response.data
        }
      }
}