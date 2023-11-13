import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StyledForm } from './From.style';

const quizSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').required('Required'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Invalid phone number format')
    .required('Required'),
});

export const ContactForm = ({ onAdd }) => {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          number: '',
          filterName: '',
        }}
        validationSchema={quizSchema}
        onSubmit={(values, actions) => {
          onAdd(values);
          actions.resetForm();
        }}
      >
        <StyledForm>
          <label>
            Name
            <Field name="name" />
            <ErrorMessage name="name" component="span" />
          </label>
          <label>
            Number
            <Field type="tel" name="number" />
            <ErrorMessage name="number" component="span" />
          </label>
          <button type="submit">Submit</button>
        </StyledForm>
      </Formik>
    </div>
  );
};
