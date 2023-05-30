
'use client'

import Select from 'react-select'
import  React,{ useState, useRef , useMemo} from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs'


import makeAnimated from 'react-select/animated';
import TblFunc from '../../components/table2'
import styles from './page.module.css'


import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


let  options=[]
let selected=[]
let errorform=[]

const MyBarrios = ()=>{
     const paintmap = useMemo(()=>{return getData()}, [])
     async function getData() {
        try {  
            const response = await axios.get('/api/datos/territorio/barrios')
            options.splice(0,options.length);
            for (let index = 0; index < response.data.data.length; index++) {
                options.push({
                    label: response.data.data[index].nombre,
                    value: response.data.data[index].codbarrio
                })
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default function page(props) {
  const animatedComponents = makeAnimated();
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const inputCedula = useRef()
  const inputNombre = useRef()
  const inputEmail = useRef()
  const inputPassword= useRef()
  const inputAddress= useRef()
  const inputCelular = useRef()
  const selectRol = useRef()
  const inputOrg  = useRef()
  const selectOrgTipo = useRef()
  const selectBarrio = useRef(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    errorform.splice(0, errorform.length);
    selected.splice(0, selected.length )
    if (!selectedOption) { errorform.push('Debes seleccionar el Barrio') } else {
      for (let index = 0; index < selectedOption.length; index++) {
        selected.push({
          label: selectedOption[index].label,
          value: selectedOption[index].value
        })
      }
    }

    if (!selectRol.current.value || selectRol.current.value == 0) { setShow(true); errorform.push('Debes seleccionar el Rol') }
    if (!selectOrgTipo.current.value || selectOrgTipo.current.value == 0) { setShow(true); errorform.push('Debes seleccionar el Tipo de Organización') }
    
    const Cedula = inputCedula.current.value;
    const Nombre = inputNombre.current.value; 
    const Email= inputEmail.current.value; 
    const Password= await bcrypt.hash(inputPassword.current.value, 10)
    const Address= inputAddress.current.value; 
    const Celular = inputCelular.current.value;
    const SelectRol= selectRol.current.value; 
    const InputOrg= inputOrg.current.value; 
    const SelectOrgTipo= selectOrgTipo.current.value; 
    const SelectBarrio= selected;
    let setCredentials ={
      cedula: Cedula,
      nombre: Nombre,
      email: Email,
      pass:Password,
      adress: Address,
      celular : Celular,
      rol: SelectRol,
      org: InputOrg,
      tiporg: SelectOrgTipo,
      barrio: SelectBarrio
    }
    const respuesta = await axios.post('/api/liderazgo', setCredentials)
    if (respuesta.data) {
        let timerInterval;
        const MySwal = withReactContent(Swal)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        })
        Toast.fire({
          icon: 'info',
          title: 'Estamos procesando tú solicitud...',
        }).then(() => {
          return MySwal.fire({
            html: <p>Líder almacenado exitosamente!!!</p>,
            icon: 'success',
            iconColor: '#116D6E',
            confirmButtonColor: '#5C8984',
            confirmButtonText: 'Listo!!'
          }).then((result) => {
            if (result.isConfirmed) {
             inputCedula.current.value = '';
             inputNombre.current.value = '';
             inputEmail.current.value = '';
             inputPassword.current.value = '';
             inputAddress.current.value = '';
             inputCelular.current.value = '';
             selectRol.current.value = '';
             inputOrg.current.value = '';
             selectOrgTipo.current.value = '';
             selected.splice(0, selected.length)
             setSelectedOption([])
            }
          })
        })
      }
   }

  return (<>
    <ToastContainer position="bottom-center" className="p-4 " style={{ zIndex: 1 }}>
      <Toast  bg='danger'  onClose={() => setShow(false)} show={show} delay={5000} autohide>
        <Toast.Header>
          <img
            src="/img/j4data.png"
            className="rounded me-2"
            width={20}
            height={20}
            alt=""
          />
          <strong className="me-auto">Alerta!!!</strong>
          <small>* Campos requeridos</small>
        </Toast.Header>
        <Toast.Body className='text-white'>
          {errorform.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Toast.Body>
      </Toast>
    </ToastContainer>

    <div className="container">
      <form className="mt-4 shadow-lg P-4" onSubmit={handleSubmit}>
        <div className="row p-4">
          <div className="col-sm-12 col-md-12 text-center mt-2">
            <h1 className={styles.texto1}>Gestión Líderazgo Territorial</h1>
          </div>
          <div className="col-sm-12 mb-4 mt-2 p-2" >
            <header >
              <h1 className='mt-3'
                style={{ textAlign: 'center', fontSize: '16px', lineHeight: '18px', fontWeight: '800', color: '#00337C' }}>
                Anexar Líder
                <hr />
              </h1>
            </header>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <label for="inputCedula" className={styles.label1} >Cédula</label>
            <input
              type="number"
              min={0}
              className="form-control form-control-sm"
              id="inputCedula"
              name="inputCedula"
              required
              ref={inputCedula}
              // onChange={handleChange}
            />
            <div className={styles.subtitle}>Ingrese el número del documento sin puntos.</div>
          </div>

          <div className="col-sm-12 col-md-8">
            <label for="inputNombre" className={styles.label1} required > Nombre Líder</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="inputNombre"
              name='inputNombre'
              ref={inputNombre}
              required
              // onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label for="inputEmail" className={styles.label1} >Email</label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="inputEmail"
              name='inputEmail'
              ref={inputEmail}
              // onChange={handleChange}
              required />
          </div>
          <div className="col-md-6">
            <label for="inputPassword" className={styles.label1} >Password</label>
            <input
              type="password"
              className="form-control form-control-sm"
              id="inputPassword"
              name='inputPassword'
              ref={inputPassword}
              // onChange={handleChange}
              required />
          </div>
          <div className="col-12">
            <label for="inputAddress" className={styles.label1}>Dirección</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder=""
              id="inputAddress"
              name='inputAddress'
              ref={inputAddress}
              // onChange={handleChange}
              required />
          </div>

          <div className="col-md-6">
            <label for="inputCelular" className={styles.label1}>Celular</label>
            <input type="text" className="form-control form-control-sm"
              id='inputCelular'
              name='inputCelular'
              ref={inputCelular}
              // onChange={handleChange} 
              required />
          </div>
          <div className="col-md-6">
            <label className={styles.label1} required>Rol</label>
            <select
              className="form-control form-select-sm"
              id='selectRol'
              name='selectRol'
              ref={selectRol}
              // onChange={handleChange}
              required
            >
              <option value={0} selected>Seleccione...</option>
              <option value={2}>Líder</option>
              <option value={3}>Testigo</option>
            </select>
          </div>
          <div className="col-md-12">
            <MyBarrios />
            <div className='row'>
              <div className="col-sm-12 mt-2">
                <label for="exampleDataList" className={styles.label1}>Seleccione el barrio</label>
                <Select
                  name='selectBarrio'
                  value={selectedOption}
                  // ref={selectBarrio}
                  onChange={setSelectedOption}
                  components={animatedComponents}
                  options={options}
                  placeholder={'Seleccione el barrio'}
                  isMulti
                  isClearable
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row p-4">
          <div className="col-sm-8">
            <label for="inputAddress" className={styles.label1}>Anexar Organización</label>
            <input type="text" className="form-control" placeholder="Ingrese el nombre de la corporación u entidad a la que pertenece el líder"
              id='inputOrg'
              name='inputOrg'
              ref={inputOrg}
              // onChange={handleChange} 
              required
              />
          </div>
          <div className="col-md-4">
            <label for="selectOrgTipo" className={styles.label1}>Tipo de Organización</label>
            <select
             id="selectOrgTipo"
             name='selectOrgTipo'
             ref={selectOrgTipo}
            //  onChange={handleChange}
              className="form-select">
              <option value={0} selected>Seleccione...</option>
              <option value={1}>Social</option>
              <option value={2}>Religiosa</option>
              <option value={3}>Politica</option>
              <option value={4}>Deportiva</option>
            </select>
          </div>
        </div>
        <hr />
        <div className="d-grid gap-2 col-6 mx-auto p-4">
          <button className="btn " type="submit" style={{ background: '#301E67', color: 'white' }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-check-fill" viewBox="0 0 16 16">
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
            </svg> &nbsp;
            Guardar</button>
        </div>
      </form>
      <div className="row">
        <div className='col-sm-12 col-md-12 col-lg-12 mt-4'>
          <br /><hr />
          <TblFunc />
        </div>
      </div>
    </div>
  </>
  )
}