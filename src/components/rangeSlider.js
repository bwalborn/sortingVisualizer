import React from 'react';
// import styled form ''


class Slider extends React.Component {

constructor(props) {
        super(props);
        this.state = { value : 55
    };
}

handleSliderChange = (e) => {
    e.preventDefault();
    this.setState({ value : e.target.value});
    // console.log(this.state.value);

}

render () {
    return (
        <div className="rangeslider"> 
            <input type="range" min="10" max="110" value={this.state.value} onChange={this.handleSliderChange} className="myslider" id="sliderRange"></input>
        </div>
        );
    }
}
export default Slider;