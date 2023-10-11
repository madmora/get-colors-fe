import { Controller } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface TextAreaProps {
  name: string
  control: any
}

const RichTextEditor = ({ name, control }: TextAreaProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <ReactQuill value={value} onChange={onChange} />
        {!!error && <p>{error.message}</p>}
      </>
    )}
  />
)

export default RichTextEditor
