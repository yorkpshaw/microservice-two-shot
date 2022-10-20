import React from 'react';


class ShoeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturer: '',
            model_name: '',
            color: '',
            bin: '',
            bins: [],
            hasSignedUp: false,
        };
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleModelNameChange = this.handleModelNameChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleBinChange = this.handleBinChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.bins;
        delete data.hasSignedUp;

        const locationUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);

            const cleared = {
                manufacturer: '',
                model_name: '',
                color: '',
                bin: '',
                hasSignedUp: true,
            };
            this.setState(cleared);
        }
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({ manufacturer: value })
    }

    handleModelNameChange(event) {
        const value = event.target.value;
        this.setState({ model_name: value })
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({ color: value })
    }

    handleBinChange(event) {
        const value = event.target.value;
        this.setState({ bin: value})
    }
    async componentDidMount() {
        const url = 'http://localhost:8100/api/bins/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ bins: data.bins });
        }
    }

    render() {
            let messageClasses = 'alert alert-success d-none mb-0';
            let formClasses = '';
            if (this.state.hasSignedUp) {
              messageClasses = 'alert alert-success mb-0';
              formClasses = 'd-none';
              setTimeout(() => window.location.reload(), 3000)
            }
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a new shoe</h1>
                        <form className={formClasses} onSubmit={this.handleSubmit} id="create-location-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.manufacturer} onChange={this.handleManufacturerChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                                <label htmlFor="manufacturer">Manufacturer</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.model_name} onChange={this.handleModelNameChange} placeholder="Model name" required type="text" name="model_name" id="model_name" className="form-control" />
                                <label htmlFor="model_name">Model name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.color} onChange={this.handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.bin} onChange={this.handleBinChange} required name="bin" id="bin" className="form-select">
                                    <option value="">Bin</option>
                                    {this.state.bins.map(bin => {
                                        return (
                                            <option key={bin.href} value={bin.href}>
                                                {bin.closet_name}, Number: {bin.bin_number}, Size: {bin.bin_size}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={messageClasses} id="success-message">
                  A shoe has been added to your collection!
                  </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoeForm;
