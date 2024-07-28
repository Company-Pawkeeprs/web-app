import AvatarEditor from 'react-avatar-editor'
import withControl from '~/Components/helpers/with-control'

const ProfileEditor = ({ editorRef, file }) => {
    return (
        <AvatarEditor
            ref={editorRef}
            image={file}
            width={360}
            height={360}
            borderRadius={250}
            scale={1.2}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            rotate={0}
        />
    )
}

export default withControl(ProfileEditor)
