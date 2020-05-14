import { MapDispatchToProps, connect } from 'react-redux';
import Image, { ImageProps } from '../../components/Image';
import { updatePhotoText } from '../../../../store/banner';
import { payloadForUpdateText } from '../../../../api/types';

interface IMapDispatchToProps {
    onTextEditComplete: (payload: payloadForUpdateText) => void
}

const mapDispatchToProps: MapDispatchToProps<IMapDispatchToProps, ImageProps> = (dispatch: Function) => ({
    onTextEditComplete: payload => dispatch(updatePhotoText(payload))
})

export default connect(undefined, mapDispatchToProps)(Image);