import React from 'react';
import { connect } from 'react-redux';
import HistogramSlider from '../../../../../Components/HistogramSlider/HistogramSlider.jsx';
import { Translator } from './../../../../../Shared/index.js';





class CategoryOptionSearchSINGLE extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.validation = [];
        this.state.optionFilter = this.props.optionFilter;
        this.state.values = undefined

    }


    onChange(event) {

        this.setState({
            id: event.target.value
        })



    }
    onClick(event) {
        if (this.state.values == undefined) {
            return;
        }
        //let optionId = event.currentTarget.getAttribute('data-tag');
        this.props.onChange(this.props.catOptionId + "_SINGLE", [{
            min: this.props.aggs[this.props.catOptionId].catOption.hist_values.value[0].buckets[this.state.values[0]][2]
            , max: this.props.aggs[this.props.catOptionId].catOption.hist_values.value[0].buckets[this.state.values[1]][2]
        }])

    }
    getDropDownValues() {
        //     return [{ id: '', value: '', type: "" }, ...this.props.catOption.cat_opt_temp.map(item => {
        //       return { id: item.id, value: item["value_" + this.props.lang], type: item["value_" + this.props.lang] }
        //    })];
    }
    setCurrentValues(value) {
        if (value[0] >= value[1]) { return; }
        this.setState({ values: value });
    }

    resetSingle() {
        this.props.onReset(this.props.catOptionId + "_SINGLE");
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        //     const link = this.props.catOption.category_link[0];
        let catOption = this.props.catOptions.filter(item => { return item.id == this.props.catOptionId })[0];
        const date = this.props.aggs[this.props.catOptionId].catOption.hist_values.value[0].buckets.length > 0 ?
            this.props.aggs[this.props.catOptionId].catOption.hist_values.value[0].buckets.map((item, index) => {
                return { id: item[0], value: item[2], counter: item[1] }
            }) : [{ id: -1, value: 0, counter: 0 }];
        let value = [0, date.length > 1 ? date.length - 1 : 1]
        if (this.state.values != undefined) {
            value = [this.state.values[0], this.state.values[1]]

        }

        console.log(JSON.stringify(this.state.optionFilter))
        return (
            <div className="list-group list-group-border-0 g-mt-10 ">
                <div style={{ display: 'flex' }}>
                    {date.length > 2 ?

                        <div
                            className="g-px-20 g-py-5"
                            style={{
                                width: '100%',

                                borderRight: '1px solid #d9d9d9',
                            }}
                        >
                            <HistogramSlider
                                colors={{
                                    in: '#D7D8D8',
                                    out: '#EEEEEE',
                                }}
                                label={
                                    <div>Od : {date[value[0]].value}
                                        <br />Do : {date[value[1]].value}
                                    </div>
                                }
                                min={date[0].id}
                                max={date[date.length - 1].id}
                                step={date[date.length - 1] - date[0] / 100}
                                value={value}
                                distance={date[date.length - 1] - date[0]}
                                data={date.map(item => { return item.counter * 1000 })}
                                onChange={this.setCurrentValues.bind(this)}

                            />

                            {(this.state.optionFilter != undefined && this.state.optionFilter.length > 0) ? <button onClick={this.resetSingle.bind(this)} style={{ float: 'right' }} type="button" class="g-ml-10 btn btn-xs  g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase  btn-secondary ">RESET</button> : <span></span>}

                            <button onClick={this.onClick.bind(this)} style={{ float: 'right' }} type="button" class="btn btn-xs text-right g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn-secondary ">OK</button>


                        </div> : <div className="text-center">
                            {date[0].value}
                            {(this.state.optionFilter != undefined && this.state.optionFilter.length > 0) ? <button onClick={this.resetSingle.bind(this)} style={{ float: 'right' }} type="button" class="g-ml-10 btn btn-xs  g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase  btn-secondary ">RESET</button> : <span></span>}

                        </div>}
                </div>
            </div>

        )
    }
}


const mapStateToProps = (state) => {

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        //  catOptions: state.EditCategoryReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {



    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryOptionSearchSINGLE);

