import {connect} from 'react-redux'
import {Dropdown} from 'react-toolbox';
import {setVisibilityFilter, VisibilityFilters} from '../../actions';

const mapStateToProps = (state) => {
    return {
        source: VisibilityFilters,
        value: state.visibilityFilter,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (value) => {
            dispatch(setVisibilityFilter(value))
        }
    }
};

export const Filter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dropdown);
