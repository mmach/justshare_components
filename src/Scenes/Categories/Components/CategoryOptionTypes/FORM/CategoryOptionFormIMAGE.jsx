import React from 'react';
import Img from 'react-image';
import { connect } from 'react-redux';
import { Col, Container, Form, Label, Row } from 'reactstrap';
import uuidv4 from "uuid/v4";
import { Translator } from './../../../../../Shared/index.js';
import uploadpic from './../../../../../assets/img/upload.png';
import BlobBase64 from '../../../../../Shared/DTO/Blob/BlobBase64DTO.js';


class CategoryOptionFormIMAGE extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.validation = [];
        this.state.id = this.props.values ? this.props.values : {};
        this.state.file = null;
        this.state.images = []
    }


    getDropDownValues() {
        return [{ id: '', value: '', type: "" }, ...this.props.catOption.cat_opt_temp.map(item => {
            return { id: item.id, value: item["value_" + this.props.lang], type: item["value_" + this.props.lang] }
        })];
    }
    uploadClick(event) {
        this.refs.fileUploader.click();

    }
    handleChange(e) {

        // get the files
        let files = e.target.files;

        // Process each file
        var allFiles = [];
        for (var i = 0; i < files.length; i++) {

            let file = files[i];

            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {

                // Make a fileInfo Object
                let fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                };

                // Push it to the state
                allFiles.push(fileInfo);

                // If all files have been proceed
                if (allFiles.length == files.length) {
                    // Apply Callback function
                    let dto = new BlobBase64();
                    dto.id = uuidv4();
                    dto.blob = allFiles[0].base64.split('base64,')[1];
                    dto.type = allFiles[0].type;
                    this.state.images.push(dto);
                    this.setState({
                        images: this.state.images,
                        file: null
                    });
                    let result = this.state.images.map(item => {
                        return { id: uuidv4(), cat_opt_id: this.props.catOption.cat_opt_temp[0].id, val: item.id, content: item, element: item.id, type: 'IMAGE',col_id:this.props.catOption.category_link[0].id };

                    });
                    this.props.onChange(this.props.catOption, result)
                }

            } // reader.onload

        } // for

    }
    removeImage(event) {
        this.state.images = this.state.images.filter(item => { return event.currentTarget.getAttribute('data-tag') != item.id })
        this.setState({
            images: this.state.images
        });

        this.props.onChange(this.props.catOption, this.state.images.map(item => {
            return { id: this.props.catOption.cat_opt_temp[0].id, val: item.id, content: item,col_id:this.props.catOption.category_link[0].id };

        }))
    }
    setAsProfile(event) {

        this.props.onChange(this.props.catOption, this.state.images.map(item => {
            return { id: this.props.catOption.cat_opt_temp[0].id, val: item.id, content: item };

        }))
    }
    uploadImage(event) {

        let dto = new BlobBase64();
        dto.id = uuidv4();
        dto.blob = this.state.file.base64.split('base64,')[1];
        dto.type = this.state.file.type;
        this.state.images.push(dto);
        this.setState({
            images: dto,
            file: null
        })

    }



    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        console.log(this.props.catOption.cat_opt_temp);
        console.log(this.props.catOption.limit_of);
        const link = this.props.catOption.category_link[0];

        let imgList = this.state.images.map((item, index) => {
            let brdColor = "g-brd-gray-light-v4--hover";
            if (index == 0) {
                brdColor = "g-brd-red-light-v4--hover"
            }
            let thumbail = item.blob_thumbmail ? item.blob_thumbmail : item;

            let img = `data:${thumbail.type};base64,${thumbail.blob}`
            return (
                <Col xs="2" className="g-pa-0 g-ma-0" >
                    <div class={"g-brd-around g-brd-gray-light-v4  g-cursor-pointer    " + brdColor}>


                        <div class="js-fancybox d-block u-block-hover " target="_blank">
                            <span data-tag={item.id} onClick={this.removeImage.bind(this)} class="g-z-index-3 u-icon-v3 u-icon-size--xs g-bg-white g-color-black g-rounded-50x g-cursor-pointer g-pos-abs g-top-10 g-right-10">
                                <i class="fa fa-remove"></i>
                            </span>
                            {item.status == 1 && item.id != profId ? <span data-tag={item.id} onClick={this.setAsProfile.bind(this)} class="g-letter-spacing-1 g-font-weight-500 rounded-0 g-font-size-9 text-uppercase g-z-index-3 btn btn-xs u-btn-primary g-mr-10 g-mb-15 g-pos-abs g-bottom-10 g-right-5">{tran.translate('SET_AS_PROFILE_IMAGE')}
                            </span> : <span></span>}

                            <span data-tag={item.id} class={(item.status == 0 ? "u-bg-overlay u-bg-overlay--v1 g-bg-black-opacity-0_5--after" : "") + " js-fancybox d-block u-block-hover u-block-hover--scale-down"} href="smooth-parallax-scroll/index.html" >
                                <Img src={img.toString()} className={"img-fluid u-block-hover__main u-block-hover__img"} />
                                {item.status == 0 ? <span class="u-bg-overlay__inner g-color-white h6 text-uppercase g-letter-spacing-2 g-font-weight-600  text-center g-pos-abs g-left-20 g-bottom-20">
                                    {tran.translate('IMAGE_NOT_VERIFIED')}
                                </span> : <span></span>}
                            </span>
                        </div>

                    </div>

                </Col>)

        })

        if (imgList.length < (link.limit_of ? link.limit_of : this.props.catOption.limit_of)) {
            imgList.push(<Col xs="2" className="g-pa-0 g-ma-0">

                <div class={"g-brd-around g-brd-gray-light-v4 g-cursor-pointer  "}>


                    <div class="js-fancybox d-block u-block-hover " >

                        <span onClick={this.uploadClick.bind(this)} class="g-pa-5 js-fancybox d-block u-block-hover u-block-hover--scale-down text-center"  >
                            {this.state.file == null ?
                                <Img src={uploadpic} className={"img-fluid u-block-hover__main u-block-hover__img g-pa-40"} />
                                : <Img src={this.state.file.base64} className={"img-fluid u-block-hover__main u-block-hover__img"} />
                            }
                            {this.state.file == null ? <span class="g-color-black g-pos-abs g-bottom-0 g-left-10 g-font-size-16 u-bg-overlay__inner g-mb-15 h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center">
                                {tran.translate('UPLOAD_IMAGE_LABEL')}
                            </span>
                                : <span></span>}
                            {this.state.file == null ? <span class="u-block-hover__additional--fade g-bg-black-opacity-0_8 g-color-white">
                                <i class="hs-icon hs-icon-plus g-absolute-centered g-font-size-25"></i>
                            </span> : <span></span>}
                        </span>
                        {this.state.file != null ? <a href="#" onClick={this.uploadImage.bind(this)} class="g-z-index-3 rounded-0 btn btn-xs u-btn-primary g-mr-10 g-mb-15 g-pos-abs g-bottom-10 g-right-10">{tran.translate('UPLOAD_IMAGE_BTN')}
                        </a>
                            : <span></span>}

                    </div>
                </div>
                <input type="file"
                    ref="fileUploader" className=" hidden"
                    onChange={this.handleChange.bind(this)} />

            </Col>)
        }


        return (
            <Form className=" g-mb-5 text-center g-px-5 text-center">
                <Col className="text-center mx-auto g-max-width-600 ">
                    <Label className="g-line-height-1_8 g-letter-spacing-1  ">{this.props.catOption["name_" + this.props.lang].format(link.limit_of ? link.limit_of : this.props.catOption.limit_of)} </Label>
                </Col>
                <Col>
                    <Row className="g-brd-around g-brd-gray-light-v3 g-px-5 g-py-1" style={{ backgroundColor: "#eee" }}>
                        {imgList}
                    </Row>
                </Col>
            </Form>


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
)(CategoryOptionFormIMAGE);

