import Loading from '../components/Loading';
import { MapStateToProps, connect } from 'react-redux';
import { StoreState } from '../store';

interface IProps {
    show: boolean
}

const mapStateToProps: MapStateToProps<IProps, {}, StoreState> = state => ({
    show: state.loading
});

export default connect(mapStateToProps)(Loading);