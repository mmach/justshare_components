/*
    ./client/components/App.jsx
*/
import React from 'react';
import { Col } from 'reactstrap';

class PreviewItemOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  showValue(item) {
    if (item.category_link.catOption.cat_opt.type == "SELECT") {
      return this.selectValue(item);
    } else if (item.category_link.catOption.cat_opt.type == "MULTI_SELECT") {
      return this.selectValue(item);
    } else if (item.category_link.catOption.cat_opt.type == "SINGLE") {
      return this.singleValue(item);
    } else if (item.category_link.catOption.cat_opt.type == "GEOCOORDINATE") {
      return this.singleValue(item);
    } else if (item.category_link.catOption.cat_opt.type == "BETWEEN") {
      return "TO_DOOOOO";
    } else if (item.category_link.catOption.cat_opt.type == "IMAGE") {
      return "TO_DOOOOO";
    } else {
      ;
      return item.value;
    }
  }

  singleValue(item) {
    return React.createElement("span", {
      className: "g-pa-2 g-my-2"
    }, item.value);
  }

  selectValue(item) {
    return React.createElement("span", {
      className: "g-pa-2 g-my-2"
    }, item.cat_opt_temp["value_" + this.props.lang]);
  }

  render() {
    let groupByCat = {};
    this.props.item.itemCategoryOption.forEach(element => {
      if (this.props.on_map == true) {
        if ((element.category_link.is_on_map == null ? element.category_link.catOption.is_on_map : element.category_link.is_on_map) == true) {
          groupByCat[element.category_link.co_id] = element.category_link;
        }
      } else {
        console.log('dupaa');

        if (element.cat_opt_temp.is_visible_view == true || element.category_link.catOption.is_visible_view == true) {
          return;
        }

        groupByCat[element.category_link.co_id] = element.category_link;
      }
    });
    return Object.keys(groupByCat).sort((a, b) => {
      return Number(groupByCat[a] == null ? groupByCat[a].catOption.order : groupByCat[a].order) > Number(groupByCat[b] == null ? groupByCat[b].catOption.order : groupByCat[b].order) ? 1 : -1;
    }).map(item => {
      console.log(item);
      return React.createElement(Col, {
        className: "g-my-2 g-py-0 ",
        xs: this.props.col_size
      }, React.createElement("label", {
        className: "g-my-0 g-py-0 g-color-gray-dark-v4 g-letter-spacing-1  g-line-height-0_8 g-font-weight-600 g-font-size-9"
      }, groupByCat[item].catOption["name_" + this.props.lang]), this.props.item.itemCategoryOption.sort((a, b) => {
        return Number(a.cat_opt_temp.order) > Number(b.cat_opt_temp.order) ? 1 : -1;
      }).filter(option => {
        return option.category_link.co_id == item && option.cat_opt_temp.is_visible_view != true;
      }).map(result => {
        return React.createElement("span", {
          className: " g-line-height-0_8 g-my-0 g-py-0",
          style: {
            display: 'block',
            marginTop: '-5px'
          }
        }, this.showValue(result));
      }));
    });
    /*   return (
           <Col className="g-my-20 text-center">
                    {this.props.catOptions.catOptions.sort((a, b) => {
                   return Number(a.order) >= Number(b.order) ? 1 : -1
               }).map(item => {
                   return (<CategoryOptionTempMapper item={item} category_id={this.props.category_id}  ></CategoryOptionTempMapper>
                   )
               })}
           </Col>)*/
  }

}

const mapStateToProps = state => {
  //console.log(state);
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    categoryTree: state.CategoryTreeReaducer
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default PreviewItemOptions;
//# sourceMappingURL=index.js.map