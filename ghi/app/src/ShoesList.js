import React, {useEffect, useState} from "react";
import "./index.css"

function ShoeColumn(props) {
  function deleteShoe(href)
  {
    fetch(`http://localhost:8080${href}`, {
      method: "DELETE"
    }).then((result)=>{
      result.json().then((resp)=>{
        window.location.reload(false)
   })
  })
  }
  return (
    <div className="col">
      {props.list.map(shoe => {
        console.log(props.list)
        return (
          <div key={shoe.href} className="card mb-3 shadow">
            <img src={shoe.shoe_url} className="card-img-top" />
            <div className="card-img-overlay d-flex flex-column align-text-bottom">
                <button className='btn-close' onClick={() => { window.confirm('Are you sure you wish to delete this hat?', ) && deleteShoe(shoe.href) } }></button>
              </div>
            <div className="card-body">
              <h5 className="card-title">{shoe.manufacturer}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {shoe.model_name}
              </h6>
              <p className="card-text">
                {shoe.color}
                {/* Located in {shoe.location.closet_name}, bin #{shoe.location.bin_number} */}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

class ShoesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShoeColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/shoes/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        const requests = [];
        for (let shoe of data.shoes) {
          const detailUrl = `http://localhost:8080${shoe.href}`;
          requests.push(fetch(detailUrl));
        }

        const responses = await Promise.all(requests);

        const ShoeColumns = [[], [], []];

        let i = 0;
        for (const shoeResponse of responses) {
          if (shoeResponse.ok) {
            const details = await shoeResponse.json();
            ShoeColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(shoeResponse);
          }
        }

        this.setState({ShoeColumns: ShoeColumns});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <h1>Shoes</h1>
          <div className="row">
            {this.state.ShoeColumns.map((ShoesList, index) => {
              return (
                <ShoeColumn key={index} list={ShoesList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default ShoesList;


// function ShoesList(props) {
//     return (
//         <table className="table table-striped">
//             <thead>
//                 <tr>
//                     <th>Manufacturer</th>
//                     <th>Model Name</th>
//                     <th>Color</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {props.shoes.map(shoe => {
//                     return (
//                         <tr key={shoe.href}>
//                             <td>{shoe.manufacturer}</td>
//                             <td>{shoe.model_name}</td>
//                             <td>{shoe.color}</td>
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     );
// }

// export default ShoesList;
