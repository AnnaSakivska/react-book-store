export default function validate(value, setIsSubmitting) {
  let errors = '';

  if (!value.trim()) {
    errors = 'Name required!';
    setIsSubmitting(false);
  } else if (value.trim().length < 4 || value.trim().length > 16) {
    errors = 'Name should consist of min 4 and max 16 characters';
    setIsSubmitting(false);
  } else {
    setIsSubmitting(true);
  }

  return errors;
}
