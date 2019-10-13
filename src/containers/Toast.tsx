import Display, { IProps } from '../components/Toast';
import { MapStateToProps, connect } from 'react-redux';
import { StoreState } from '../store';

const mapStateToProps: MapStateToProps<IProps, {}, StoreState> = state => ({
    message: state.toast.message,
    type: state.toast.type,
    visible: state.toast.visible || false
});

export default connect(mapStateToProps)(Display);