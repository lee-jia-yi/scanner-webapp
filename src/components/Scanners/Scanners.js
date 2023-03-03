import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import './Scanners.css'

function Scanners() {
 const { scanners } = useGlobalContext()
 const navigate = useNavigate()

 return (
  <div>
   <button className='scanners-btn' onClick={() => navigate('/')}>New Form</button>

   <div className='scanners_div'>
    <div className='scanners_info'>Scanners found: {scanners.length}
     <hr />
    </div>

    <div>
     <div className="table-header">
      <table>
       <thead>
        <tr>
         <th>Scanner Name</th>
         <th>IP Address</th>
         <th>Scanner Speed</th>
         <th>Status</th>

         <th></th>
        </tr>
       </thead>
      </table>
     </div>
     <div className="table-content">
      <table>
       <tbody>
        {scanners.map(({ ipAddress, isAvailable, scannerName, scannerSpeed }, idx) => {
         return (
          <tr key={idx}>
           <td>{scannerName}</td>
           <td>{ipAddress}</td>
           <td>{scannerSpeed}</td>
           <td>{isAvailable == 'true' ? 'Available' : 'Engaged'}</td>
           <td>
            <button className='scanners-btn' disabled={isAvailable == 'false'}>Connect</button>
           </td>
          </tr>
         )
        })}
       </tbody>
      </table>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Scanners

