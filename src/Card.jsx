import React from "react"
export function Card({data,id,handleDeleteTodo,handleStatusChange,handleEditTodo}) {
  return (
    <div>
      <div className="col-12 col-md-6 col-lg-3 mb-4" > 
        <div
          class="card  d-flex flex-wrap g-5 mb-4 h-100 text-start m-4 m "
          style={{ width: "24rem", backgroundColor: "#b9f6ca" }}
        >
          <div class="card-body">
            <p class="card-title">Name :&nbsp; {data.name}</p>
            <p class="card-text">
            Description :&nbsp; {data.description}
            </p>
            <p className="m-0 d-inline">
              <label htmlFor="dropDown">Status : &nbsp;</label>
            </p>
            <div className="dropdown d-inline">
              <button
                class={`btn dropdown-toggle ${data.status==="Completed" ? 'btn-success' : 'btn-danger'}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
               {data.status}
              </button>

              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={()=>handleStatusChange('Completed',data.id)}>Completed</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={()=>handleStatusChange('Not Completed',data.id)}>Not Completed</button>
                </li>
              </ul>
            </div>
            <div className="card-footer bg-transparent border-top-0 mt-3 d-flex justify-content-end">
                <button className="btn btn-success me-3 px-4" onClick={()=>{handleEditTodo(data.id,data.name,data.description)}}>Edit</button>
                <button className="btn btn-danger px-3" onClick={()=>{handleDeleteTodo(data.id)}}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
