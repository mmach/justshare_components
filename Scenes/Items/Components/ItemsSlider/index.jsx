/*
    ./client/components/App.jsx
*/

import 'leaflet/dist/leaflet.css';
import React from 'react';
import Img from 'react-image';
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass
import { connect } from 'react-redux';
import Slider from "react-slick";
import { Col, Row } from 'reactstrap';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ellipsis from 'text-ellipsis';
import { Translator } from '../../../../Shared/index.js';
import WEB_CONFIG from '../../../../config.js';
import LIGHTBOX_ACTIONS from '../../../../Components/ImageLightbox/actions.js';
import MODAL_ACTIONS from '../../../../Components/WrapperAuth/actions.js';
import PreviewItemOptions from '../../Components/PreviewItemOptions/index.jsx';
import noImg from './../../../../assets/img/no-image.png';
 




class ItemsSlider extends React.Component {

    constructor() {
        super();
        this.state = {};


        this.state.currentElement = undefined
        this.state.currentPosition = undefined
        this.state.currentIndex = undefined
        this.refSlider = {};

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.currentElement != nextProps.currentElement) {
            let result = this.props.items.forEach((element, index) => {
                if (element.id == nextProps.currentElement.id) {
                    this.refSlider.slickGoTo(index);

                }
            });
        }
    }
    goToUser(event) {
        this.props.history.push('/user/' + event.target.getAttribute('data-tag'));


    }
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    }

    clickItem(event) {
        let id = event.currentTarget.getAttribute("data-key")
        if (this.props.currentElement && this.props.currentElement.id == id) {
            event.preventDefault();
            this.props.openUserModal(true, 'ITEM_PREVIEW', this.props.currentElement);
            return;
        }
        let result = this.props.items.forEach((element, index) => {
            if (element.id == id) {
                this.props.setCurrentElement(element)
                this.refSlider.slickGoTo(index);

            }
        });

    }
    pinClick(event) {
        let id = event;
        let result = this.props.items.forEach((element, index) => {
            if (element.id == id) {
                this.props.setCurrentElement(element)


                this.refSlider.slickGoTo(index);

            }
        });

    }
    afterChangeSlider(id) {
        let result = this.props.items[id]
        this.props.setCurrentElement(result)


    }
    openImage(event) {

        let id = event.currentTarget.getAttribute('data-item');
        let imgId = event.currentTarget.getAttribute('data-tag');
        let item = this.props.items.filter(obj => {
            return obj.id == id
        })[0];
        let blob = item.blobs.filter(obj => {
            return obj.blob_item.id == imgId
        })[0]
        this.props.openLightbox(blob, item.blobs)
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

        //</Marker>

        var settings = {
            dots: false,
            slidesToShow: this.props.elementsNumber,
            lazyLoad: 'ondemand',
            centerMode: true,
            swipeToSlide: true,
            infinite: false,
            slidesToScroll: 3,
            speed: 300,
            className: 'g-mx-5'//,
            //  //     slidesToShow:this.state.currentIndex
        };
        return (

            <div id="mapSliderItems" className=" g-px-50" style={{ backgroundColor: "#ccc", Height: '25vh' }}>
                <Slider {...settings} afterChange={this.afterChangeSlider.bind(this)} ref={ref => { this.refSlider = ref }}>
                    {this.props.items ? this.props.items.map((item, index) => {
                        //  console.log(item);
                        console.log(item)

                        let img = item.blobs[0] ? WEB_CONFIG.BLOB_URL[NODE_ENV] + '/blob/' + item.blobs[0].blob_min_id : ''

                        return (
                            <div onClick={this.clickItem.bind(this)} data-key={item.id} xs="9" className="media g-brd-around g-brd-gray-light-v4 g-pa-5 rounded-0  g-mb-2 g-bg-white g-height-25vh g-mx-5">
                                <div className=" g-pl-5 ">
                                    <Row style={{ height: '8.5vh', maxHeight: '8.5vh', minHeight: '8.5vh' }}>
                                        <Col xs="8" >
                                            <h5 class="h6 g-font-size-11 text-uppercase g-letter-spacing-1 g-font-weight-600 text-uppercase  g-color-gray-dark-v4 g-mb-1" title={item.name}>{ellipsis(item.name, 30)}</h5>
                                            <label class="g-line-height-1_5 g-letter-spacing-1 g-mb-1 g-font-weight-500 g-font-size-9 form-control-label">{item.category["category_" + this.props.lang]}</label>
                                            <br />
                                            <span data-tag={item.user.id} onClick={this.goToUser.bind(this)} className="g-letter-spacing-1 text-nowrap g-color-blue g-cursor-pointer" >
                                                {item.user.name}
                                            </span>
                                        </Col>
                                        <Col xs="3" className="g-pa-0 " style={{ marginTop: '0px', marginLeft: '21px' }} >
                                            {item.blobs[0] ?
                                                <div class="js-fancybox d-block u-block-hover " target="_blank">
                                                    <span onClick={this.openImage.bind(this)} data-item={item.id} data-tag={item.blobs[0].blob_id} class={" js-fancybox d-block u-block-hover u-block-hover--scale-down g-cursor-pointer"} href="smooth-parallax-scroll/index.html" >
                                                        <Img src={img} className={"img-fluid u-block-hover__main u-block-hover__img g-brd-gray-light-v2  g-brd-around g-pa-2 "} style={{ maxWidth: '8vh', maxHeight: '8vh' }} />

                                                    </span>
                                                </div> : <span>

                                                    <Img src={noImg} className={"g-bg-gray-light-v2 g-pa-2"} style={{ maxWidth: '8vh', maxHeight: '8vh' }} />

                                                </span>}
                                        </Col>
                                    </Row>
                                    <hr class="g-brd-gray-light-v4 g-py-0 my-0"></hr>
                                    <div className=" g-my-2 g-py-1 " style={{ height: '12vh', maxHeight: '12vh', minHeight: '12vh' }}>
                                        <Row>
                                            <PreviewItemOptions item={item} on_map={true} lang={this.props.lang} col_size="6" />


                                        </Row>
                                    </div>
                                    <hr class="g-brd-gray-light-v4 g-my-3"></hr>
                                    {item.tags.slice(0, 6).map(item => {
                                        return <span class="u-label u-label--sm tag-map   g-px-10 g-mx-1 g-my-0 g-cursor-pointer">{item.tag}</span>

                                    })}{
                                        item.tags.length > 6 ? <span className="g-pl-10">{"+" + (item.tags.length - 6) + " " + tran.translate('MAP_MORE_TAGS_LABEL')}</span> : <span></span>
                                    } <span></span>
                                </div>

                            </div>
                        )
                    }) : <span></span>}
                </Slider>
            </div>





        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {



        openLightbox: (activeImage, images) => {
            return dispatch({
                type: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
                dto: {
                    images: images,
                    activeImage: activeImage
                }
            })

        },

        openUserModal: (open, action, item) => {
            dispatch({
                type: MODAL_ACTIONS.OPEN_MODAL,
                dto: {
                    open: open,
                    action: action,
                    param: item
                }
            });
        }



    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemsSlider);

