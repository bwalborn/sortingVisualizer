import React from 'react';
import './sortingVisualizer.css';
import {sortingAnimation, bubbleSortAnimations} from '../SortingAlgorithms/sortingAlgorithms';
// const uuidv4 = require('uuid');


// const PRIMARY_COLOR =  '#D3D3D3';
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
const PRIMARY_COLOR = 'turquoise';
const FINISHED_COLOR = 'magenta'
const MAX_WIDTH = 995;


class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.resetArrayValue = this.resetArrayValue.bind(this);
        this.resetStyle = this.resetStyle.bind(this);
        this.finishedARRAY = this.finishedARRAY.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
        this.mouseAway = this.mouseAway.bind(this);
        this.handleDropDownTwo = this.handleDropDownTwo.bind(this);
        
        this.state = { array : [], width : 10, hideButton : true, speed : 10, isRunning : false,  hideShowOne : true, hideShowTwo : true, hideSlider : false, disableSortButtons : false
      };    
    }
   

    componentDidMount () {
        this.resetArrayValue();
    }
  

    handleSliderChange = (e) => {
        this.setState({width : e.target.value, hideButton: !this.state.hideButton});
        this.resetArrayValue ();
    }

    handleClick () {
    }

    resetStyle (){
        const array = this.state.array
        for (var i = 0; i < array.length; i++){
                const arrayBars = document.getElementsByClassName('arrayBar');
                const resetStyle = arrayBars[i].style;
                resetStyle.backgroundColor = PRIMARY_COLOR;
        }
    }


finishedARRAY (){
    const array = this.state.array
    for (var i = 0; i < array.length; i++){
            const arrayBars = document.getElementsByClassName('arrayBar');
            const resetStyle = arrayBars[i].style;
            resetStyle.backgroundColor = FINISHED_COLOR;
    }this.setState({ isRunning : false});
}

resetArrayValue () {
        const array = [];
        const width = Math.round(MAX_WIDTH / this.state.width);
        for (var i = 0; i < width; i++) {
            array.push(getRandomIntInclusive(15, 700))
        }
        this.resetStyle();
        this.setState ({array});
        this.setState({disableSortButtons : false});
    }




quickSort () { 

        this.setState({isRunning : !this.state.isRunning, 
        disableSortButtons : !this.state.disableSortButtons});

        const ANIMATION_SPEED = this.state.speed;
        var countIndex = 0;
        const array =this.state.array;
        const spliceARRAY = array.slice(0);
        const animationsSORT = sortingAnimation(spliceARRAY);

        for (var i = 0; i < animationsSORT.length; i++){
                    const arrayBars = document.getElementsByClassName('arrayBar');
                
                    const [barOneIdx, barOneVal, barTwoIdx, barTwoVal] = animationsSORT[i];
                    const barOneStyle = arrayBars[barOneIdx].style;       //Allows you to cahnge the height and width of the div-bars.
                    const barTwoStyle = arrayBars[barTwoIdx].style;       

                    const color = i % 2 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;

                setTimeout(() => {                                  //Creates a delay for animation to render   // => this.state.speed => sets speed based on user input from 'Change-Sort-Speed' button.
 
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                        barOneStyle.height = `${barOneVal}px`;     // Updating div-bar height.
                        barTwoStyle.height = `${barTwoVal}px`;
                        
                    }, i * this.state.speed);                   // => this.state.speed => sets speed based on user input from 'Change-Sort-Speed' button.
                                          
                    if (countIndex >= animationsSORT.length-1) {
                        setTimeout(() => {
                                this.finishedARRAY();               // Reactivates 'Generate-new-array' button and updates color to magenta.
                        }, i * this.state.speed);
                    }
                countIndex++;
            } 
        }


