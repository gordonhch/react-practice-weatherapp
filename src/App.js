import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './tachyons.min.css';
import moment from 'moment'


//const Box = (children) => (<div>{children}</div>);
//Box.displayName = 'Box';
//
//const Text = (children) => (<div>{children}</div>);
//Text.displayName = 'Text';



//const WeatherLow = ({children}) => (<div className='w-50 tc f5 fw3 gray mt0'>{children}</div>);



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			day:1,
			month: 12,
			today: new Date(),
		}
		
	}
	
	componentDidMount() {
		this.timerID = setInterval(()=>this.tick(),10000);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	tick() {
//		let d = new Date();
		
		this.setState({today: new Date()});
	}
	
  render() {
		const {day, month, today} = this.state;
		
    return (
      <div className="App vh-100 bg-dark-gray pv4"> 
        <h3 className="ma0 ba3 white-80">
        	Weather
        </h3>
        <hr className="mw3 bb b--white-20"/>
        
        <Collection/>
			
      </div>
    );
  }
}

//------------------------------

class Collection extends Component {
	constructor(props){
		super(props);
		this.state = {
			dates :[
				moment(),
				moment().add(1, 'days'),
				moment().add(2, 'days'),
				moment().add(3, 'days'),
				moment().add(4, 'days'),
				
			],
			keyCount: [0,1,2,3,4],
		}
		
		this.plus = this.plus.bind(this);
		this.minus = this.minus.bind(this);
	}
	
	
	plus(position){
		let {dates: previousDates, keyCount: previousKeyCount} = this.state;
		if (position >= 0){
			previousDates.unshift(moment(previousDates[ position ]).subtract(1, 'days'));
			previousKeyCount.unshift(previousKeyCount[ position ] - 1);
		} else {
			previousDates.push(moment(previousDates[previousDates.length - 1]).add(1, 'days'));
			previousKeyCount.push(previousKeyCount.length);
		}
		this.setState({
			dates: previousDates,
			keyCount: previousKeyCount,
		});
	}
	
	minus(position){
		let {dates: previousDates, keyCount: previousKeyCount} = this.state;
		if (position >= 0){
		previousDates.shift(previousDates[ position ]);
		previousKeyCount.shift(previousKeyCount[ position ]);
		} else {
			previousDates.pop();
		previousKeyCount.pop();
		}
		this.setState({
			dates: previousDates,
			keyCount: previousKeyCount,
		});
	}
	
	render(){
		const {dates, keyCount} = this.state;
		const ItemArray = [];
		
		dates.forEach((input, index) => {
			ItemArray.push(
				<Item day={input} key={keyCount[index]}/>
			);
			
		});
		
		return(
			<div className="flex">
			
				
				<LeftPanel plus={()=>this.plus(0)} minus={()=>this.minus(0)}/>
				<div className="flex w-100 justify-around pv5">
					{ItemArray}
				</div>
				<RightPanel plus={()=>this.plus(-1)} minus={()=>this.minus(-1)}/>

		
			</div>
		);
	}
}

const LeftPanel = ({plus, minus}) => (
	<div className="flex flex-column item-center bg-white justify-around mv5 ">
	<PlusButton plus={plus}/>
	<br/>
	<MinusButton minus={minus}/>
	</div>
);
const RightPanel = ({plus, minus}) => (
	<div className="flex flex-column item-center bg-white justify-around mv5 ">
	<PlusButton plus={plus}/>
	<br/>
	<MinusButton minus={minus}/>
	</div>
);

const PlusButton = ({plus: p}) => {

	return(
	<div className="pv3 ph2 link pointer" onClick={p}>+</div>
	);
}

const MinusButton = (props) => (
	<div className="pv3 ph2 link pointer" onClick={props.minus}>-</div>
)


class Item extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		}
	}
	
	render() {
		
		const {day} = this.props;
		
		const WeatherHigh = ({children}) => (<div className='w-50 tc f5 fw3 light-gray mt0'>{children}</div>);
		const WeatherLow = ({children}) => (<div className='w-50 tc f5 fw3 silver mt0'>{children}</div>);
		
		const Date = () => (<div className='gray'>{moment(day).add(0, 'days').format("D MMM")}</div>);
	
	
		return(
			<div>
				<Date>
				 
				</Date>
				<div>
					<img src={require('./weathericons/1x/sun1.png')}/>
				
				</div>
				<div className='flex'>
					<WeatherHigh className='red'>22</WeatherHigh>
					<WeatherLow>24</WeatherLow>
				</div>
			</div>
		
		);
	}
}



//------------------------------

class Week extends Component {
	constructor(props){
		super(props);
		this.state = {
			dayCount : 5,
			
		}
		
	}


	render() {
		const {day, today } = this.props;
		const {dayCount} = this.state;
		//console.log(this.props);
		
		var dayArray = [];
		for (var i = 0; i < dayCount; i++) {
    	dayArray.push(<DayOld dayOffset={i} key={i}/>);
//			console.log(dayCount);
		}
		return(
			<div className='flex justify-around pa5'>
				{dayArray}
			</div>
		);
		
	}
}



const DayOld = ({month, dayOffset}) => {
	
	
	const WeatherHigh = ({children}) => (<div className='w-50 tc f5 fw3 light-gray mt0'>{children}</div>);

	const WeatherLow = ({children}) => (<div className='w-50 tc f5 fw3 silver mt0'>{children}</div>);
	
	const Date = ({children}) => (<div className='gray'>{moment().add(dayOffset, 'days').format("D MMM")}</div>);
	
	
	return(
		<div>
			<Date>
				 
			</Date>
			<div>
				<img src={require('./weathericons/1x/sun1.png')}/>
				
			</div>
			<div className='flex'>
				<WeatherHigh className='red'>22</WeatherHigh>
				<WeatherLow>24</WeatherLow>
			</div>
		</div>
		
	);
}
	


export default App;