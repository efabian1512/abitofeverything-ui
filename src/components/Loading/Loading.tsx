import './Loading.css';

const Loading = ({backDrop = true, wholePage = true}: {backDrop?: boolean, wholePage?: boolean} )=> {
return <>
  <div className={`spinner-border ${wholePage ? 'whole-page-spinner': ''}`} role="status">
    <span className="sr-only"></span>
  </div>
  {backDrop && <div className="modal-backdrop show fade"></div>}
</>
}

export default Loading;