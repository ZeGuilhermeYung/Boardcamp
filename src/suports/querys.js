export default function(offset,limit,order){
  let value ='';

  if(limit)value+= `LIMIT ${limit} `;
  if(offset)value+= `OFFSET ${offset} ROWS `;
  if(order)value+= `ORDER BY ${order}`;

  return value;
}