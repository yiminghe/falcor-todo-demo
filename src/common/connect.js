import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as _actions from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(_actions, dispatch),
  };
}

export default function (selector) {
  return connect(selector, mapDispatchToProps);
}
