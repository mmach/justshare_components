import React from 'react';
import { connect } from 'react-redux';
import { Translator } from './../../../../../Shared/index.js';
import MapForm from '../../../../../Components/MapForm/index.jsx';






class CategoryOptionGEO_SHOW extends React.Component {

    constructor(props) {
        super(props);

    }





    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        return (
            <MapForm size="size-map-150px" readOnly coords={{ longitude: this.props.item.longitude, latitude: this.props.item.latitude }} icon={encodeURIComponent(this.props.item.category.icon)} getFromUser={false} form_text={"DUPA"}></MapForm>
        )
    }
}


const mapStateToProps = (state) => {

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        catOptions: state.EditCategoryReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {





    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryOptionGEO_SHOW);