bubbleSort () {
        this.setState({isRunning : !this.state.isRunning, 
        disableSortButtons : !this.state.disableSortButtons});

        const ANIMATION_SPEED = this.state.speed;
        var countIndex = 0;
        const array =this.state.array;
        const spliceARRAY = array.slice(0);
        const animationsSORT = bubbleSortAnimations(spliceARRAY);

        for (var i = 0; i < animationsSORT.length; i++){
                const arrayBars = document.getElementsByClassName('arrayBar');

                const [barOneIdx, barOneVal] = animationsSORT[i];

                const barOneStyle = arrayBars[barOneIdx].style;    //Allows you to cahnge the height and width of the div-bars.
           
                const color = i % 2 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;

                setTimeout(() => {                      //Creates a delay for animation to render   // => this.state.speed => sets speed based on user input from 'Change-Sort-Speed' button.
                    barOneStyle.backgroundColor = color;
                    
                    barOneStyle.height = `${barOneVal}px`;       // Updating div-bar height.
                
                }, i * this.state.speed);               // => this.state.speed => sets speed based on user input from 'Change-Sort-Speed' button.
                if (countIndex >= animationsSORT.length-1) {
                    setTimeout(() => {
                                this.finishedARRAY();
                            }, i * this.state.speed);     // => this.state.speed.
                }
                countIndex++;
            } 
        }

// mergeSort () {
//     }        
 
    
handleDropDown () {
    this.setState({hideShowOne : !this.state.hideShowOne});
    }
    
handleDropDownTwo () {
    this.setState({hideShowTwo  : !this.state.hideShowTwo});
    }
    
handleSpeed = (s) => {
    this.setState({speed : s.target.value});
    }
        
mouseAway () {
    this.setState({hideSlider: !this.state.hideSlider});
    }



    render() {

        const {array} = this.state;      
        const {isRunning} = this.state;
        const {disableSortButtons} = this.state;  
        const hideShowOne = this.state.hideShowOne ? true : false;
        const hideShowTwo = this.state.hideShowTwo ? true : false;

        const{hideSlider} = this.state;  
 
        return (
            <div className='array-super'>
            <header >
                <div className='navBar'>
                    <div className='Headerbutton'>
                        <button  className='GenerateArrayButton'  disabled={isRunning} onClick={() => this.resetArrayValue()}>Generate New Array</button>
                    </div>

            <div className='SettingsButtons'>
                <div class="dropdown">
                        <button  className='ChangeSizeButton'  disabled={disableSortButtons}  onClick={() =>  this. handleDropDownTwo()}>Change Size</button>
                        <div id="myDropdown" class="dropdown-content" hidden={hideShowTwo}  onMouseLeave={() => this.handleDropDownTwo()} >

                            <div className="rangeslider"> 
                            <input type="range" min="4" max="15" step='1' hidden={hideShowTwo}  onChange={this.handleSliderChange} onMouseUp={()=> this.resetArrayValue()}  className="myslider" id="sliderRange"></input>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div class="dropdown">
                        <button  className='buttonSortSpeed'  disabled={disableSortButtons}  onClick={() => this.handleDropDown()} >Change Sort Speed</button>
                        <div id="myDropdown" class="dropdown-content" hidden={hideShowOne}  onMouseLeave={() => this.handleDropDown()} >
                            <div className="rangeslider2"> 
                                <input type="range" min="2" max="20" step='2' value={this.state.speed} hidden={hideShowOne} onChange={this.handleSpeed} className="myslider" id="sliderRange"></input>
                            </div>
                        </div>
                    </div>  
                </div>
                <div className="SortalgoButtons">
                   
                    <button className="quickSortbutton"  disabled={disableSortButtons} onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="bubbleSortbutton"  disabled={disableSortButtons} onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    </div>
                </div>
            </header>
            <body className='mainBody'>
                <div className='ParentArrayBar'>
                    {array.map((value, idx) => (
                        <div className='arrayBar'  style={{ backgroundColor: PRIMARY_COLOR, height:`${value}px`, width:`${this.state.width}px` }} key={idx} > {value} </div>

                    ))}
                </div>
            </body>
            </div>
            );
        }
    }

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    };

   export default SortingVisualizer;
