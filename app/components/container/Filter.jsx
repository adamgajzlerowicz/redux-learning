import {connect} from 'react-redux'
import {Dropdown} from 'react-toolbox';


const vals = [
    {value: 'ALL', label: 'all'},
    {value: 'READ', label: 'read'},
    {value: 'UNREAD', label: 'unread'},
];

const mapStateToProps = (state, ownProps) => {
    return {
        source: vals,
        value: "ALL",
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (value) => {
            // dispatch(setVisibilityFilter(ownProps.filter))
            console.log(value);
        }
    }
}

export const Filter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dropdown);
