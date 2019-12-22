/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import CommandList from '../../../../Shared/CommandList.js';
import { Translator } from '../../../../Shared/index.js';
import QueryList from '../../../../Shared/QueryList.js';
import { BaseService } from '../../../../App/index.js';
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import PreviewItemOptions from '../PreviewItemOptions/index.jsx';
import ItemDTO from './../../../../Shared/DTO/Item/ItemDTO.js';
import CategoryOptionGEO_SHOW from './../../../Categories/Components/CategoryOptionTypes/PREVIEW/CategoryOptionGEO_SHOW.jsx';
import CategoryOptionIMAGE_SHOW from './../../../Categories/Components/CategoryOptionTypes/PREVIEW/CategoryOptionIMAGE_SHOW.jsx';







class PreviewItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = new ItemDTO();
        this.state.tags = [

        ]
        this.state = this.props.item;

        this.state.validation = [];
        this.state.categoryId = 0;
        this.state.categoryIcon = '';
        this.state.categoryOptionValues = [];

    }
    componentDidMount() {

    }

    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);


    }
    onTagChange(tags) {
        this.setState({
            tags: tags
        })
    }

    nameHandler(event) {
        this.setState({
            name: event.target.value

        });
        this.refreshValidation();
    }
    descriptionHandler(event) {
        this.setState({
            description: event.target.value

        });
        this.refreshValidation();
    }
    openImage(event) {

        this.props.openLightbox(this.props.auth.user.blob_profile, this.props.userAccount.images)
    }



    render() {
        this.init();
        const { tags, suggestions } = this.state;

        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

        if (this.props.loader.BODY_PROGRESS < 100) {
            return (<BodyLoader zIndex={3} height="800px" size="100px" progress={this.props.loader.BODY_PROGRESS} />);
        }
        //  if (this.props.userAccount.getImagesIsLoading == true) {
        //      return (<BodyLoader zIndex={3} height="800px" size="100px" progress={this.props.loader.BODY_PROGRESS} />);
        //  }

        console.log(this.state);
        let catOptions = {};
        this.state.itemCategoryOption.forEach(item => {
            if (catOptions[item.category_link.co_id] == undefined) {
                catOptions[item.category_link.co_id] =
                {
                    catOption: item.category_link.catOption,
                    elements: []
                }
            }
            catOptions[item.category_link.co_id].elements.push(item);

            // catOptions[item.]
        })

        return (
            <div data-key={this.state.id} xs="9" className=" g-brd-around g-brd-gray-light-v4 g-pa-5 rounded-0  g-mb-2 g-bg-white  g-mx-5">
                <div className="g-mt-15" >

                    {

                        Object.keys(catOptions).map(item => {
                            return catOptions[item];
                        }).filter(item => {
                            console.log(item);
                            let order = item.elements[0].category_link.order ? item.elements[0].category_link.order : item.catOption.order
                            return Number(order) < 0 && Number(order) > -10
                        }).sort((a, b) => {
                            let orderA = item.elements[0].category_link.order ? item.elements[0].category_link.order : a.order
                            let orderB = item.elements[0].category_link.order ? item.elements[0].category_link.order : b.order
                            return Number(orderA) > Number(orderB) ? 1 : -1
                        }).map(item => {

                            return <CategoryOptionGEO_SHOW catOption={item} item={this.state}  ></CategoryOptionGEO_SHOW>
                        })
                    }
                </div>
                {this.state.blobs.length > 0 ?
                    (<div>
                        <CategoryOptionIMAGE_SHOW item={this.state} />

                    </div>) : <span></span>}
                <div className=" g-pl-5 ">
                    <Row className="g-pa-0" style={{ height: '8.5vh', maxHeight: '8.5vh', minHeight: '8.5vh' }}>
                        <Col xs="10">
                            <div className="g-pa-15">
                                <h5 class="h6 g-font-size-11 text-uppercase g-letter-spacing-1 g-font-weight-600 text-uppercase  g-color-gray-dark-v4 g-mb-1" >{this.state.name}</h5>
                                <label class="g-line-height-1_5 g-letter-spacing-1 g-mb-1 g-font-weight-500 g-font-size-9 form-control-label">{this.state.category["category_" + this.props.lang]}</label>
                                <br />
                                <span data-tag={this.state.user.id} className="g-letter-spacing-1 text-nowrap g-color-blue g-cursor-pointer" >
                                    {this.state.user.name}
                                </span>
                            </div>
                        </Col>
                       

                        <Col xs="1" className="float-right  "  >
                            <div class="list-group list-group-border-0 text-center g-pa-10"  style={{marginLeft:"40px"}} >

                                <Link to="/userAccount" className=" list-group-item-action justify-content-between u-link-v5      g-color-primary--hover text-center">

                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-16  text-uppercase text-center">
                                        <i class="fa fa-share-alt "></i>

                                    </span>
                                </Link>


                                <Link to="/userAccount" className=" list-group-item-action justify-content-between u-link-v5     g-color-primary--hover text-center">

                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-16  text-uppercase">
                                        <i class="fa fa-envelope"></i>

                                    </span>
                                </Link>

                                <Link to="/userAccount" className=" list-group-item-action justify-content-between u-link-v5     g-color-primary--hover text-center">

                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-16  text-uppercase text-center">
                                        <i class="fa fa-ban"></i>

                                    </span>
                                </Link>

                            </div>


                        </Col>

                    </Row>




                    <hr class="g-brd-gray-light-v4 my-0"></hr>
                    <div className=" g-my-2 g-py-1 " >
                        <Row>
                            <PreviewItemOptions item={this.state} on_map={false} lang={this.props.lang} col_size="6" />


                        </Row>
                    </div>


                    <hr class="g-brd-gray-light-v4 g-my-3"></hr>
                    <div>
                        {this.state.description}
                    </div>
                    <hr class="g-brd-gray-light-v4 g-my-3"></hr>
                    {this.state.tags.slice(0, 6).map(item => {
                        return <span class="u-label u-label--sm tag-map   g-px-10 g-mx-1 g-my-2 g-cursor-pointer">{item.tag}</span>

                    })}{
                        this.state.tags.length > 6 ? <span className="g-pl-10">{"+" + (this.state.tags.length - 6) + " " + tran.translate('MAP_MORE_TAGS_LABEL')}</span> : <span></span>
                    } <span></span>

                </div>

            </div>
        )
        return (


            body



        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        loader: state.LoaderReducer,
        offerItem: state.NewOfferItemReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {



        openLightbox: (activeImage, images) => {
            return dispatch({
                type: USER_ACCOUNTS_ACTION.OPEN_LIGHTBOX,
                dto: {
                    images: images,
                    activeImage: activeImage
                }
            })

        },
        getCategoryOptions: (category_id) => {
            return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, { id: category_id }));

        },
        createNewItem: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Item.NEW_ITEM, dto));

        },
        getUserImages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null))

        },


    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviewItem);