import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useGlobalContext } from '../../context'
import { getScanners, postForm } from '../../services'
import './Form.css'

function Form() {

  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})

  const { setScanners } = useGlobalContext()

  const navigate = useNavigate();

  const projectName = React.useRef('')
  const scanningMode = React.useRef('')
  const scanDimensionsX = React.useRef('')
  const scanDimensionsY = React.useRef('')
  const scannerFreq = React.useRef('')

  const validScanningMode = [
    'GANTRY',
    'CRAWLER',
    'AUTO',
    'MANUAL',
    'ARM'
  ]

  function validateField(value, field_id) {
    switch (field_id) {
      case 'projectName': {
        if (value.length < 3) {
          setErrorMsg({
            ...errorMsg,
            projectName: 'Project Name has to be more than 3 characters.'
          })
        } else {
          setErrorMsg({
            ...errorMsg,
            projectName: null
          })
        }
        return;
      }
      case 'scanningMode':
        if (validScanningMode.indexOf(value) == -1) {
          setErrorMsg({
            ...errorMsg,
            scanningMode: 'Scanning Mode is invalid'
          })
        } else setErrorMsg({
          ...errorMsg,
          scanningMode: null
        })
        return;

      case 'scanDimensionsX':
        if (Number(value) < 1) {
          setErrorMsg({
            ...errorMsg,
            scanDimensionsX: 'Dimensions needs to be >= 1'
          })
        } else setErrorMsg({
          ...errorMsg,
          scanDimensionsX: null
        })
        return;

      case 'scanDimensionsY':
        if (Number(value) < 1) {
          setErrorMsg({
            ...errorMsg,
            scanDimensionsY: 'Dimensions needs to be >= 1'
          })
        } else setErrorMsg({
          ...errorMsg,
          scanDimensionsY: null
        })
        return;

      case 'scannerFreq':
        if (Number(value) < 1) {
          setErrorMsg({
            ...errorMsg,
            scannerFreq: 'Scanner Frequency needs be >= 1'
          })
        } else if (String(value).indexOf('.') == -1 ||
          String(value).split('.')[1].length !== 1) {
          setErrorMsg({
            ...errorMsg,
            scannerFreq: 'Scanner Frequency needs be in 1 decimal place'
          })
        } else setErrorMsg({
          ...errorMsg,
          scannerFreq: null
        })
        return;
    }
  }

  useEffect(() => {
    let errorDetected = false
    if (Object.keys(errorMsg).length !== 4) {
      errorDetected = true
    }
    Object.values(errorMsg).map((val) => {
      if (val !== null) {
        errorDetected = true
        return;
      }
    })
    setError(errorDetected)
  }, [errorMsg])

  const submitForm = async (searchParams) => {
    try {
      postForm(searchParams)
        .then(() => {
          getScanners()
            .then((data) => {
              setScanners(data)
              navigate('/scanners')
            })
        })
    } catch (err) {
      console.log(err)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const searchInputs = {
      projectName: projectName.current.value,
      scanningMode: scanningMode.current.value,
      scanDimensionsX: Number(scanDimensionsX.current.value),
      scanDimensionsY: Number(scanDimensionsY.current.value),
      scannerFrequency: Number(scannerFreq.current.value),
    }
    submitForm(searchInputs);
  }
  return (
    <div className='form-div'>
      <form className='search-form'
        onSubmit={handleSubmit}
      >
        <div className='form-control'>
          <div className='field'>
            <label>Project Name</label>
            <br />
            <input
              type='text'
              id='projectName'
              ref={projectName}
              onChange={(e) => validateField(e.target.value, 'projectName')}
            />
            {errorMsg.projectName && <div className='error'>{errorMsg.projectName}</div>}
          </div>

          <div className='field'>
            <label>Scanning Mode</label>
            <br />
            <select id='scanningMode' ref={scanningMode}>
              {validScanningMode.map((mode) =>
                <option key={mode} value={mode}>{mode}</option>
              )}
            </select>

            {errorMsg.scanningMode && <div className='error'>{errorMsg.scanningMode}</div>}

          </div>

          <div className='field'>
            <label>Scan Dimensions (in cm):</label>
            <div className='dimensions-field'>
              <div>
                <label>X</label>
                <input
                  type='number'
                  id='scanDimensionsX'
                  ref={scanDimensionsX}
                  onChange={(e) => validateField(e.target.value, 'scanDimensionsX')}
                />
                {errorMsg.scanDimensionsX && <div className='error'>{errorMsg.scanDimensionsX}</div>}
              </div>
              <div>
                <label>Y</label>
                <input
                  type="number"
                  id='scanDimensionsY'
                  ref={scanDimensionsY}
                  onChange={(e) => validateField(e.target.value, 'scanDimensionsY')}
                />
                {errorMsg.scanDimensionsY && <div className='error'>{errorMsg.scanDimensionsY}</div>}
              </div>
            </div>
          </div>

          <div className='field'>
            <label>Scanner Frequency</label>
            <br />
            <input
              type="number"
              step={0.1}
              id='scannerFreq'
              ref={scannerFreq}
              onChange={(e) => validateField(e.target.value, 'scannerFreq')}
            />

            {errorMsg.scannerFreq && <div className='error'>{errorMsg.scannerFreq}</div>}
          </div>
        </div>

        <button  className='submit-btn' type='submit' disabled={error}>scan</button>
      </form >
    </div >
  )
}

export default Form
