/*
    ./client/components/App.js
*/
import React from 'react';
import { connect } from 'react-redux';
import SortableTree from "react-sortable-tree";
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

import { Col, Input } from 'reactstrap';
import QueryList from '../../../../Shared/QueryList.js';
import LinkAuth from '../../../../Components/LinkAuth/index.jsx';
import { Translator } from './../../../../Shared/index.js';
import { BaseService } from './../../../../App/index.js';

class CategoryTreePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      loading: false,
      categories: [],
      search: ""
    };
  }
  /*  componentWillReceiveProps(next) {
        if (next.categoryTree.categories.length > 0 && next.categoryTree.isLoading == false) {
          
        }
    }*/


  isLeaf(node) {
    return this.props.categoryTree.categories.filter(item => {
      return item.category_parent_id == node.node.category_child_id;
    }).length == 0;
  }

  list_to_tree(list) {
    var map = {},
        node,
        roots = [],
        i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].category_child_id] = i; // initialize the map

      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];

      if (node.category_parent_id !== null) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.category_parent_id]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  componentDidMount() {
    this.props.getAllCategories({
      status: 1
    }).then(succ => {
      console.log(succ);
      let verified = succ.data.filter(item => {
        return item.status == 1;
      });
      let resultVer = this.list_to_tree(verified.map(item => {
        return item;
      }));
      this.setState({
        categories: succ.data,
        treeData: resultVer
      });
      let items = document.getElementsByClassName('rst__rowContents');

      for (let i = 0; i < items.length; i++) {
        items.item(i).classList.remove("leaf_in_tree");
        items.item(i).classList.remove("leaf_in_tree--active");
      }
    });
  }

  searchHandler(event) {
    let search = event.target.value;
    this.setState({
      search: search
    }); // this.refreshTree();
  }

  refreshTree(event) {
    setImmediate(() => {
      console.log(this.props.categoryId);
      let items = document.getElementsByClassName('rst__rowContents');

      for (let i = 0; i < items.length; i++) {
        items.item(i).classList.remove("leaf_in_tree");
        items.item(i).classList.remove("leaf_in_tree--active");
        let item = items.item(i).querySelector('.u-link-v5'); //     console.log();

        if (item) {
          if (this.props.categoryId == item.getAttribute('data-key')) {
            items.item(i).classList.add("leaf_in_tree--active");
          } else {
            items.item(i).classList.add("leaf_in_tree");
          }
        }
      }
    });
  }

  render() {
    this.refreshTree();
    return (// <ScrollArea
      //     horizontal={true}
      //    style={{ height: 'auto', width: '400px' }}>
      React.createElement(Col, null, React.createElement(Input, {
        placeholder: Translator(this.props.codeList.data.PLACEHOLDER, this.props.lang).translate('FILTER_CATEGORIES_PLACEHOLDER'),
        isRequired: true,
        value: this.state.search,
        onChange: this.searchHandler.bind(this),
        field: "message.es",
        validation: this.state.validation
      }), React.createElement(SortableTree, {
        isVirtualized: false,
        rowHeight: 55 // style={{ height: '800px', maxHeight: '800px' }}
        ,
        treeData: this.state.treeData,
        onChange: treeData => {
          this.setState({
            treeData
          });
        },
        onVisibilityToggle: () => {
          this.refreshTree.bind(this)();
        },
        canDrag: node => {
          return false;
        },
        searchQuery: this.state.search.toUpperCase(),
        onlyExpandSearchedNodes: true //    nodeContentRenderer={CategoryTreeElement}
        ,
        generateNodeProps: item => {
          if (this.props.setOnlyLeaf == true) {
            let items = document.getElementsByClassName('rst__rowContents');

            if (this.isLeaf.bind(this)(item) == true) {
              item.node.title = React.createElement("span", null, item.node.icon ? React.createElement("i", {
                className: item.node.icon
              }) : React.createElement("span", null), React.createElement("span", {
                "data-name": item.node["category_" + this.props.lang],
                "data-key": item.node.category_child_id,
                "data-icon": item.node.icon,
                onClick: event => {
                  this.props.onClick(event);
                  this.refreshTree.bind(this)();
                },
                className: "g-pl-7--hover text-uppercase u-link-v5 g-font-weight-600 g-max-width-200  g-mx-0 g-py-0 g-mx-10 g-pt-10 g-pb-10 g-pr-20  g-color-white g-font-size-12 g-cursor-pointer "
              }, item.node["category_" + this.props.lang].toUpperCase()));
            } else {
              item.node.title = React.createElement("span", null, item.node.icon ? React.createElement("i", {
                className: item.node.icon
              }) : React.createElement("span", null), React.createElement("span", {
                className: " text-uppercase   g-font-weight-600 g-py-0 g-mx-10  g-color-gray-dark-v4 g-font-size-12 "
              }, item.node["category_" + this.props.lang].toUpperCase()));
            }
          } else {
            item.node.title = React.createElement("span", null, " ", item.node.icon ? React.createElement("i", {
              className: item.node.icon
            }) : React.createElement("span", null), React.createElement(LinkAuth, {
              to: `/ categories / edit / ${item.node.category_child_id}`,
              className: " g-pl-7--hover text-uppercase   u-link-v5 g-font-weight-600 g-py-0 g-mx-10  g-color-gray-dark-v4 g-font-size-12 g-color-primary--hover"
            }, item.node["category_" + this.props.lang].toUpperCase()));
          }

          return item;
        }
      }))
    );
  }

}

const mapStateToProps = state => {
  return {
    codeList: state.DictionaryReducer,
    lang: state.LanguageReducer,
    categoryTree: state.CategoryTreeReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCategories: ({
      status,
      type,
      parent
    }) => {
      return dispatch(new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_ALL_TREE, {
        status: status
      }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTreePreview);