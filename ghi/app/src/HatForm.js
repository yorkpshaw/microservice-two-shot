import React from "react";

class HatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: '',
            fabric: '',
            color: '',
            location: '',
            locations: [],
            hasSubmit: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeStyle = this.handleChangeStyle.bind(this);
        this.handleChangeFabric = this.handleChangeFabric.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
    }


    async componentDidMount() {
        const url = "http://localhost:8100/api/locations";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ locations: data.locations });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        delete data.locations;
        delete data.hasSubmit;

        const locationURL = "http://localhost:8090/api/hats/";
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const hatResponse = await fetch(locationURL, fetchOptions);
        if (hatResponse.ok) {
            this.setState({
                style: '',
                fabric: '',
                color: '',
                location: '',
                hasSubmit: true,
            })
        }
    }

    handleChangeStyle(event) {
        const value = event.target.value;
        this.setState({ style: value })
    }

    handleChangeFabric(event) {
        const value = event.target.value;
        this.setState({ fabric: value })
    }

    handleChangeColor(event) {
        const value = event.target.value;
        this.setState({ color: value })
    }

    handleChangeLocation(event) {
        const value = event.target.value;
        this.setState({ location: value })
    }

    render () {
        let messageClasses = 'alert alert-primary d-none mb-0';
        let formClasses = '';
        if (this.state.hasSubmit) {
            messageClasses = 'alert alert-primary mb-0';
            formClasses = 'd-none';
            setTimeout(() => window.location.replace("http://localhost:3000/hats"), 2000);
        }

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new hat entry</h1>
                        <form className = {formClasses} onSubmit={this.handleSubmit} id="create-hat-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleChangeStyle} placeholder="Style" required type="text" name="style" id="style" className="form-control" />
                            <label htmlFor="style">Style</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleChangeFabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleChangeColor} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleChangeLocation} required name="location" id="location" className="form-select">
                            <option value="">Choose a location</option>
                            {this.state.locations.map(location => {
                                return (
                                <option key={location.href} value={location.href}>{location.closet_name}, section: {location.section_number}, shelf: {location.shelf_number}</option>
                                )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={messageClasses} id="success-message">
                            A hat has been added to your collection!
                            </div>
                    </div>
                    </div>
                </div>
        )
    }
}

export default HatForm;
