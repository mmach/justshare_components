import CATEGORY_TREE_ACTIONS from './actions';

let emptyState = {

    categories: [],
    isLoading: false

}
export default function CategoryTreeReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {


        case CATEGORY_TREE_ACTIONS.GET_ALL_CATEGORIES_FETCH.LOADING:
            {
                const result = Object.assign({}, state);
                result.isLoading = true;
                return result;
            }
        case CATEGORY_TREE_ACTIONS.GET_ALL_CATEGORIES_FETCH.SUCCESS:
            {
                const result = Object.assign({}, state);
                result.categories = action.data;
                result.isLoading = false;
                console.log(result)
                return result;
            }

        case CATEGORY_TREE_ACTIONS.GET_ALL_CATEGORIES_FETCH.FINALLY:
            {
                const result = Object.assign({}, state);
                result.isLoading = false;
                if (state.isLoading != result.isLoading) {
                    return result;
                }
                return state;

            }
        case CATEGORY_TREE_ACTIONS.EDIT_CATEGORY_FETCH.LOADING:
            {
                const result = Object.assign({}, state);
                result.isLoading = true;
                return result;
            }
        case CATEGORY_TREE_ACTIONS.EDIT_CATEGORY_FETCH.SUCCESS:
            {
                const result = Object.assign({}, state);
                let cat = [];

                result.categories = result.categories.map(item => {
                    item.expand = false;
                    if (action.dto.id == item.category_child_id) {
                        item.title = action.dto.category;
                        item.category = action.dto.category;
                        item.forThing = action.dto.forThing;
                        item.forSell = action.dto.forSell
                        item.forEvent = action.dto.forEvent
                        item.icon = action.dto.icon
                        item.status = action.dto.status
                    }
                    return item;
                })
                var catReq = (id, categories) => {
                    categories.forEach(item => {
                        if (item.category_child_id == id) {
                            cat.push(item.category_parent_id);
                            catReq(item.category_parent_id, categories)
                        }
                    });
                }
                catReq(action.dto.id, result.categories);
                cat.push(action.dto.id);
                result.categories = result.categories.map(item => {
                    if (cat.includes(item.category_child_id)) {
                        item.expanded = true;
                    } else {
                        item.expanded = false
                    }
                    return item;
                })
                return result;
            }

        case CATEGORY_TREE_ACTIONS.DELETE_CATEGORY_FETCH.SUCCESS:
            {
                const result = Object.assign({}, state);
                let cat = [];
                var catReq = (id, categories) => {
                    categories.forEach(item => {
                        if (item.category_parent_id == id) {
                            cat.push(item.category_child_id);
                            catReq(item.category_child_id, categories)
                        }
                    });
                }
                catReq(action.dto.id, result.categories);
                cat.push(action.dto.id);



                let catParentArray = [];
                var catParent = (id, categories) => {
                    categories.forEach(item => {
                        if (item.category_child_id == id) {
                            catParentArray.push(item.category_parent_id);
                            catParent(item.category_parent_id, categories)
                        }
                    });
                }
                catParent(action.dto.id, result.categories);
                result.categories = result.categories.map(item => {
                    if (catParentArray.includes(item.category_child_id)) {
                        item.expanded = true;
                    } else {
                        item.expanded = false
                    }
                    return item;
                })
                result.categories = result.categories.filter(item => {
                    return !cat.includes(item.category_child_id)
                })
                return result;
            }
        case CATEGORY_TREE_ACTIONS.DELETE_CATEGORY_FETCH.LOADING:
            {
                const result = Object.assign({}, state);
                result.isLoading = true;

                return result;
            }
        case CATEGORY_TREE_ACTIONS.DELETE_CATEGORY_FETCH.FINALLY:
            {
                const result = Object.assign({}, state);
                result.isLoading = false;

                return result;
            }

        case CATEGORY_TREE_ACTIONS.EDIT_CATEGORY_FETCH.FINALLY:
            {
                const result = Object.assign({}, state);
                result.isLoading = false;
                return result;
            }

        case CATEGORY_TREE_ACTIONS.SET_PARENT_FETCH.LOADING:
            {
                const result = Object.assign({}, state);
                result.isLoading = true;
                return result;
            }
        case CATEGORY_TREE_ACTIONS.SET_PARENT_FETCH.SUCCESS:
            {
                const result = Object.assign({}, state);
                var cat = [];
                var catReq = (id, categories) => {
                    categories.forEach(item => {
                        if (item.category_parent_id == id) {
                            cat.push(item.category_child_id);
                            catReq(item.category_child_id, categories)
                        }
                    });
                }
                catReq(action.dto.id, result.categories);
                cat.push(action.dto.id);

                result.categories = result.categories.map(item => {
                    if (cat.includes(item.category_child_id)) {
                        item.status = action.dto.status
                        if (action.dto.id == item.category_child_id) {
                            //item.expanded=true
                            item.category_parent_id = action.dto.CategoryHierarchy.category_parent_id;

                        }
                    }
                    return item;
                })

                cat = [];
                var catParent = (id, categories) => {
                    categories.forEach(item => {
                        if (item.category_child_id == id) {
                            cat.push(item.category_parent_id);
                            catParent(item.category_parent_id, categories)
                        }
                    });
                }
                cat.push(action.dto.id);

                catParent(action.dto.id, result.categories);
                result.categories = result.categories.map(item => {
                    if (cat.filter(el => { return item.category_child_id == el }).length > 0) {
                        item.expanded = true;
                    } else {
                        item.expanded = false
                    }
                    return item;
                })
                return result;
            }
        case CATEGORY_TREE_ACTIONS.SET_PARENT_FETCH.FINALLY:
            {
                const result = Object.assign({}, state);
                result.isLoading = false;
                return result;
            }
        case CATEGORY_TREE_ACTIONS.ADD_CATEGORY_FETCH.LOADING:
            {
                const result = Object.assign({}, state);
                result.isLoading = true;
                return result;
            }

        case CATEGORY_TREE_ACTIONS.ADD_CATEGORY_FETCH.SUCCESS:
            {
                const result = Object.assign({}, state);
                // result.isLoading = true;
                result.categories.push({
                    title: action.dto.category,
                    category: action.dto.category,
                    forThing: action.dto.forThing,
                    forSell: action.dto.forSell,
                    forEvent: action.dto.forEvent,
                    icon: action.dto.icon,
                    status: action.dto.status,
                    category_child_id: action.dto.id,
                    category_parent_id: (action.dto.CategoryHierarchy.category_parent_id != '' ? action.dto.CategoryHierarchy.category_parent_id : null)


                })
                let cat=[]
                var catReq = (id, categories) => {
                    categories.forEach(item => {
                        if (item.category_child_id == id) {
                            cat.push(item.category_parent_id);
                            catReq(item.category_parent_id, categories)
                        }
                    });
                }
                catReq(action.dto.id, result.categories);
                cat.push(action.dto.id);
                result.categories = result.categories.map(item => {
                    if (cat.includes(item.category_child_id)) {
                        item.expanded = true;
                    } else {
                        item.expanded = false
                    }
                    return item;
                })
                return result;
            }
        case CATEGORY_TREE_ACTIONS.ADD_CATEGORY_FETCH.FINALLY:
            {
                const result = Object.assign({}, state);
                result.isLoading = false;
                return result;
            }




        default:
            {
                return state;
            }
    }

}