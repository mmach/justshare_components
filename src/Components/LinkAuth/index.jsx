/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PRIVS_ENUM from './../../App/Privileges/privsEnum.js';


class LinkAuth extends React.Component {

    constructor(props) {
        super(props);

    }


    isOwner() {
        let userId = this.props.auth.user.id;
        let userProps = this.props.user_id;
        return userId==userProps

    }
    render() {

        let link = (<NavLink exact={this.props.exact}
            strict={this.props.strict}
            to={this.props.to} className={this.props.className}>
            {this.props.children}
        </NavLink>)

        let privsFuncList = this.props.privs?this.props.privs.map(item => {
            switch (item) {
                case PRIVS_ENUM.IS_OWNER: return ()=>{return this.props.auth.user.id==this.props.user_id}
                case PRIVS_ENUM.IS_LOGGED: return () => { return this.props.auth.is_logged == true }
                case PRIVS_ENUM.IS_ANONYMOUS: return () => { return this.props.auth.is_logged != false };
                case PRIVS_ENUM.IS_NOT_OWNER: return () => { return this.props.auth.user.id!=this.props.user_id};
            }
        }):[];
        //console.log(privsFuncList);
        if (privsFuncList.length > 0) {
            if (privsFuncList.filter(func => {
                //console.log(func());
                return func();
            }).length > 0) {
                return link;
            }else{
                return <span class="hidden"></span>
            }
        }
        else if (this.props.auth.is_logged == true) {
            return link

        }  else {
            return <span class="hidden"></span>
        }

    }
}


const mapStateToProps = (state) => {

    return {

        auth: state.AuthReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {



    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LinkAuth);