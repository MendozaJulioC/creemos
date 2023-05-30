'use client'
import { useMemo, useRef , useEffect} from 'react';
import axios from "axios"
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.ocean";
import { getDateIntervalDuration } from '@amcharts/amcharts5/.internal/core/util/Time';
// Resolves charts dependancy
Charts(FusionCharts ,ReactFusioncharts, FusionTheme);
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

let datasource =[]
let colorbarra;
async function getData(){
  try {
    const respuesta =   await axios.get('/api/cxpolitica/totalesvotos');
    datasource.splice(0, datasource.length )
    respuesta.data.data.forEach(element => {
     if(element.vigecnia=='2022'){colorbarra="#116D6E"}else{colorbarra="#F79327"}
   
      datasource.push({
      label: (element.vigecnia).toString(),
      value: element.votos,
      color:  colorbarra
     
      })
    });
  } catch (error) {
    console.error('Error ');
  }
}

function ChartCxPolitica() {

  useEffect(()=>{
    getData()
   }, [])

  // const datostotalesvot = useMemo(()=>{ return getData() ,[datasource]})




const dataSource = {
  chart: {
    caption: "Total votos por Elección",
    yaxisname: "Nuúmero de votos total por Elección",
    subcaption: "2011-2022",
 
    drawanchors: "0",
    showvalues: "1",
    plottooltext: "<b>$dataValue</b> votos sold in $label",
    theme: "ocean",
    formatnumberscale: "0",
    decimalSeparator: ".",
    valuefontsize: "18",
    labelfontsize: "12"
 
   
  },
  data: datasource
};


    return (
      <ReactFusioncharts
         type="column2d"
         width={'100%'}
         height={300}
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }


export default ChartCxPolitica; 