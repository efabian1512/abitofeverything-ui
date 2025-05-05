import { useState } from "react";

const PriceFilter = () => {
    
     const [isThereAPriceFilter, setIsThereAPriceFilter] = useState<boolean>(false);
    return (
           <form>
                  <div className="form-group">
                    <label htmlFor="from">
                      De
                    </label>
                     <div className="input-group">
                    <span className="input-group-text">$</span>
                       <input className="form-control" id="from" type="number"/>
                  </div>
                     
                  </div>
                  <label htmlFor="to">
                    A
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                       <input className="form-control" id="to" type="number"/>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1 mt-5">
                    <button style={{width: '10rem'}} type="submit" className="btn btn-primary">Filtrar</button>
                    <button disabled={!isThereAPriceFilter} style={{width: '10rem'}}  type="button" className=" btn btn-danger">Deshacer filtro</button>
                    </div>
                    </form>
    )
}

export default PriceFilter;

