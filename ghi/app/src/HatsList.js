import React from 'react'
import "./index.css"

function HatColumn(props) {
    function deleteHat(href) {
        fetch(`http://localhost:8090${href}`, {method: "DELETE"}).then((result)=>{
            result.json().then((resp)=>{
                window.location.reload(false)
        })
        })
    }
    return (

      <div className="col">
        {props.list.map(hat => {
          return (
            <div key={hat.href} className="card mb-3 shadow">
              <img src={hat.picture_url} className="card-img-top" />
              <div className="card-img-overlay d-flex flex-column align-text-bottom">
                <button className='btn-close' onClick={() => { window.confirm('Are you sure you wish to delete this hat?', ) && deleteHat(hat.href) } }></button>
              </div>
              <div className="card-body">
                <h5 className="card-title">{hat.style}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {hat.fabric}
                </h6>
                <p className="card-text">
                  {hat.color}
                  <p>Located in {hat.location.closet_name}, section {hat.location.section_number}, shelf {hat.location.shelf_number}</p>
                </p>
              </div>
            </div>
          );
        })}
    </div>
        )
    }

class HatsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          hatColumns: [[], [], []],
          isHovering: false,
        };
      }


      async componentDidMount() {
        let url = 'http://localhost:8090/api/hats';

        try {
          const response = await fetch(url);
          if (response.ok) {
            // Get the list of hats
            const data = await response.json();

            // Create a list for all the requests and
            // add all of the requests to it
            const requests = [];
            for (let hat of data.hats) {
              const detailUrl = `http://localhost:8090${hat.href}`;
              requests.push(fetch(detailUrl));
            }

            // Wait for all of the requests to finish
            // simultaneously
            const responses = await Promise.all(requests);

            // Set up the "columns" to put the hat
            // information into
            const hatColumns = [[], [], []];

            // Loop over the hat detail responses and add
            // each to to the proper "column" if the response is
            // ok
            let i = 0;
            for (const hatResponse of responses) {
              if (hatResponse.ok) {
                const details = await hatResponse.json();
                hatColumns[i].push(details);
                i = i + 1;
                if (i > 2) {
                  i = 0;
                }
              } else {
                console.error(hatResponse);
              }
            }

            // Set the state to the new list of three lists of
            // hats
            this.setState({hatColumns: hatColumns});
          }
        } catch (e) {
          console.error(e);
        }
      }

      render() {


        return (
          <>
            <div className="container">
              <h2>Hats List</h2>
              <div className="row">
                {this.state.hatColumns.map((hatList, index) => {
                  return (
                    <HatColumn key={index} list={hatList} />
                  );
                })}
              </div>
            </div>
          </>
        );
      }
    }
export default HatsList;
