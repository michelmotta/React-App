import React, { Component } from 'react';
import Home from './components/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import School from './components/School';
import Teacher from './components/Teacher';

class App extends Component {

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path={"/"} exact={true} component={Home}></Route>
					<Route path={"/schools"} component={School}></Route>
					<Route path={"/teachers"} component={Teacher}></Route>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
