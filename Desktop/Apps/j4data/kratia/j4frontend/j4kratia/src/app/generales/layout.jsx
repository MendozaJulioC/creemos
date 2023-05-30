
import TablaContentdateo from '../components/MenuVertical/MenuVertical'


export const metadata ={
    title:"Medellín en Datos"
  }


const DateoLayout = ({children}) => {
  return (

    <div className="containe-fluid mt-4 py-3 px-1">

          <TablaContentdateo />

   
        {children}
    </div>
  )
}

export default DateoLayout