const startUrl = () =>
  "https://attendance.moneyforward.com/employee_session/new";
const attendanceUrl = (year: number, month: number) => {
  const dateString = `${year}-${("0" + month).slice(-2)}-01`;
  return `https://attendance.moneyforward.com/my_page/bulk_attendances/${dateString}/edit`;
};

export default {
  startUrl,
  attendanceUrl,
};
