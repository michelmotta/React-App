import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import Header from './Header';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <Header></Header>
                <div className="row">
                    <div className="col-md-12">
                        <Jumbotron className="mt-5">
                            <h1 className="display-3">Welcome, dear!</h1>
                            <p className="lead">This is a FrontEnd application developed using ReactJS. This application was build to consume a Ruby on Rails RestFull API. It also uses tecnologies like Reactstrap and Axios.</p>
                            <hr className="my-2" />
                        </Jumbotron>
                    </div>
                </div>
            </div>
        );
    }
}