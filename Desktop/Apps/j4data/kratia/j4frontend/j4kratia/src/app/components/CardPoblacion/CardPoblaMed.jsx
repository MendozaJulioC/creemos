'use client'
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function CardPoblacionMed({ vigencia , yearquery, hombres, mujeres, porcHombres, porcMujeres}) {
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 0
      })
     return (
        <>  <div className="row  mt-2 p-2">
                {/* <h1  style={{ textAlign: 'center', fontSize: '38px', lineHeight: '28px', fontWeight: '700', color: '#4C6793' }} className="text-center">{vigencia}</h1> */}
                <div className='col-sm-12 col-md-12 col-lg-4 p-1 text-center"' >
                    <div className="border border-2  rounded-top shadow-lg border-radies mb-2 py-1 text-center" >
                        <img
                            src='/img/prs3.svg'
                            // style={{ borderRadius: '50%' }}
                            width={150}
                            height={150}
                            className='mt-2'
                        />
                        <div className="card-body  text-center mb-2 mt-4">
                            <h1 style={{ textAlign: 'center', fontSize: '24px', lineHeight: '18px', fontWeight: '600', color: '#8BBCCC' }}>Población Total</h1>  <span>{vigencia} </span> <hr />
                            <h1 style={{ textAlign: 'center', fontSize: '28px', lineHeight: '18px', fontWeight: '600', color: '#8BBCCC' }}>{formatter.format((yearquery))} </h1>
                            {/* number2.toLocaleString(undefined, {maximumFractionDigits:2}) // "1,234.57"    <span>falta agregar base de datos poblacion colombia por vigencia</span>*/}
                        </div>
                        <div className="card-footer  text-center mb-2 mt-4 p-2">
                            <div className="row">
                                {/* <div className='col-sm-6 col-md-6 col-lg-6  text-center"' >
                                    <p > Colombia <b>52.215.503</b> </p>
                                </div> */}
                                <div className='col-sm-6 col-md- col-lg-6 "' >
                                    {/* <span><ProgressBar variant="primary" animated now={25} label='5.08%' style={{ height: '25px', fontSize: '18px' }} /></span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-sm-12 col-md-12 col-lg-4 p-1  text-center' >
                    <div className="border border-2  rounded-top shadow-lg border-radies mb-2 py-1" >
                        <img
                            src='/img/man.svg'
                            // style={{ borderRadius: '50%' }}
                            width={140}
                            height={140}
                            className='mt-2'
                        />
                        <div className="card-body  text-center mb-2 mt-3">
                            <h1 style={{ textAlign: 'center', fontSize: '24px', lineHeight: '18x', fontWeight: '600', color: '#4C6793' }}>Hombres</h1>  <span>{vigencia} </span><hr />
                            <h1 style={{ textAlign: 'center', fontSize: '28px', lineHeight: '18px', fontWeight: '600', color: '#4C6793' }}>{formatter.format((hombres))}</h1>
                        </div>
                        <div className="card-footer  text-center mb-2 mt-4 px-4">
                            <ProgressBar variant="info" animated now={porcHombres } label={`${porcHombres}%`} style={{ height: '22px', fontSize: '18px' }} />
                        </div>
                    </div>
                </div>

                <div className='col-sm-12 col-md-12 col-lg-4 p-1 text-center' >
                    <div className="border border-2  rounded-top shadow-lg border-radies mb-2 py-1" >
                            <img
                                src='/img/woman.svg'
                                // style={{ borderRadius: '50%' }}
                                width={150}
                                height={150}  
                                className='mt-2'
                            />
                            <div className="card-body  text-center mb-2 mt-3">
                                <h1 style={{ textAlign: 'center', fontSize: '24px', lineHeight: '18px', fontWeight: '600', color: '#5C2E7E' }}>Mujeres</h1>  <span>{vigencia} </span><hr />
                                <h1 style={{ textAlign: 'center', fontSize: '28px', lineHeight: '18px', fontWeight: '600', color: '#5C2E7E' }}>{formatter.format((mujeres))}</h1>
                            </div>
                            <div className="card-footer  text-center mb-2 mt-4 px-4">
                                <ProgressBar variant="warning" animated now={porcMujeres} label={`${porcMujeres}%`} style={{ height: '22px', fontSize: '18px' }} />
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}