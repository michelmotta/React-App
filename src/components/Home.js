import React, { Component } from 'react';
import Header from './Header';

export default class Home extends Component {
    render(){
        return(
            <div className="container">
                <Header></Header>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Home</h1>
                    </div>
                </div>
            </div>
        );
    }
}