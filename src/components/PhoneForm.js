import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StyledForm } from './From.style';

const quizShema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').required('Required'),
  number: Yup.number().min(10, 'Must be 10 or more').required('Required'),
});

export const ContactForm = ({ onAdd }) => {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          number: 0,
        }}
        validationSchema={quizShema}
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
