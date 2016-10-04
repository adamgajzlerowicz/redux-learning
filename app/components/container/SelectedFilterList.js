import {connect} from 'react-redux';
import {Option} from '../presentational/Option';


const mapStateToProps = (state) => {
    return {
        filter: state.visibilityFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            alert(ownProps.filter);
            // dispatch(toggleTodo(id))
        }
    }
};

export const SelectedFilterList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Option);