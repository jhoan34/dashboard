export function formdate(date : Date) {
   const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
   const day = date.getDate();
   const monthIndex = months[date.getMonth()];
   const year = date.getFullYear();

   return `${day} de ${monthIndex} del ${year}`
}