export default function (schema, body){

  const validation = schema.validate(body, {abortEarly: false});
  
  if (validation.error) {
  
      const error = validation.error.details.map(details => details.message);
  
      return error;
  };

  return validation;

}