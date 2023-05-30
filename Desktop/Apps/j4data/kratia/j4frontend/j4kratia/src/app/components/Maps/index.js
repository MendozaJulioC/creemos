import dynamic from "next/dynamic";

const Map = dynamic(() => import('./MapMain'), {
    ssr: true
})

export default Map;