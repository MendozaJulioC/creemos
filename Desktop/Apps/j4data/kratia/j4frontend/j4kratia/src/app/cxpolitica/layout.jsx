import TablaContentJ4 from '../components/MenuVertical/MenuVerticalJ4'

export const metadata ={
    title:"Cx KratiAnalitik"
  }
  
const DateoLayout = ({children}) => {
  return (
    <div className="container mt-4 py-4">
     <TablaContentJ4 />


        {children}
    </div>
  )
}

export default DateoLayout